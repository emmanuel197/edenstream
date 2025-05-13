import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleToggleMenuReducer,
  activeSubscriptionReducer,
  subscriptionModalReducer
} from "../redux/slice/subscriptionSlice";
import {
  menu,
  arrowImg,
  subscriptionHistory,
  active,
  packs,
  cancelSubscription
} from "../../utils/assets";

const SubscriptionHistorySidebar = ({purchaseHistoryData}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isChecked, purchaseHistory, activeSubscription } = useSelector((state) => state.fetchPackages);
  const [activeMenu, setActiveMenu] = useState(activeSubscription ? "Active Subscriptions" : "Subscription History"); // Initial active menu
  const handleMenuClick = (menuTitle) => {
    setActiveMenu(menuTitle);
  };

  const activeSubscriptionId = purchaseHistoryData
    .filter(purchaseH => purchaseH.product_name !== 'Free' && purchaseH.status === "Active")
    .map(purchaseH => purchaseH.product_id)
    
  
  const _initCancelPackage = () => {
        dispatch(subscriptionModalReducer({ isOpen: true, productId: activeSubscriptionId[0]}))
  }
  return (
    <div id="nav-bar">
      <input id="nav-toggle" type="checkbox" checked={isChecked} />
      <div
        id="nav-header"
        onClick={() => dispatch(handleToggleMenuReducer(!isChecked))}
      >
        <h2 id="nav-title" title="History">
          History
        </h2>
        <label for="nav-toggle">
          <img
            id="nav-toggle-burger"
            src={isChecked ? menu : arrowImg}
            style={{ transform: "rotate(180deg)" }}
            alt="afri play logo"
            onClick={() => dispatch(handleToggleMenuReducer(!isChecked))}
          />
        </label>
      </div>
      <div id="nav-content">
        <div
          className={`nav-button ${
            activeMenu === "Subscription History" ? "active" : ""
          }`}
          onClick={() => {
            handleMenuClick("Subscription History");
            dispatch(activeSubscriptionReducer(false));
          }}
        >
          <img
            className="fas"
            alt="subscrition history icon image"
            title="Subscription history icon"
            src={subscriptionHistory}
          />
          <span title="Subscription history">Subscription History</span>
        </div>
        <div
          className={`nav-button ${
            activeMenu === "Active Subscriptions" ? "active" : ""
          }`}
          onClick={() => {
            handleMenuClick("Active Subscriptions");
            dispatch(activeSubscriptionReducer(true));
            
          }}
        >
          <img
            className="fas"
            alt="active subscription icon image"
            title="Subscription history icon"
            src={active}
          />
          <span title="Subscription history">Active Subscriptions</span>
        </div>
        <div
          className={`nav-button ${activeMenu === "Packs" ? "active" : ""}`}
          onClick={() => {
            handleMenuClick("Packs");
            window.location.href = "/subscriptions";
          }}
        >
          <img
            className="fas"
            src={packs}
            alt="subscription pack icon image"
            title="Subscription packs icon"
          />
          <span title="Subscription packs">Packs</span>
        </div>
      </div>

      <div id="border-top-wrapper">
        <hr />
        <div className={`nav-button ${
            activeMenu === "Cancel subscription" ? "active" : ""
          }`} onClick={() => {
            handleMenuClick("Cancel subscription");
            dispatch(activeSubscriptionReducer(true));
          }}>
          <img
            className="fas"
            src={cancelSubscription}
            alt="cancel subscription icon image"
            title="Cancel subscription"
          />
          <span title="Cancel subscription">Cancel Subscription</span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionHistorySidebar;
