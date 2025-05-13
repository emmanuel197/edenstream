// components/TextareaInput.js
import React from "react";
import PropTypes from "prop-types";
import "../styles/textarea.scss";

const TextareaInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4, // Default number of rows
  error,
  inputStarted,
  className,
  styles
}) => (
  <div className={`form-group ${className}`}>
    <label className="field-label">{label}</label>
    <textarea
      className={`form-control ${error ? "error" : ""} ${
        inputStarted ? "entry-background" : ""
      }`}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      style={styles}
    />
  </div>
);

TextareaInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  error: PropTypes.bool,
  inputStarted: PropTypes.bool,
  className: PropTypes.string,
};

export default TextareaInput;
