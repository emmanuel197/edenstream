import axios from "axios"
import { COOKIES, EMAIL_REGEXP, ERROR_MESSAGES, TOAST } from "../../utils/constants"
import OPERATORS from "../../utils/operators"
import { generateOTPAPI, loginAPI, signUpAPI, validateOTPAPI, fetchUserAPI } from "../constants/apis"
import { processLog } from "../logger"
import { sendLog } from "./account"
import { isAuthenticatedReducer, isLoadingReducer, isValidReducer } from "./slice/authSlice"
import { store } from "../../GLOBAL/redux/store";


//renamed func from _verifyMSISDN to verifyUserData
const _verifyMSISDN = (mobileNumber, password, rePassword) => {
  // console.warn('verifying MSISDN') // renamed from MSISDN to UserData

  let storedMSISDN = COOKIES.get('afri_msisdn')

  if (!storedMSISDN || storedMSISDN !== mobileNumber) {
    COOKIES.set('afri_msisdn', mobileNumber) // create msisdn with phone number
    return false // return true to test msisdn feature
  }

  return true // Return the validation status after evaluating all conditionals
}

const _verifyEmail = email => EMAIL_REGEXP.test(email)

const prefixedMobileNumber = mobileNumber => {
  localStorage.setItem('afri_selected_operator', JSON.stringify(OPERATORS.edenstream)) //! remove when users are supposed to choose network

  const storedSelectedOperator = JSON.parse(localStorage.getItem("afri_selected_operator"))
  return storedSelectedOperator.username_prefix + mobileNumber
}

// Function to validate email, mobile number, and password
export const validateUserData = (
  isPhoneNumber,
  mobileNumber,
  email,
  password,
  rePassword
) => {
  // 1) Email or mobile number validation
  if (isPhoneNumber) {
    if (!mobileNumber || mobileNumber.length < 10) {
      store.dispatch(isLoadingReducer(false))
      TOAST.error(ERROR_MESSAGES.AUTH.invalidMobileNumber);
      return false;
    }
  } else {
    // assume _verifyEmail returns true if the email is valid
    if (!email || !_verifyEmail(email)) {
      store.dispatch(isLoadingReducer(false))
      TOAST.error(ERROR_MESSAGES.AUTH.invalidEmail);
      return false;
    }
  }

  // 2) Password length check (min 8 chars)
  if (password && password.length < 7) {
    store.dispatch(isLoadingReducer(false))
    TOAST.error(ERROR_MESSAGES.AUTH.invalidPassword);
    return false;
  }

  // 3) Password match check
  if (rePassword && password !== rePassword) {
    store.dispatch(isLoadingReducer(false))
    TOAST.error(ERROR_MESSAGES.AUTH.passwordMismatch);
    return false;
  }

  return true;
};


//renamed func from verifyMSISDN to verifyUserData
export const verifyUserData = async (isPhoneNumber, mobileNumber, email, dob, password, rePassword) => {
  const user_info = COOKIES.get("user_info");

  // Validate user data
  if (!validateUserData(isPhoneNumber, mobileNumber, email, password, rePassword)) {
    store.dispatch(isLoadingReducer(false))
    return; // Exit function if validation fails
  }


  window.localStorage.setItem("afri_email", email)
  window.localStorage.setItem("afri_mobile_number", mobileNumber)
  window.localStorage.setItem("afri_username", prefixedMobileNumber(mobileNumber))


  console.log(!_verifyMSISDN(mobileNumber))
  if (!user_info || !_verifyMSISDN(mobileNumber)) {
    // on email and mobile number checks passed

    console.log('awesome')
    await generateOTP(isPhoneNumber, mobileNumber, email)
    store.dispatch(isLoadingReducer(false))
    return true
  }

  // msisdn verification passed
  // window.location.href = '/home'
}


export const generateOTP = async (isPhoneNumber, mobileNumber, email) => {

  // console.warn('mobileNumber', mobileNumber)

  try {
    let res = await axios.post(generateOTPAPI(), {
      mobile_number: mobileNumber
    })
    if (res.data.status === "ok") {
      return true
    }

    // console.warn('generate OTP', res.data)
  }

  catch (e) {
    // console.error(e)
    TOAST.error(ERROR_MESSAGES.errorOccured)
  }
}

