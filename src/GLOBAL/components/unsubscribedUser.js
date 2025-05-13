// src/components/UnsubscribedUser.jsx
import React from "react";
import "../components/styles/unsubscribedUser.scss";
import { nocart } from "../../utils/assets"; // Ensure you have the empty cart icon in this path
import Button from "./buttons/Button";
import { useLocation, useNavigate } from "react-router-dom";
const UnsubscribedUser = ({  variant, trailer }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  if (location.pathname.includes("/live")) {
    return (
      <div className="unsubscribed-user">
        <img loading="lazy" src={nocart} alt="Empty Cart Icon" className="empty-cart-icon" />
        <p className="unsubscribed-message">
          You have no active subscriptions. Choose your desired data bundle from
          the available data bundles list to enjoy amazing AfriPlay content
        </p>
        <div className="unsubscribed-button">
          <Button action={() => navigate("/subscriptions")} label="Subscribe" />
        </div>
      </div>
    );
  } else {
    return (
    <div className="unsubscribed-user">
      <img loading="lazy" src={nocart} alt="Empty Cart Icon" className="empty-cart-icon" />
      <p className="unsubscribed-message">
        {(trailer &&  variant !== "movie")
          ? "Trailer Was Not Found"
          : "You have no active subscriptions. Choose your desired data bundle from the available data bundles list to enjoy amazing AfriPlay content"}
      </p>
      <div className="unsubscribed-button">
        <Button action={() => (trailer &&  variant !== "movie") ? navigate(-1) : navigate("/subscriptions")} label={(trailer &&  variant !== "movie") ? "Back" : "Subscribe"} />
      </div>
    </div>)
  }
};

export default UnsubscribedUser;
