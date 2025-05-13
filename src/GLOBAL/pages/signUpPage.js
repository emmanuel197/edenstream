// import React, { useEffect, useState } from "react"
// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { setDeviceInCookies } from "../constants/setDeviceInCookies"
// import { verifyUserData } from "../redux/auth"
// import { Link } from "react-router-dom"
// import Spinner from "../components/Spinner"
// import checkUserAllowed from "../../utils/checkUserAllowed"
// import Button from "../components/buttons/Button"
// import Footer from "../components/Footer"
// import Header from "../components/Header"
// import '../components/styles/auth.scss'
// import { COOKIES } from "../../utils/constants"
// const SignUpPage = () => {
//   const navigate = useNavigate()
//   const { isLoading } = useSelector((state) => state.auth)
//   const [email, setEmail] = useState('')
//   const [mobileNumber, setMobileNumber] = useState('')
//   const [password, setPassword] = useState(''); //new field for password
//   const [rePassword, setRePassword] = useState(''); //confirmation of new password
//   const user_info = COOKIES.get("user_info");
//   // const [useMobileNumber, setuseMobileNumber] = useState(true)
//   // const [hasSelectedNetworks, setHasSelectedNetworks] = useState(false)

//   useEffect(() => {
//     // Check if user is authenticated

//       // Redirect to home if authenticated
//       user_info && navigate('/');

//  }, [user_info])
//   useEffect(() => {
//     if (!localStorage.getItem('afri_selected_operator')) {
//       navigate('/signup')
//     }

//     setMobileNumber(localStorage.getItem('afri_mobile_number') || '')
//   }, [navigate])

//   //renamed func from _initVerifyMSISDN to _initVerifyUserData
//   const _initVerifyUserData = () => {
//     verifyUserData(true, mobileNumber, email, password, rePassword, navigate) //renamed func from verifyMSISDN to verifyUserData
//   }

//   const handleMobileNumberInput = e => {
//     const text = e.target.value
//     const limit = 10
//     if (isNaN(Number(text))) return
//     setMobileNumber(text.slice(0, limit))
//   }

//   // functions to set password when user makes input
//   const handlePasswordInput = e => {
//     setPassword(e.target.value);
//   }

//   const handleRePasswordInput = e => {
//     setRePassword(e.target.value);
//   };

//   // I am setting cookies that ll later check for user browser when user logs in
//   // this will help in setting the device info for login post API
//   // I will do this for the landing and signup - signin
//   // and it ll load when the user visits page or refreshes page with useEffect beneath this
//   useEffect(() => {
//     setDeviceInCookies()
//     checkUserAllowed()
//     window.scrollTo(0, 0)
//   }, [])

//   return (
//     <>
//       <Header links={1} signup={5} />
//       <main>
//         <wc-toast></wc-toast>
//         {isLoading && <Spinner />}
//         <div className="auth">
//           <div className="auth-wrapper">
//             <div className="auth-container">
//               <div className="form-container">
//                 <h2>Sign Up</h2>
//                 <div>
//                   {/* <label>Phone number</label> */}
//                   <input
//                     placeholder="eg. 0541234567"
//                     value={mobileNumber}
//                     onChange={handleMobileNumberInput}
//                   />
//                 </div>
//                 <div>
//                   {/* <label>Password</label> */}
//                   <input
//                     placeholder="Password"
//                     type='password'
//                     value={password}
//                     onChange={handlePasswordInput}
//                     minLength='7'
//                     required
//                   />
//                 </div>
//                 <div>
//                   {/* <label>Confirm Password</label> */}
//                   <input
//                     placeholder="Confirm Password"
//                     type='password'
//                     value={rePassword}
//                     onChange={handleRePasswordInput}
//                     minLength='7'
//                     required
//                   />
//                 </div>
//                 <div className="margin-bottom">
//                   <small >
//                     Already have an account? {" "}
//                     <Link className="sign-up-link" to='/signin'>Sign in</Link>
//                   </small>
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', userSelect: 'none' }}>
//                   <Button action={_initVerifyUserData} isDisabled={isLoading} label='Continue' />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   )
// }

