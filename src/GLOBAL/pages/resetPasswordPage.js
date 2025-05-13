import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/authLayer";
import Radio from "../components/formInputs/radioInput";
import TextInput from "../components/formInputs/textInput";
import Button from "../components/buttons/Button";
import "../components/styles/reset-password.scss";
import PhoneNumberInput from "../components/formInputs/phoneNumberInput";
import PasswordInput from "../components/formInputs/passwordInput";
import { resetPassword, validateUserAccount, validateOTP } from "../redux/auth";
import OTPVerification from "../components/otpVerificationPage/otpVerification";
import { isValidReducer } from "../redux/slice/authSlice";
import { TOAST } from "../../utils/constants";

// const RESET_OPTIONS_CONFIG = {
//   email: {
//     paragraph:
//       "We will send you an email with instructions on how to reset your password.",
//     input: <TextInput placeholder="Email" />,
//     buttonLabel: "Send Email"
//   },
//   sms: {
//     paragraph:
//       "We will text you a verification code to reset your password. Message and data rates may apply.",
//     input: <PhoneNumberInput value={mobileNumber} onChange={handleMobileNumberInput}/>,
//     buttonLabel: "RESET PASSWORD"
//   }
// };

const ResetPasswordPage = () => {
  
  const [selectedOption, setSelectedOption] = useState("sms");
 
  
  const [submitted, setSubmitted] = useState(false);
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

 


  const handleSubmit = () => {
    setSubmitted((prev) => !prev);
  };

  const marginTop = submitted ? "8.802vw" : "0px"
  // Retrieve the config for the selected option

  return (
    <>
      <AuthLayout headerText="Forgot Password?" marginTop={marginTop}>
      <wc-toast></wc-toast>
        {!submitted && <ForgotPasswardForm
          handleOptionChange={handleOptionChange}
          handleSubmit={handleSubmit}
          selectedOption={selectedOption}
        />}
      {submitted && <InstructionsSentContainer/>}
      <div className="remember-account-wrapper">
        <p className="remember-account-text">Remember Account?</p>
        <Link className="signin-now-link" to="/login">
          Sign In Now
        </Link>
      </div>
      </AuthLayout>
    </>
  );
};
const ForgotPasswardForm = ({
  handleOptionChange,
  handleSubmit,
  selectedOption
}) => {
  // const { paragraph, input, buttonLabel } =
  //   RESET_OPTIONS_CONFIG[selectedOption];
  const navigate = useNavigate();
    const { isValid, isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const [showOTP, setShowOTP ] = useState(false)
    const [otp, setOtp] = useState('');
    // const _initValidateUserAccount = () => {
    //   // LoginUnicast(true, mobileNumber, email, password) //renamed func from verifyMSISDN to verifyUserData
    //   const success = validateUserAccount(true, mobileNumber, email, navigate)
    //   console.log(success)
    //   setShowOTP(success);
    // };
    const _initValidateUserAccount = async () => {
      try {
        const isValid = await validateUserAccount(true, mobileNumber, email, navigate);
        if (isValid) {
          setShowOTP(true);
        }
      } catch (error) {
        TOAST.error("Validation failed. Please check your mobile number.");
      }
    };
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); //new field for password
  const [rePassword, setRePassword] = useState(""); //confirmation of new password
    const handleMobileNumberInput = (e) => {
      const text = e.target.value;
      const limit = 10;
      if (isNaN(Number(text))) return;
      setMobileNumber(text.slice(0, limit));
    };
  
    // functions to set password when user makes input
    const handlePasswordInput = (e) => {
      setPassword(e.target.value);
    };
  
    const handleRePasswordInput = (e) => {
      setRePassword(e.target.value);
    };
    useEffect(() => {
      if (!localStorage.getItem("afri_selected_operator")) {
        navigate("/reset-password");
      }
  
      setMobileNumber(localStorage.getItem("afri_mobile_number") || "");
    }, [navigate]);
  
    //renamed func from _initVerifyMSISDN to _initVerifyUserData
    
    const _initResetPassword = async () => {
      try {
        const success = await resetPassword(
          true,
          mobileNumber,
          email,
          password,
          rePassword
        );
        
        if (success) {
          TOAST.success("Password reset successful! You can now login.");
          setTimeout(() => navigate("/login"), 3000); // Give time to see toast
        }
      } catch (error) {
        TOAST.error(error.message);
        // Reset state to initial form
        dispatch(isValidReducer(false));
        setShowOTP(false);
        setPassword("");
        setRePassword("");
      }
    };
    const handleOTPSubmit = async () => {
      try {
        const result = await validateOTP(mobileNumber, otp);
        if (result.status === 'ok') {
          dispatch(isValidReducer(true)); // Update Redux state
          setShowOTP(false);
        } 
        else if (result.status === 'error') {
          TOAST.error(result.message);
        }
          
        
      } catch (error) {
        // TOAST.error(error.message);
      }
    };
  return (
    <div className="forgot-password-form-wrapper">
      {!isValid && !showOTP && (<>
      <p className="forgot-password-paragraph-2">
       Enter your username to reset your password
      </p>
      <div className="forgot-password-form">
        {/* <div className="radio-options">
          <Radio
            name="resetOption"
            label="Email"
            value="email"
            checked={selectedOption === "email"}
            onChange={handleOptionChange}
          />
          <Radio
            name="resetOption"
            label="Text Message"
            value="sms"
            checked={selectedOption === "sms"}
            onChange={handleOptionChange}
          />
        </div> */}
        {/* <p className="forgot-password-paragraph-3">{paragraph}</p> */}
        {/* {input} */}

        <TextInput  
        placeholder="eg. 0541234567"           
        value={mobileNumber}             
        onChange={handleMobileNumberInput}/>
      </div>
     
      </>)}
      {showOTP && (<><OTPVerification
          mobileNumber={mobileNumber}
          value={otp}
          onChange={e => setOtp(e)}
          /></>)}
      {isValid && !showOTP &&(
                  <>
                    <p className="forgot-password-paragraph-2">Enter your new password</p>
                    <p className="forgot-password-paragraph-2">{mobileNumber}</p>
                    <div className="forgot-password-form">
                    
                      <PasswordInput placeholder="Password" value={password} onChange={handlePasswordInput}/>
                    
                        <br/>      
                      <PasswordInput placeholder="Confirm Password" value={rePassword} onChange={handleRePasswordInput}/>
                    </div>
                  </>)}
      {/* <p className="forgot-password-paragraph-1">
        Update password, email or phone
      </p> */}
     <Button
  className="send-email-btn"
  label={
    showOTP ? "Done" : 
    isValid ? "CONTINUE" : "RESET PASSWORD"
  }
  action={async () => {
    if (showOTP) {
      await handleOTPSubmit();
    } else if (isValid) {
      await _initResetPassword();
    } else {
      await _initValidateUserAccount();
    }
  }}
  isDisabled={isLoading}
/>
      
    </div>
  );
};

const InstructionsSentContainer = () => {
  return (
    <div className="instructions-sent-container">
    <h3 className="instructions-sent-header">
      Update password, email or phone
    </h3>
    <p className="instructions-sent-paragraph">
      An email with instructions on how to reset your password has been
      sent to <span className="email-span">da***********@gmail.com</span>. Check your spam or junk folder if
      you don’t see the email in your inbox.
    </p>
  </div>
  )
}
export default ResetPasswordPage;
