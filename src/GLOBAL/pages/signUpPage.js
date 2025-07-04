import React, { use, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../components/styles/SignUp.scss";
import Button from "../components/buttons/Button";
import { closeBtn, paymentOptionsArrow, previewPlaceholder, accountSetupSuccessImg, SignUpDateOfBirthImg } from "../../utils/assets";
import TextInput from "../components/formInputs/textInput";
import PasswordInput from "../components/formInputs/passwordInput";
import Checkbox from "../components/formInputs/checkbox";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import Cookies from "universal-cookie";
import { ERROR_MESSAGES } from '../../utils/constants';
import { COOKIES } from "../../utils/constants"
const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading } = useSelector((state) => state.auth);
  const { step, inputStarted } = useSelector((state) => state.form);
  const [nextAction, setNextAction] = useState(() => () => {});
  const cookies = new Cookies();
  const user_info = cookies.get("user_info");

   useEffect(() => {
    if (user_info && location.pathname === '/signup' && ![3, 4, 5].includes(step)) {
      navigate('/');
    }
 }, [user_info, navigate, location.pathname, step]) 
  const TOTAL_SIGNUP_STEPS = 5;

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 setNextButtonAction={setNextAction}/>;
      case 2:
        return <Step2 setNextButtonAction={setNextAction}/>;
      case 3:
        return <Step3 setNextButtonAction={setNextAction} />;
      case 4:
        return <ChangeAvatar setNextButtonAction={setNextAction} />;
      case 5:
        return <AccountSetupSuccess />;
      default:
        return <Step1 />;
    }
  };

  const getButtonLabel = (step) => {
    const labels = {
      1: 'Next',
      2: 'Done',
      3: 'Next',
      4: 'Next',
      5: 'Done'
    };
    return labels[step] || 'Continue';
  };

  const signUpFormWrapperClassName = `${step ? ` step${step}` : ""}`;

  useEffect(() => {
    if (step === 5) {
      setNextAction(() => () => {
        navigate('/home');
      });
    }
  }, [step, navigate]);
  return (
    <AuthLayout 
      headerText="Sign Up" 
      wrapperClassName={signUpFormWrapperClassName}
      totalSteps={TOTAL_SIGNUP_STEPS}
    >
      <wc-toast></wc-toast>
      {renderStep()}
 
        <Button
          className="signup-next-btn"
          label={getButtonLabel(step)}
          action={nextAction}
          disabled={isLoading}
        />
   
      <div className="checkbox-signinnow-wrapper">
        {step === 1 && (
          <Checkbox
            className="signup-checkbox"
            label="please do not email me about EdenStream Offers"
          />
        )}

        <div className="signin-now-wrapper">
          <p className="already-have-an-account">
            Already have an account?
          </p>
          <Link className="signin-now-link" to="/login">Sign In Now</Link>
        </div>
      </div>
    </AuthLayout>
  );
};

const Step1 = ({ setNextButtonAction }) => {
  const dispatch = useDispatch();
  const { formData, handleInputChange, handleSubmit } = useSignupForm(1);
  const [showDatePicker, setShowDatePicker] = useState(false)
  const datePickerRef = useRef(null);
  const [errors, setErrors] = useState({ mobileNumber: '', password: '', rePassword: '', dob: '' });

  const validateMobileNumber = (value) => {
    return /^\d{10}$/.test(value);
  };
  const validatePassword = (value) => (value || '').length >= 7;
  const validateRePassword = (value, password) => (value || '').length >= 7 && value === (password || '');
  const validateDOB = (value) => !!value;

  const handleDatePicker = () => {
    setShowDatePicker(prev => !prev)
  }

  const handleDateSelect = (date) => {
    handleInputChange('dob', date);
    setShowDatePicker(false);
    console.log('[Step1] dob after select:', date);
  };

  useEffect(() => {
    console.log('[Step1] formData:', formData);
    setNextButtonAction(() => () => {
      let hasError = false;
      const newErrors = { ...errors };

      if (!validateMobileNumber(formData.mobileNumber)) {
        newErrors.mobileNumber = ERROR_MESSAGES.AUTH.invalidMobileNumber;
        hasError = true;
      } else {
        newErrors.mobileNumber = '';
      }

      if (!validateDOB(formData.dob)) {
        newErrors.dob = 'Please enter your date of birth';
        hasError = true;
      } else {
        newErrors.dob = '';
      }

      if (!validatePassword(formData.password)) {
        newErrors.password = ERROR_MESSAGES.AUTH.invalidPassword;
        hasError = true;
      } else {
        newErrors.password = '';
      }

      if (!validateRePassword(formData.rePassword, formData.password)) {
        newErrors.rePassword = ERROR_MESSAGES.AUTH.passwordMismatch;
        hasError = true;
      } else {
        newErrors.rePassword = '';
      }

      setErrors(newErrors);
      if (hasError) return;
      let submitData = { ...formData };
      if (submitData.dob && typeof submitData.dob !== 'string') {
        submitData = { ...submitData, dob: submitData.dob.toISOString() };
        console.log('[Step1] Converted dob to string:', submitData.dob);
      }
      console.log('[Step1] Submitting with data:', submitData);
      handleSubmit(() => dispatch(nextStep()));
    });
  }, [formData]);

  useEffect(() => {
    if (!showDatePicker) return;
    function handleClickOutside(event) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDatePicker]);

  return (
    <div className="step1-date-picker">
     <div className="form-fields step-1">
      <div className="form-row form-col">
        <TextInput
          className="signup-textinput"
          placeholder="Phone Number"
          value={formData.mobileNumber}
          onChange={(e) => handleInputChange('mobileNumber', e.target.value.replace(/\s+/g, ''))}
          error={!!errors.mobileNumber}
          errorMessage={errors.mobileNumber}
        />
      </div>
      <div className={`form-row form-col date-picker-wrapper${errors.dob ? ' error' : ''}`} ref={datePickerRef}>
        <TextInput
        icon={<SignUpDateOfBirthImg className="dateofbirth-icon "/>}
          className="signup-textinput"
          placeholder="Date of Birth"
          value={formData.dob ? format(formData.dob, 'MM/dd/yyyy') : ''}
          readOnly
          action={() => handleDatePicker() }
          error={!!errors.dob}
          errorMessage={errors.dob}
        />
        {showDatePicker && (
          <SingleDatePicker 
            className="date-picker-dropdown"
            onDateSelect={handleDateSelect}
          />
        )}
      </div>
      <div className="form-row form-col">
        <PasswordInput name="password"  value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} placeholder="Password" width="100%" error={!!errors.password} errorMessage={errors.password} />
      </div>
      <div className="form-row form-col">
        <PasswordInput
          name="rePassword"
          placeholder="Enter your password again"
          width="100%"
          value={formData.rePassword}
          onChange={(e) => handleInputChange('rePassword', e.target.value)}
          error={!!errors.rePassword}
          errorMessage={errors.rePassword}
        />
      </div>
    </div>
    </div>
   
  );
};

