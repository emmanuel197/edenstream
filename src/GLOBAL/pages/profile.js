import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../components/styles/profile.scss";
import { AccountInformationIcon, WatchHistoryIcon, ProfileSettingsIcon, ProfileSupportIcon, SubscriptionsAndBillingIcon, ContentPreferencesIcon, NotificationsAndRemindersIcon, profileSectionBgImgPlaceholder, profileSectionBgImgPlaceholderOverlay } from "../../utils/assets";
import AccountInformation from "../components/profileTabs/accountInformation";
import ContentPreferences from "../components/profileTabs/contentPreferences";
import ProfileSetting from "../components/profileTabs/profileSettings";
import ProfileSupport from "../components/profileTabs/profileSupport";
import WatchHistory from "../components/profileTabs/WatchHistory"
import SubscriptionBilling from "../components/profileTabs/subscriptionBilling";
import NotificationReminders from "../components/profileTabs/notificationsReminders";
import { useLocation, useNavigate } from "react-router-dom";
import CustomScrollbar from "../components/customScrollbar";
import { useCustomScrollbar } from "../../utils/scrollbarLogic";
import { useSelector } from "react-redux";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Account Information");
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.account);
  const tabs = [
    {
      key: "Account Information",
      label: "Account Information",
      icon: <AccountInformationIcon className="tab-icon" />,
    },
    {
      key: "Content Preferences",
      label: "Content Preferences",
      icon: <ContentPreferencesIcon className="tab-icon" />,
    },
    {
      key: "Watch History",
      label: "Watchlist",
      icon: <WatchHistoryIcon className="tab-icon" />,
    },
    {
      key: "Notifications & Reminders",
      label: "Notifications & Reminders",
      icon: <NotificationsAndRemindersIcon className="tab-icon" />,
    },
    {
      key: "Subscription & Billing",
      label: " Subscription & Billing",
      icon: <SubscriptionsAndBillingIcon className="tab-icon" />,
    },
    {
      key: "Settings",
      label: "Settings",
      icon: <ProfileSettingsIcon className="tab-setting-icon tab-icon" />,
    },
    {
      key: "Support",
      label: "Support",
      icon: <ProfileSupportIcon className="tab-icon" />,
    },

  ]

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");
    if (tabParam && tabs.find(tab => tab.key === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search]);
  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    navigate(`/profile?tab=${encodeURIComponent(tabKey)}`); // Updates URL
  };
  const { containerRef, scrollThumbRef } = useCustomScrollbar("74");
  
  return (
    <>
    <wc-toast></wc-toast>
      <Header />
      <div className="inner-sections-wrapper tab-wrapper-variant">
        <section className="profile-section-tab-wrapper">

          <img loading="lazy" className="profile-section-bg-img" src={profileSectionBgImgPlaceholder} />
          <img loading="lazy" className="psbi-overlay" src={profileSectionBgImgPlaceholderOverlay} />
          <h3 className="profile-section-header">Hi{profile?.first_name ? `, ${profile.first_name}` : ''}</h3>
          <div className="tabs-wrapper" ref={containerRef}>
            {tabs.map((tab) => (
              <div
                key={tab.key}
                className={activeTab === tab.key ? "active-tab tab" : "tab"}
                onClick={() => handleTabClick(tab.key)}
              >
                {tab.icon}
                {/* <img loading="lazy" className="tab-icon" src={tab.icon} alt={`${tab.key}_image`} /> */}
                <p>{tab.label}</p>

              </div>
            ))}
          </div>
          <CustomScrollbar thumbRef={scrollThumbRef} />
        </section>
      </div>
      <div className="tab-content"  >
      <div className="inner-sections-wrapper">
        <AccountInformation active={activeTab} />
        <ContentPreferences active={activeTab} />
        <WatchHistory active={activeTab} />
        <NotificationReminders active={activeTab} />
        <SubscriptionBilling active={activeTab} />
        <ProfileSetting active={activeTab} />
        <ProfileSupport active={activeTab} />
        
        </div>
        
      </div>



      <Footer />
    </>
  )
}
export default Profile;