// export default SignUpPage
import React, { use, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../components/styles/SignUp.scss";
import Button from "../components/buttons/Button";
import { closeBtn, paymentOptionsArrow, previewPlaceholder, accountSetupSuccessImg, SignUpDateOfBirthImg } from "../../utils/assets";
import TextInput from "../components/formInputs/textInput";
import PasswordInput from "../components/formInputs/passwordInput";
import Checkbox from "../components/formInputs/checkbox";
import { Link } from "react-router-dom";
import { signupBg } from "../../utils/assets";
import { nextStep, prevStep, setStep } from "../redux/slice/formSlice";
import { chunkArray } from "../../utils/chunkArr";
import PlansContainer from "../components/plansContainer";
import SelectInput from "../components/formInputs/selectInput";
import AuthLayout from "../components/authLayer";
import SingleDatePicker from "../components/singleDatePicker";
import { format } from "date-fns";
import {useSignupForm} from "../../utils/useSignupForm";
import OTPVerification from "../components/otpVerificationPage/otpVerification";
import { fetchGenres } from "../redux/fetchMoviesApi";


const SignUpPage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const { step, inputStarted } = useSelector((state) => state.form);
  const [nextAction, setNextAction] = useState(() => () => {});
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 setNextButtonAction={setNextAction}/>;
      case 2:
        return <Step2 setNextButtonAction={setNextAction}/>;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Step5 />;
      case 6:
        return <Step6 />;
      case 7:
        return <ChangeAvatar />;
      case 8:
        return <AccountSetupSuccess />;
      // Add more cases for additional steps
      default:
        return <Step1 />;
    }
  };

  const getButtonLabel = (step) => {
    const labels = {
      1: 'Next',
      2: 'Done',
      3: 'Next',
      5: 'Start Membership',
      6: 'Start Membership',
      7: 'Next',
      8: 'Done'
    };
    return labels[step] || 'Continue';
  };

  const signUpFormWrapperClassName = `${step ? ` step${step}` : ""}`;

  // Only show the "Next" button for certain steps
  const showNextButton = ![5, 6, 7].includes(step);
  return (
    // <main>
    //   <Header />
    //   <div className="signup-form">
    //     <div className={signUpFormWrapperClassName}>
    //       <Button className="signup-close-btn" icon={closeBtn} page="/" />
    //       <div className="signup-form-container">
    //         <h2 className="signup-form-header">Sign Up</h2>
    <AuthLayout headerText="Sign Up" wrapperClassName={signUpFormWrapperClassName}>
      <wc-toast></wc-toast>
      {renderStep()}
      {showNextButton && (
        <Button
          className="signup-next-btn"
          label={getButtonLabel(step)}
          action={nextAction}
          disabled={isLoading}
        />
      )}
      <div className="checkbox-signinnow-wrapper">
        {step === 1 && (
          <Checkbox
            className="signup-checkbox"
            label="please do not email me about EdenStream Offers"
          />
        )}
        {/* <p className="signup-checkbox-text">please do not email me about EdenStream Offers</p> */}

        <div className="signin-now-wrapper">
          <p className="already-have-an-account">
            Already have an account?
          </p>
          <Link className="signin-now-link" to="/login">Sign In Now</Link>
        </div>
      </div>
      {/* </div>
        </div> */}
      {/* <div className="signup-page-bg">
            <img loading="lazy" src={signupBg} alt="signup-page-bg"/>
          </div> */}
    </AuthLayout>
    //   <Footer marginTop="5.313vw" />
    // </main>
  );
};

const Step1 = ({ setNextButtonAction }) => {
  const dispatch = useDispatch();
  const { formData, handleInputChange, handleSubmit } = useSignupForm(1);
  const [showDatePicker, setShowDatePicker] = useState(false) 


  const handleDatePicker = () => {
    setShowDatePicker(prev => !prev)
  }

  const handleDateSelect = (date) => {
    handleInputChange('dob', date);
    setShowDatePicker(false);
  };

  useEffect(() => {
    setNextButtonAction(() => () => handleSubmit(() => dispatch(nextStep())));
  }, [formData]);
  return (
    <div className="step1-date-picker">
     <div className="form-fields step-1">
      <div className="form-row">
        <TextInput
          className="signup-textinput"
          placeholder="Phone Number"
          value={formData.mobileNumber}
          onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
        />
      </div>
      <div className="form-row">
        <TextInput
        icon={<SignUpDateOfBirthImg className="dateofbirth-icon "/>}
          className="signup-textinput"
          placeholder="Date of Birth"
          value={formData.dob ? format(formData.dob, 'MM/dd/yyyy') : ''}
          readOnly
          action={() => handleDatePicker() }
        />
      </div>
      <div className="form-row">
        <PasswordInput name="password"  value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} placeholder="Password" width="100%" />
      </div>
      <div className="form-row">
        <PasswordInput
          name="rePassword"
          placeholder="Enter your password again"
          width="100%"
          value={formData.rePassword}
          onChange={(e) => handleInputChange('rePassword', e.target.value)}
        />
      </div>
    </div>
    {showDatePicker && (
        <SingleDatePicker 
          className="date-picker-position"
          onDateSelect={handleDateSelect}
        />
      )}
    </div>
   
  );
};