const Step2 = ({ setNextButtonAction, variant }) => {
  const dispatch = useDispatch();
  const { formData, handleInputChange, handleSubmit } = useSignupForm(2);
  const { formData: formDataStep1 } = useSignupForm(1);
  const mobileNumber = formDataStep1.mobileNumber;

  useEffect(() => {
    console.log('[Step2] formData:', formData);
    setNextButtonAction(() => () => {
      console.log('[Step2] Submitting with data:', formData);
      handleSubmit(() => dispatch(nextStep()));
    });
  }, [formData]);

  return (
    <OTPVerification
      mobileNumber={mobileNumber}
      value={formData.otp}
      onChange={(otp) => handleInputChange('otp', otp)}
    />
  );
};
export const Step3 = ({ setNextButtonAction, className, initialSelectedCategories = [], onSave }) => {
  const dispatch = useDispatch();
  const genres = useSelector(state => state.genres || state.fetchMovies?.genres || []);
  const [selectedCategories, setSelectedCategories] = useState(initialSelectedCategories);
  const [error, setError] = useState('');
  const cookies = new Cookies();

  useEffect(() => {
    fetchGenres(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (initialSelectedCategories && initialSelectedCategories.length) {
      setSelectedCategories(initialSelectedCategories);
    }
  }, [initialSelectedCategories]);

  useEffect(() => {
    console.log("Updated genres in Step3:", genres);
  }, [genres]);

  const toggleCategory = (genre) => {
    setSelectedCategories(prevSelected =>
      prevSelected.includes(genre)
        ? prevSelected.filter(item => item !== genre)
        : [...prevSelected, genre]
    );
  };

  useEffect(() => {
    if (!setNextButtonAction) return;
    setNextButtonAction(() => () => {
      if (selectedCategories.length < 5) {
        setError('Please select at least 5 categories to proceed.');
        return;
      }
      setError('');
      cookies.set('edenstream_genre_preferences', selectedCategories, { path: '/' });
      dispatch(setStep(4));
    });
  }, [selectedCategories, setNextButtonAction, dispatch]);

  const columns = chunkArray(genres, 4);

  const handleSave = () => {
    if (selectedCategories.length < 5) {
      setError('Please select at least 5 categories to proceed.');
      return;
    }
    setError('');
    if (onSave) {
      onSave(selectedCategories);
    }
  };

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
      {error && (
        <div className="error-message" style={{marginBottom: '1em'}}>
          <span style={{fontSize: '1.2em', marginRight: '0.5em'}}>✖</span>
          {error}
        </div>
      )}
      <div className="categories-container">
        {columns.map((column, colIndex) => (
          <div className="categories-col" key={colIndex}>
            {column.map(genre => (
              <div
                className={`category-item ${
                  selectedCategories.includes(genre) ? "selected" : ""
                }`}
                key={genre}
                onClick={() => toggleCategory(genre)}
              >
                {genre}
              </div>
            ))}
          </div>
        ))}
      </div>
      {onSave && (
        <Button className="save-prefchanges-btn" label="Save Changes" action={handleSave} />
      )}
    </div>
  );
};

const ChangeAvatar = ({ setNextButtonAction }) => {
  const [mainPreview, setMainPreview] = useState(null);
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const [avatarOptions] = useState([
    { id: 1, src: "/assets/avatar1.png" },
    { id: 2, src: "/assets/avatar2.png" },
    { id: 3, src: "/assets/avatar3.png" },
    { id: 4, src: "/assets/avatar4.png" },
  ]);

  const [originalAvatar] = useState(mainPreview);

  const handleAvatarClick = (src) => {
    setMainPreview(src);
  };

  const handleReset = () => {
    setMainPreview(originalAvatar);
  };

  useEffect(() => {
    if (!setNextButtonAction) return;
    setNextButtonAction(() => () => {
      if (mainPreview) {
        cookies.set('edenstream_avatar', mainPreview, { path: '/' });
        dispatch(setStep(5));
      }
    });
  }, [mainPreview, setNextButtonAction, dispatch]);

  return (
    <div className="change-avatar-container">
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