export const verifyOTP = async (isPhoneNumber, OTPCode, password) => {
  // if (OTPCode.length < 6) {
  //   TOAST.error(ERROR_MESSAGES.AUTH.wrongOTP)
  //   return
  // }

  const username = window.localStorage.getItem('afri_username')
  const mobileNumber = window.localStorage.getItem('afri_mobile_number')
  const email = window.localStorage.getItem('afri_email')
  const dob = window.localStorage.getItem('afri_dob')
  processLog(`number: ${mobileNumber} with OTP: ${OTPCode}`)

  // OTP = await axios.post(validateOTPAPI(), {
  //   mobile_number: mobileNumber,
  //   otp: OTPCode
  // })
  const OTP = await validateOTP(mobileNumber, OTPCode);

  if (OTP.status === 'error') {
    // console.warn('OTP response error >>', OTP.data)
    TOAST.error(OTP.message)
    return
  }

  // console.warn('OTP response pass >>', OTP.data)

  if (OTP.status === "ok") {

    // console.warn('signing up...', mobileNumber, username)
    store.dispatch(isLoadingReducer(true))
    const signupResponse = await axios.post(signUpAPI(), {
      first_name: "Eden",
      last_name: "Stream",
      email: email,
      phone_number: mobileNumber,
      date_of_birth: dob,
      password: password,
      username: username,
    })

    // console.warn('signupResponse >>', signupResponse.data)
    console.log('signupResponse >>', signupResponse.data)
    if (signupResponse.data.message === "subscriber already exist") {
      TOAST.error(`Subscriber may already exist. Try signing in`)
      return
    }

    if (
      signupResponse.data.status === "error" &&
      signupResponse.data.message !== "subscriber already exist"
    ) {
      store.dispatch(isLoadingReducer(false))
      console.log(signupResponse.data)
      TOAST.error(`Oops! ${signupResponse.data.message}. Try again`)
      return
    }

    if (signupResponse.data.status === "ok") {
      await LoginUnicast(true, mobileNumber, email, password)
      return true
    }
    
  }
}

// Function to validate OTP
export const validateOTP = async (mobileNumber, OTPCode) => {

  try {
    console.log(OTPCode)
    if (OTPCode.length < 6) {
      TOAST.error(ERROR_MESSAGES.AUTH.wrongOTP)
      return
    }

    const OTP = await axios.post(validateOTPAPI(), {
      mobile_number: mobileNumber,
      otp: OTPCode
    });
    return OTP.data;
  } catch (error) {
    // console.error('Error occurred during OTP validation:', error);
    throw error;
  }
}

export const LoginUnicast = async (isPhoneNumber, mobileNumber, email, password) => {
  store.dispatch(isLoadingReducer(true))
  // Validate user data
  if (!validateUserData(isPhoneNumber, mobileNumber, email, password)) {
    return; // Exit function if validation fails
  }
  const deviceInfoCookie = COOKIES.get("device_info")

  // Set username if not already present in local storage

  window.localStorage.setItem("afri_username", prefixedMobileNumber(mobileNumber))

  const username = window.localStorage.getItem('afri_username')
  const selectedOperator = JSON.parse(window.localStorage.getItem('afri_selected_operator'))
  const formattedOperator = username + `@${selectedOperator.operator_uid}`

  // console.warn('device', deviceInfoCookie)

  try {
    const loginResponse = await axios.post(loginAPI, {
      username: formattedOperator,
      password: password,
      device: COOKIES.get("device"),
      device_class: deviceInfoCookie.device.type ? deviceInfoCookie.device.type : "Desktop",
      device_type: deviceInfoCookie.device.vendor || "Desktop",
      device_os: "Windows"
    })

    // console.warn('login uniqcast response >>', loginResponse.data)

    if (loginResponse.data.status === "ok") {
      // console.warn('uniqcast login pass >>', loginResponse.data)
      COOKIES.set("user_info", loginResponse)

      await sendLog({ action: 'login' })
      store.dispatch(isAuthenticatedReducer(true))
      store.dispatch(isLoadingReducer(false))
      // window.location.href = '/home'
      return true;
    }
  }

  catch (e) {
    store.dispatch(isLoadingReducer(false))
    TOAST.error(ERROR_MESSAGES.AUTH.invalidLogin)
    // console.warn('login uniqcast error >>', e.message)
  }
}

