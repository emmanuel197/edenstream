import React from "react";
import PropTypes from "prop-types";
import "../components/styles/custom-scrollbar.scss";
const CustomScrollbar = ({ thumbRef }) => {
  return (
    <div className="rw-scrollbar">
      <div className="rw-scrollbar-track">
        <div className="rw-scrollbar-thumb" ref={thumbRef} style={{ width: "0px" }} />
      </div>
    </div>
  );
};

CustomScrollbar.propTypes = {
  thumbRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]).isRequired,
};

export default CustomScrollbar;
