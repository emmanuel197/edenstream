// import { useEffect, useState } from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// // import Watchlist from "../components/profileTabs/Watchlist";
// import { fetchUserDevices, getProfile, updateProfile } from "../redux/account";
// import "../components/styles/profile.scss";
// import Devices from "../components/profileTabs/Devices";
// import FAQs from "../components/profileTabs/Faqs";
// const Profile = () => {
//   // const [activeTab, setActiveTab] = useState("watchlist");
//   // const setActiveTabName = (str) => setActiveTab(str);
//   // Add logging to check if the activeTab updates correctly
//   // console.log("Active Tab:", activeTab);

//   return (
//     <>
//       <div className="body">
//         <Header links={5} />
//         <main className="account-main">
//           <div className="left-nav">eerwqwa  87
//             <h3>My Account</h3\                                     x>
//             <br />
//             <br />

//           </div>

//           <div className="tab-content">
//             {/* <Watchlist active={activeTab} /> */}
//             {/* <Settings active={activeTab} /> */}
//             {/* <Devices active={activeTab} /> */}
//             {/* <Payment active={activeTab} /> */}
//             {/* <ProfileCard active={activeTab} /> */}
//             {/* <Support active={activeTab} /> */}
//             {/* <FAQs active={activeTab} /> */}
//           </div>
//         </main>
//         <Footer />
//       </div>
//     </>
//   );
// };

// const Settings = ({ active }) => {
//   if (active === "settings") return <>Settings</>;
//   return <></>;
// };

// // const Devices = ({ active }) => {
// //     if (active === 'devices') return (
// //         <>Devices</>
// //     )
// //     return <></>
// // }

// const Payment = ({ active }) => {
//   useEffect(() => {
//     const initFetchUserDevices = async () => {
//       const response = await fetchUserDevices();
//       // console.warn('devices', response)
//     };
//     initFetchUserDevices();
//   }, []);

//   if (active === "payment") return <>Payment</>;
//   return <></>;
// };

// const ProfileCard = ({ active }) => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [profileInfo, setProfileInfo] = useState({
//     first_name: "",
//     last_name: ""
//   });

//   useEffect(() => {
//     const initGetProfileInfo = async () => {
//       let _profileInfo = await getProfile();
//       setProfileInfo(await getProfile());
//       setFirstName(_profileInfo.first_name);
//       setLastName(_profileInfo.last_name);
//     };
//     initGetProfileInfo();
//   }, []);

//   if (active === "profiles")
//     return (
//       <div className="profile">
//         <div className="profile-image" />
//         <div className="flex">
//           <b>My profile</b>
//           {/* <small>
//             Last Login 01, Oct 2022. 04:00AM
//             <br />
//             Mac OS, Lagos, NG
//           </small> */}
//         </div>
//         <br />
//         <div className="flex">
//           <input
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             placeholder="First name"
//           />
//           <input
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             placeholder="Last name"
//           />
//         </div>
//         <br />
//         <button
//           onClick={() => updateProfile(firstName, lastName)}
//           className="save-btn"
//         >
//           Save
//         </button>
//       </div>
//     );
//   return <></>;
// };

// const Support = ({ active }) => {
//   if (active === "support")
//     return (
//       <>
//         <h2 className="support-header">Support</h2>
//         {/* <a href="mailto:support@afriplay.tv">support@afriplay.tv</a> */}
//         <div className="support-body">
//         <div className="support-row">
//           <div className="support-row-text">
//             <h3>Call Us (Toll Free)</h3>
//             <p>100</p>
//           </div>
//         </div>
//         <div className="support-row">
//           <div className="support-row-text">
//             <h3>From any other phone</h3>
//             <p>0244 300 000</p>
//           </div>
//         </div>
//         <div className="support-row">
//           <div className="support-row-text">
//             <h3>Whatsapp</h3>
//             <p>0554 300 000</p>
//           </div>
//         </div>
//         <div className="support-row">
//           <div className="support-row-text">
//             <h3>Ayoba</h3>
//             <p>0554 300 000</p>
//           </div>
//         </div>
//         <div className="support-row">
//           <div className="support-row-text">
//             <h3>Email Us</h3>
//             <p>
//               mymtn.gh@mtn.com
//             </p>
//             {/* <p>
//               <a href="mailto:mymtn.gh@mtn.com">mymtn.gh@mtn.com</a>
//             </p> */}
//           </div>
//         </div>
//         <div className="support-row">
//           <div className="support-row-text">
//             <h3>Facebook</h3>
//             <p>@MTNGhana</p>
//           </div>
//         </div>
//         <div className="support-row">
//           <div className="support-row-text">
//             <h3>Twitter</h3>
//             <p>@MTNghana</p>
//           </div>
//         </div>
//         </div>

//       </>
//     );
//   return <></>;
// };

// // const FAQs = ({ active }) => {
// //     if (active === 'faqs') return (
// //         <>FAQs</>
// //     )
// //     return <></>
// // }

// export default Profile;
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

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Account Information");
  const location = useLocation();
  const navigate = useNavigate();
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
      label: "Watch History",
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
      <Header />
      <div className="inner-sections-wrapper tab-wrapper-variant">
        <section className="profile-section-tab-wrapper">

          <img loading="lazy" className="profile-section-bg-img" src={profileSectionBgImgPlaceholder} />
          <img loading="lazy" className="psbi-overlay" src={profileSectionBgImgPlaceholderOverlay} />
          <h3 className="profile-section-header">Hi,Veeda</h3>
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