const fetchUserAccount = async (isPhoneNumber, mobileNumber, email, navigate) => {
  window.localStorage.setItem("afri_username", prefixedMobileNumber(mobileNumber))

  const subscriber_uid = window.localStorage.getItem("afri_username")
  const selectedOperator = JSON.parse(window.localStorage.getItem("afri_selected_operator"))
  const operator_uid = selectedOperator.operator_uid

  try {
    const fetchUserAccountRes = await axios.get(fetchUserAPI(), {
      params: {
        operator_uid: operator_uid,
        subscriber_uid: subscriber_uid
      }
    });
    // console.log(`user account: ${fetchUserAccountRes.data.data}`)
    if (fetchUserAccountRes.data.status === "ok") {
      if (fetchUserAccountRes.data.data.length === 0) {
        TOAST.error(`${ERROR_MESSAGES.AUTH.invalidAccount}`)
        return false;
      } else {
        const response = await generateOTP(isPhoneNumber, mobileNumber, email)
        store.dispatch(isLoadingReducer(false))
        return response
        // navigate('/otp-verification', { state: {  } })

      }
    }
  } catch (e) {
    TOAST.error("Error verifying account");
    return false;
    // console.warn('fetch user account error >>', e.message)
  }

}

// export const validateUserAccount = async (isPhoneNumber, mobileNumber, email, navigate) => {
//    // Validate user data
//   store.dispatch(isLoadingReducer(true)) 
//   if (!validateUserData(isPhoneNumber, mobileNumber, email)) {
//     store.dispatch(isLoadingReducer(false))

//     return; // Exit function if validation fails
//   }

//   const response = fetchUserAccount(isPhoneNumber, mobileNumber, email, navigate)

//   return response



// }
export const validateUserAccount = async (isPhoneNumber, mobileNumber, email, navigate) => {
  store.dispatch(isLoadingReducer(true));

  // Validate user data first
  if (!validateUserData(isPhoneNumber, mobileNumber, email)) {
    store.dispatch(isLoadingReducer(false));
    return false;
  }

  try {
    const userExists = await fetchUserAccount(isPhoneNumber, mobileNumber, email, navigate);
    return userExists;
  } catch (error) {
    return false;
  } finally {
    store.dispatch(isLoadingReducer(false));
  }
};

export const verifyResetOTP = async (mobileNumber, OTPCode, navigate) => {
  const OTP = await validateOTP(mobileNumber, OTPCode);

  if (OTP.status === 'error') {
    // console.warn('OTP response error >>', OTP.data)
    TOAST.error(OTP.data.message)
    return
  }

  // console.warn('OTP response pass >>', OTP.data)

  if (OTP.status === "ok") {
    store.dispatch(isValidReducer(true))
    navigate('/reset-password')
  }
}


export const resetPassword = async (isPhoneNumber, mobileNumber, email, password, rePassword, navigate) => {
  store.dispatch(isLoadingReducer(true));
  // Validate user data
  if (!validateUserData(isPhoneNumber, mobileNumber, email, password, rePassword)) {
    store.dispatch(isLoadingReducer(false));
    return; // Exit function if validation fails
  }

  const subscriber_uid = window.localStorage.getItem("afri_username")
  const selectedOperator = JSON.parse(window.localStorage.getItem("afri_selected_operator"))
  const operator_uid = selectedOperator.operator_uid
  const url = `https://tvanywhereonline.com/cm/api/subscriber/?operator_uid=${operator_uid}&subscriber_uid=${subscriber_uid}`
  try {
    const resetPasswordRes = await axios.put(url, {
      "password": password
    }
    );

    if (resetPasswordRes.data.message === "subscriber account updated") {
      store.dispatch(isLoadingReducer(false));
      return true;

    }
    throw new Error(ERROR_MESSAGES.AUTH.resetFailed);
  } catch (error) {
    store.dispatch(isLoadingReducer(false))
    throw new Error(error.message || ERROR_MESSAGES.AUTH.resetFailed);
    // console.warn('fetch user account error >>', e.message)
  }

}

