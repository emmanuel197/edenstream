// // src/components/ConnectionError.jsx
// import React from "react";
// import "../components/styles/connectionError.scss";
// // import errorIcon from '../assets/svg/error-icon.svg'; // Ensure you have the error icon in this path
// import { brokenCable } from "../../utils/assets";
// import Button from "./buttons/Button";
// import { redirect, useLocation, useNavigate } from "react-router-dom";
// const ConnectionError = ({ onReload }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const
//   const redirect = () => {
//     redirect(location.pathname);
//   };
//   return (
//     <div className="connection-error">
//       <img
//         src={brokenCable}
//         alt="Connection Error Icon"
//         className="error-icon"
//       />
//       <p className="error-text">Connection Error</p>
//       <div className="error-button-wrapper"><Button action={() => redirect()} label="Tap to Reload" /></div>
//     </div>
//   );
// };

// export default ConnectionError;
import React from "react";
import "../components/styles/connectionError.scss";
import { brokenCable } from "../../utils/assets";
import Button from "./buttons/Button";
import { useLocation, useNavigate } from "react-router-dom";

const ConnectionError = ({ onReload }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleReload = () => {
    // Programmatically navigate to the current path
    window.location.reload(location.pathname)
  };

  return (
    <div className="connection-error">
      <img
        src={brokenCable}
        alt="Connection Error Icon"
        className="error-icon"
      />
      <p className="error-text">Connection Error</p>
      <div className="error-button-wrapper">
        <Button action={handleReload} label="Tap to Reload" />
      </div>
    </div>
  );
};

export default ConnectionError;
