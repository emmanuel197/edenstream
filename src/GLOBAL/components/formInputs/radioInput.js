// import React from "react";
// import PropTypes from "prop-types";
// import "../../components/styles/radio.scss"; // Make sure to create and link a corresponding SCSS file

// const Radio = ({ 
//   className = "", 
//   label, 
//   name, 
//   checked = false, 
//   onChange, 
//   style, 
//   value,
//   icon
// }) => {
//   return (
//     <div className={`radio-group ${className}`}>
//       <input
//         className="radio-input"
//         type="radio"
//         name={name}
//         checked={checked}
//         onChange={onChange}
//         style={style}
//         value={value}
//         id={`${name}-${value}`} // unique ID for accessibility
//       />
//       {label && (
//         <label className="radio-label" htmlFor={`${name}-${value}`}>
//           {label}
//         </label>
//       )}
//     </div>
//   );
// };

// Radio.propTypes = {
//   /** Additional custom class name for styling */
//   className: PropTypes.string,
//   /** Text label for the radio button */
//   label: PropTypes.string,
//   /** Name attribute to group radio buttons */
//   name: PropTypes.string.isRequired,
//   /** Determines if the radio button is checked */
//   checked: PropTypes.bool,
//   /** Function to handle onChange event */
//   onChange: PropTypes.func,
//   /** Optional inline styles */
//   style: PropTypes.object,
//   /** Value for the radio button */
//   value: PropTypes.string.isRequired,
// };

// export default Radio;
// src/components/formInputs/radioInput.js
import React from "react";
import PropTypes from "prop-types";
import "../../components/styles/radio.scss";

const Radio = ({
  className = "",
  label,
  name,
  checked = false,
  onChange,
  style,
  value,
  icon,
  radioRightVariant // NEW: for flags/icons
}) => {
  return (
    <div className={`radio-group ${className}`} style={style}>
      {/* Left side: icon + label */}
      <div className="radio-left-content">
        {icon && (
          <span className="radio-icon">
            {typeof icon === "string" ? icon : icon}
          </span>
        )}
        {label && <span className="radio-label">{label}</span>}
      </div>

      {/* Right side: actual radio input */}
      <div className={`radio-right-input ${radioRightVariant}`}>
        <input
          className="radio-input"
          type="radio"
          name={name}
          checked={checked}
          onChange={onChange}
          value={value}
          id={`${name}-${value}`} // unique ID for accessibility
        />
        <label htmlFor={`${name}-${value}`} />
      </div>
    </div>
  );
};

Radio.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  style: PropTypes.object,
  value: PropTypes.string.isRequired,
  /** Optional icon or emoji for the radio item */
  icon: PropTypes.oneOfType([
    PropTypes.string, // e.g. "🇬🇧" or image URL
    PropTypes.node // e.g. <img loading="lazy" />
  ])
};

export default Radio;
