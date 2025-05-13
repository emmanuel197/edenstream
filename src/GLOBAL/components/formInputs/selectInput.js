// // components/SelectInput.jsx
// import React from 'react';
// import "../../components/styles/select-input.scss";
// const SelectInput = ({ label, name, value, placeholder, onChange, options, error, inputStarted, className }) => {
//   return (
//     <div className={`form-group ${className}`}>
//       <label className="field-label">{label}</label>
//       <select
//         className={`form-control ${error && 'error'} ${inputStarted && 'entry-background'} select-form-control`}
//         name={name}
//         value={value}
//         onChange={onChange}
//       >
//         <option value="" disabled>{placeholder}</option>
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>{option.label}</option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default SelectInput;

// components/SelectInput.jsx
import React from "react";
import "../../components/styles/select-input.scss";

const SelectInput = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  options,
  error,
  inputStarted,
  className = "",
  icon,                 // NEW: pass in an icon (React component or JSX)
  iconPosition = "left" // NEW: "left" or "right"
}) => {
  return (
    <div className={`form-group ${className}`}>
      {label && <label className="field-label">{label}</label>}

      {/* Wrap the select + icon together */}
      <div className={`select-wrapper ${error ? "error" : ""} ${inputStarted ? "entry-background" : ""}`}>
        {/* Icon on the left */}
        {icon && iconPosition === "left" && (
          <span className="select-icon left">{icon}</span>
        )}

        <select
          className={`form-control select-form-control`}
          name={name}
          value={value}
          onChange={onChange}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Icon on the right */}
        {icon && iconPosition === "right" && (
          <span className="select-icon right">{icon}</span>
        )}
      </div>
    </div>
  );
};

export default SelectInput;
