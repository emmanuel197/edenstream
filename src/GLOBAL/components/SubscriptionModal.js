import React, { useState } from "react";
import "../components/styles/SubscriptionModal.scss";
import { subscriptionModalReducer, activeSubscriptionReducer } from "../redux/slice/subscriptionSlice";
import { useDispatch, useSelector } from "react-redux";
import { purchasePackage, cancelSubscription, fetchPurchaseHistory } from "../redux/subscriptionApis";

function SubscriptionModal() {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const closeModal = async () => {
    dispatch(subscriptionModalReducer({ isOpen: false }));
  };

  const { productId, productPrice, productName, currency, paymentInitiated, activeSubscription } = useSelector(
    (state) => state.fetchPackages
  );

  const subscriber_uid = window.localStorage.getItem("afri_username");
  const title = paymentInitiated
    ? `Your subscription has been initiated.....`
    : `Are You Sure You Want to ${
        activeSubscription ? "Cancel Your Subscription" : "Continue"
      }?`;

  const _initPurchasePackage = () => {
    if (activeSubscription) {
      cancelSubscription(productId);
      window.localStorage.removeItem('premiumSub'); // Clear from localStorage
    } else {
      purchasePackage(productId, subscriber_uid);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsConfirmed(false);
  };

  const confirmSelection = () => {
    setIsConfirmed(true);
    if (activeSubscription) {
      cancelSubscription(productId[selectedOption])
      window.localStorage.removeItem('premiumSub'); // Clear from localStorage
    } else {
      purchasePackage(productId[selectedOption], subscriber_uid);
    }
    // activeSubscription
    //   ? cancelSubscription(productId[selectedOption])
    //   : purchasePackage(productId[selectedOption], subscriber_uid);
  };

  const _homeRedirect = () => {
    window.location.href = "/home";
  };

  return (
    (productId["auto-renewal"] || productId["on-demand"]) ? (
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            {!paymentInitiated && <button onClick={closeModal}>&#10006;</button>}
          </div>
          {selectedOption && !isConfirmed ? (
            <div className="confirmation">
              <div className="title">
              <h1 >Are you sure you want to continue with the {selectedOption} option?</h1></div>
              <div className="footer">
              <button onClick={confirmSelection}>Yes</button>
              <button className="cancelBtn" onClick={() => setSelectedOption(null)}>No</button>
              </div>
            </div>
          ) : (
            <>
              <div className="title">
                <h1>You have selected the {productName} Pack for {currency} {productPrice}</h1>
              </div>
              <div className="footer">
                {productId["auto-renewal"] && (
                  <button onClick={() => handleOptionSelect("auto-renewal")}>
                    Auto-Renewal
                  </button>
                )}
                {productId["on-demand"] && (
                  <button onClick={() => handleOptionSelect("on-demand")}>
                    On-Demand
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    ) : (
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            {!paymentInitiated && <button onClick={closeModal}>&#10006;</button>}
          </div>
          <div className="title">
            <h1>{title}</h1>
          </div>
          <div className="footer">
            {!paymentInitiated && (
              <button
                onClick={() => {
                  closeModal();
                }}
                className="cancelBtn"
              >
                Cancel
              </button>
            )}
            <button
              onClick={paymentInitiated ? _homeRedirect : _initPurchasePackage}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default SubscriptionModal;