const Step2 = ({ setNextButtonAction, variant }) => {
  const dispatch = useDispatch();
  const { formData, handleInputChange, handleSubmit } = useSignupForm(2);
  const mobileNumber = useSignupForm(1).mobileNumber; // Get from form state instead of localStorage 

  
  useEffect(() => {
    setNextButtonAction(() => () => handleSubmit(() => dispatch(nextStep())));
  }, [formData]);

  return (
    
      <OTPVerification
      mobileNumber={mobileNumber}
      value={formData.otp}
      onChange={(otp) => handleInputChange('otp', otp)}
       // Your signup OTP verification action    
    />
     
   
  );
};
export const Step3 = ({ className }) => {
  const dispatch = useDispatch();
  const genres = useSelector(state => state.genres || []);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Fetch genres on component mount
  useEffect(() => {
    fetchGenres(dispatch);
  }, [dispatch]);

  // Update to use genre names and IDs
  const toggleCategory = (genreId, genreName) => {
    setSelectedCategories(prevSelected => {
      const exists = prevSelected.some(item => item.id === genreId);
      return exists
        ? prevSelected.filter(item => item.id !== genreId)
        : [...prevSelected, { id: genreId, name: genreName }];
    });
  };

  // Group genres into columns of 4
  const columns = chunkArray(genres, 4);

  return (
    <div className={`step2 ${className}`}>
      <div className="pick-at-least-wrapper">
        <p className="pick-at-least-text">
          Pick at Least <span>5 Categories</span> to Personalize Your Feed
        </p>
        <div className="selected-wrapper">
          <span className="number-selected">
            {selectedCategories.length}/5
          </span> {"selected"}
        </div>
      </div>
      <div className="categories-container">
        {columns.map((column, colIndex) => (
          <div className="categories-col" key={colIndex}>
            {column.map(genre => (
              <div
                className={`category-item ${
                  selectedCategories.some(item => item.id === genre.id) ? "selected" : ""
                }`}
                key={genre.id}
                onClick={() => toggleCategory(genre.id, genre.name)}
              >
                {genre.name}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const Step4 = () => {
  return (
    <div className="step3">
      <div className="choose-how-wrapper">
        <h3 className="choose-how-header">Choose how to pay</h3>
        <p className="choose-how-paragraph">
          Your payment is encrypted and you can change how you pay anytime
        </p>
      </div>
      <PlansContainer variant="step3" />
    </div>
  );
};

const Step5 = () => {
  const dispatch = useDispatch();
  const goCreditCard = () => {
    dispatch(setStep(5));
  };

  const goMobileMoney = () => {
    dispatch(setStep(6));
  };
  return (
    <div className="step4">
      <div className="how-to-pay-wrapper">
        <h3 className="how-to-pay-header">Choose how to pay</h3>
        <p className="how-to-pay-paragraph">
          Your payment is encrypted and you can change how you pay anytime
        </p>
      </div>
      <div className="payment-options-btn-group">
        <Button
          className="credit-debit-btn"
          label="Credit or Debit Card"
          icon={paymentOptionsArrow}
          action={goCreditCard}
        />
        <Button
          className="momo-btn"
          label="Mobile Money"
          icon={paymentOptionsArrow}
          action={goMobileMoney}
        />
      </div>
    </div>
  );
};

const Step6 = () => {
  const dispatch = useDispatch();
  const goBack = () => {
    dispatch(setStep(3));
  };
  const avatarHandler = () => {
    dispatch(setStep(7))
  }
  return (
    <div className="step5">
      <div className="credit-header-wrapper">
        <h3 className="credit-header">Set up your credit or debit Card</h3>
        <p className="credit-paragraph">
          Your payment is encrypted and you can change how you pay anytime
        </p>
      </div>
      <div className="credit-card-form">
        <div className="form-row">
          <TextInput
            className="step5-form-textinput-size "
            placeholder="Card Number"
          />
        </div>
        <div className="form-row">
          <TextInput
            className="step5-form-textinput-size "
            placeholder="Expiration Date"
          />
          <TextInput className="step5-form-textinput-size " placeholder="CVV" />
        </div>
        <div className="form-row">
          <TextInput
            className="step5-form-textinput-size "
            placeholder="Name on the card"
          />
        </div>
        <div className="change-selected-plan-wrapper">
          <p className="selected-plan-text">GH.10.00/daily</p>
          {/* <Link className="change-plan-link">Change</Link> */}
          <Button className="change-plan-link" label="change" action={goBack} />
        </div>
        <Checkbox
          className="credit-form-checkbox"
          label="By checking the box, you agree to our Terms of Use and Privacy Policy, and confirm you’re over 18."
        />
      </div>
      <Button
        className="start-membership-btn"
        label="Start Membership"
        action={avatarHandler}
      />
    </div>
  );
};

const Step7 = () => {
  const dispatch = useDispatch();
  const goBack = () => {
    dispatch(setStep(3));
  };
  return (
    <div className="step6">
      <div className="mobile-money-header-wrapper">
        <h3 className="mobile-money-header">Set up your Mobile Money</h3>
        <p className="mobile-money-paragraph">
          Your payment is encrypted and you can change how you pay anytime
        </p>
      </div>
      <div className="mobile-money-form">
        <div className="form-row">
          {/* <TextInput
            className="step5-form-textinput-size "
            placeholder="Card Number"
          /> */}
          <SelectInput
            placeholder="Select Network"
            options={[
              { value: "Mtn", label: "Mtn" },
              { value: "Telecel", label: "Telecel" },
              { value: "AirtelTigo", label: "AirtelTigo" }
            ]}
          />
        </div>
        <div className="form-row">
          <TextInput
            className="step6-form-textinput-size"
            placeholder="Expiration Date"
          />
          <TextInput className="step6-form-textinput-size" placeholder="CVV" />
        </div>
        <div className="change-selected-plan-wrapper">
          <p className="selected-plan-text">GH.10.00/daily</p>
          {/* <Link className="change-plan-link">Change</Link> */}
          <Button className="change-plan-link" label="change" action={goBack} />
        </div>
        <Checkbox
          className="credit-form-checkbox"
          label="By checking the box, you agree to our Terms of Use and Privacy Policy, and confirm you’re over 18."
        />
      </div>
      <Button
        className="start-membership-btn"
        label="Start Membership"
        action={goBack}
      />
    </div>
  );
};
const ChangeAvatar = () => {
  // Main preview (the big image in the center)
  const [mainPreview, setMainPreview] = useState(null);

  // Suppose we have 5 avatar options
  const [avatarOptions] = useState([
    { id: 1, src: "/assets/avatar1.png" },
    { id: 2, src: "/assets/avatar2.png" },
    { id: 3, src: "/assets/avatar3.png" },
    { id: 4, src: "/assets/avatar4.png" },

  ]);

  // Keep track of original avatar to allow reset
  const [originalAvatar] = useState(mainPreview);

  const handleAvatarClick = (src) => {
    setMainPreview(src);
  };

  const handleReset = () => {
    setMainPreview(originalAvatar);
  };

  const handleSaveChanges = () => {
    // ... e.g., call API or update state with the new avatar
    console.log("Saved new avatar:", mainPreview);
  };

  return (
    <div className="change-avatar-container">
      {/* Large center preview */}
      <div className="choose-avatar-header-wrapper">
        <h3 className="choose-avatar-header">Choose An Avatar</h3>
        <p className="choose-avatar-paragraph">Select any of the avatar to suit your preference with your username</p>
      </div>
      <div className="main-preview-wrapper">
        {mainPreview ? <img loading="lazy" className="main-preview-img" src={mainPreview} alt="Main Preview" /> :
          <div className="main-placeholder-preview">
            <img loading="lazy" className="preview-placeholder" src={previewPlaceholder} />
          </div>}

        <div className="edit-icon-overlay">

        </div>
        <TextInput className="change-avatar-textinput" placeholder="User Name" />
      </div>

      <div className="thumbnail-row">
        {avatarOptions.map((avatar) => (
          <img
            key={avatar.id}
            src={avatar.src}
            alt={`Avatar ${avatar.id}`}
            className="thumbnail-img"
            onClick={() => handleAvatarClick(avatar.src)}
          />
        ))}
      </div>

    </div>
  );
};

const AccountSetupSuccess = () => {
  return (
    <div className="accountsetup-success">
      <img loading="lazy" className="accountsetup-success-img" src={accountSetupSuccessImg} />
      <div className="accountsetup-success-text">
      <h3 className="account-setup-success-header">Congratulations!</h3>
      <p className="account-setup-success-paragraph">You have successfully setup your account
        Welcome to EdenStream</p>
      </div>
    </div>
  )
}
export default SignUpPage;
