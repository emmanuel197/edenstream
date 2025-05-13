// components/InputText.js
import React from "react";
import PropTypes from "prop-types";
import "../../components/styles/text-input.scss";
const TextInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  inputStarted,
  className,
  customeDateWidth,
  styles, 
  icon,
  action,
  iconPosition
}) => (
  <div className={`form-group ${className}`} onClick={action}>
    {label && <label className="field-label">{label}</label>}
    <div
        className={`form-control-wrapper ${error ? "error" : ""} ${
          inputStarted ? "entry-background" : ""
        } ${customeDateWidth}`}
        style={styles}
      >
        {/* Icon on the left */}
        {icon && (
          <span className="input-icon ">{icon}</span>
        )}
         <input
      className="form-control"
      name={name}
      min={0}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={styles}
    />
    {/* {icon && iconPosition === "right" && (
          <span className="input-icon right">{icon}</span>
        )} */}
    </div>
   
  </div>
);

// TextInput.propTypes = {
//   label: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   placeholder: PropTypes.string,
//   type: PropTypes.string,
//   error: PropTypes.bool,
//   inputStarted: PropTypes.bool,
// };

export default TextInput;
