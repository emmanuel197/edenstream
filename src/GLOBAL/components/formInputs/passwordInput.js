// components/PasswordInput.js
import React, { useState } from "react";
import '../../components/styles/password-input.scss'
const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  inputStarted,
  width,
  maxWidth,
  icon,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const location = window.location.pathname;
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
 
  return (
    <div className={`form-group ${className}`} style={{width: width, maxWidth: maxWidth}}>
      <label className="field-label">{label}</label>
      <div className="password-wrapper form-control-wrapper">
      {icon && (
          <span className="input-icon">{icon}</span>
        )}
        <input
        style={{width: width, maxWidth: maxWidth}}
          className={`form-control password-form-control ${error && "error"} ${
            inputStarted && "entry-background"
          }`}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <div
          className={`eye-icon ${showPassword && "show"}`}
          onClick={togglePasswordVisibility}
        ></div>
      </div>

      {/* {location === "/signup" && (
        <div className="strength-bar-wrapper">
        <div className="password-strength-bar">
          <div className="password-progress-bar">
            <div className="background"></div>
            <div className="password-progress"></div>
          </div>
          
        </div>
        <b className="password-percentage">Strong Password</b>
        </div>
      )} */}
    </div>
  );
};

export default PasswordInput;
