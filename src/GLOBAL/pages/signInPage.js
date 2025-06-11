import React, { use, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { COOKIES } from "../../utils/constants";
import Button from "../components/buttons/Button";
import { closeBtn } from "../../utils/assets";
import TextInput from "../components/formInputs/textInput";
import PasswordInput from "../components/formInputs/passwordInput";
import Checkbox from "../components/formInputs/checkbox";
import "../components/styles/SignUp.scss";
import { Link } from "react-router-dom";
import AuthLayout from "../components/authLayer";
import { LoginUnicast } from "../redux/auth";
import { setDeviceInCookies } from "../constants/setDeviceInCookies";
import checkUserAllowed from "../../utils/checkUserAllowed"
const SignInPage = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const { isLoading, redirectTo } = useSelector((state) => state.auth)

  const [email, setEmail] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [password, setPassword] = useState(''); //new field for password
  const spinnerTitle = "Dashboard"

  // const [useMobileNumber, setuseMobileNumber] = useState(true)
  // const [hasSelectedNetworks, setHasSelectedNetworks] = useState(false)

  useEffect(() => {

    // Check if user is authenticated
    const user_info = COOKIES.get("user_info");
    if (user_info) {
      // Redirect to home if authenticated
      navigate('/');
    }
    if (!localStorage.getItem('afri_selected_operator')) {
      navigate('/login')
    }

    setMobileNumber(localStorage.getItem('afri_mobile_number') || '')
  }, [navigate])

  //renamed func from _initVerifyMSISDN to _initVerifyUserData
  // const _initLoginUnicast = () => {
  //   LoginUnicast(true, mobileNumber, email, password) //renamed func from verifyMSISDN to verifyUserData
  // }

  // Renamed func from _initVerifyMSISDN to _initLoginUnicast
  const _initLoginUnicast = async () => {
    const success = await LoginUnicast(true, mobileNumber, email, password); // Renamed func from verifyMSISDN to verifyUserData
    if (success) {
      const redirectLink = redirectTo || '/home';
      console.log(redirectTo)
      window.location.href = redirectLink;
    }
  };

  console.log(redirectTo)
  // console.log(location.state.redirectTo)

  const handleMobileNumberInput = e => {
    let text = e.target.value.replace(/\s+/g, ''); // Remove all spaces
    const limit = 10;
    if (isNaN(Number(text))) return;
    setMobileNumber(text.slice(0, limit));
  }

  // functions to set password when user makes input
  const handlePasswordInput = e => {
    setPassword(e.target.value);
  }



  // I am setting cookies that ll later check for user browser when user logs in
  // this will help in setting the device info for login post API
  // I will do this for the landing and signup - signin
  // and it ll load when the user visits page or refreshes page with useEffect beneath this
  useEffect(() => {
    setDeviceInCookies()
    checkUserAllowed()
    window.scrollTo(0, 0)
  }, [])

  return (
    // <main>
    //   <Header />
    //   <div className="signup-form">
    //     <div className="signup-form-wrapper">
    //       <Button className="signup-close-btn" icon={closeBtn} page="/" />
    //       <div className="signup-form-container">
    //         <h2 className="signup-form-header">Sign In</h2>
    <AuthLayout headerText="Sign In">
       {/* <wc-toast style={{ zIndex: 1000000 }} ></wc-toast> */}
      <div className="form-fields">
        <div className="form-row">
          <TextInput
            className="signup-textinput"
            placeholder="Phone Number"
            value={mobileNumber}
            onChange={handleMobileNumberInput}
          />
        </div>
        <div className="form-row">
          <PasswordInput name="password" placeholder="Password" width="100%" value={password}
                    onChange={handlePasswordInput}/>
        </div>
      </div>
      <div className="forget-password-wrapper">
        <Link to="/reset-password" className="forget-password-link">
          Forgot Password?
        </Link>
      </div>

      <Button className="signup-next-btn" label="Sign In" action={_initLoginUnicast} isDisabled={isLoading}/>
      <div className="checkbox-signinnow-wrapper">
        <Checkbox className="signup-checkbox" label="Remember Me" />
        {/* <p className="signup-checkbox-text">please do not email me about EdenStream Offers</p> */}

        <div className="signin-now-wrapper">
          <p className="already-have-an-account">New to EdenStreams?</p>
          <Link className="signin-now-link" to="/signup"> Sign Up Now</Link>
        </div>
      </div>
    </AuthLayout>

    //       </div>
    //     </div>
    //   </div>
    //   <Footer marginTop="5.313vw" />
    // </main>
  );
};
export default SignInPage;
