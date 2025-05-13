import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../GLOBAL/components/styles/Devices.scss"
import { devicesImage } from "../../../utils/assets";
// import "../styles/Family.scss";
// import { androidStore, appleStore } from "../../../utils/assets";

const Devices = () => {
  const navigate = useNavigate();
  const handleWatchNowClick = () => {
    navigate("/signup");
  };
  return (
    <section className="stream-on-multiple-devices-section">
      <h2 className="stream-on-multiple-devices-header">
        Stream on multiple devices.
      </h2>
      <p className="stream-on-multiple-devices-paragraph">
        Your daily dose of peace, hope, and worship is just a click away on your
        preferred device, anytime!
      </p>
      <div className="stream-on-multiple-devices-img-wrapper">
      <img
      src={devicesImage}
        className="stream-on-multiple-devices-img"
        alt="stream-on-multiple-devices-img"
        title="stream-on-multiple-devices-img"
      />
      </div>
      
    </section>
  );
};

export default Devices;
