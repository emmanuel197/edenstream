// components/OTPVerification.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import OtpInput from 'react-otp-input';
import Button from '../buttons/Button';
import "../../components/styles/OTPVerification.scss"
const OTPVerification = ({ 
  mobileNumber,
  onSubmit,
  onChange,
  value,
  buttonLabel = "Verify",
  headerText = "Verify your phone number",
  descriptionText = "Enter the code sent to"
}) => {
  
  console.log('[OTPVerification] mobileNumber prop:', mobileNumber);
  

  return (
    <div className="otp-verification-step">
      <h3 className="otp-verification-header">{headerText}</h3>
      <p className="otp-verification-paragraph">{descriptionText} {mobileNumber}</p>
      
      <OtpInput
        value={value}
        onChange={onChange}
        numInputs={6}
        separator={<span>-</span>}
        inputStyle="otp-input"
      />
      
      {/* <Button
        className="auth-button"
        label={buttonLabel}
        onClick={handleSubmit}
      /> */}
    </div>
  );
};

export default OTPVerification;