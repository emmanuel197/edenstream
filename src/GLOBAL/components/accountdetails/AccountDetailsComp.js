import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { initGetPurchases } from "../../redux/account";
import "../styles/AccountDetails.scss";
import Account from "./tabs/Account";
import Help from "./tabs/Help";
import Messages from "./tabs/Messages";
import Settings from "./tabs/Settings";

const AccountDetailsComp = () => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState("account");
  const setActiveTabName = (str) => setActiveTab(str);

  useEffect(() => {
    initGetPurchases(dispatch)
  }, [dispatch])

  return (
    <div className="account-details">
      <div className="container">
        <div className="inside-account-details">
          <div className="account-headers">
            <div
              className={
                activeTab === "account" ? "active-tab account" : "account"
              }
              onClick={() => setActiveTabName("account")}
            >
              <p> Account</p>
            </div>
            <div
              className={
                activeTab === "messages" ? "active-tab messages" : "messages"
              }
              onClick={() => setActiveTabName("messages")}
            >
              <p> Messages </p>
            </div>
            <div
              className={
                activeTab === "settings" ? "active-tab settings" : "settings"
              }
              onClick={() => setActiveTabName("settings")}
            >
              <p> Settings </p>
            </div>
            <div
              className={activeTab === "help" ? "active-tab help" : "help"}
              onClick={() => setActiveTabName("help")}
            >
              <p> Help &amp; Support </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Account active={activeTab} />
        <Messages active={activeTab} />
        <Settings active={activeTab} />
        <Help active={activeTab} />
      </div>
    </div>
  );
};

export default AccountDetailsComp;
