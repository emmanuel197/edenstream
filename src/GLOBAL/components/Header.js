// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation } from "react-router-dom";
// import { logoTextSrc } from "../../utils/assets";
// import { getProfile, logout } from "../redux/account";
// import { setProfile } from "../redux/slice/accountSlice";
// import { toggleDrawer } from "../redux/slice/drawerSlice";
// // import { search } from "../redux/fetchMoviesApi";
// import Button from "./buttons/Button";
// import Drawer from "./Drawer";
// import "./styles/Header.scss";
// import { errorLog } from "../logger";
// import { COOKIES } from "../../utils/constants";
// import { useHandleNavigation } from "../components/navigationHelpers";
// const user_info = COOKIES.get("user_info");

// export const navigateHandler = (link) => {
//   window.location.href  = link
// }
// const Header = (prop) => {
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const [showAccountDropdown, setShowAccountDropdown] = useState(false);
//   const [showAccessDropdown, setShowAccessDropdown] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showSearch, setShowSearch] = useState(false);
//   const { profile } = useSelector((state) => state.account);

//   const { showDrawer } = useSelector(state => state.drawer);
//   const _toggleDrawer = ( ) => dispatch(toggleDrawer(!showDrawer));
//   const handleClick = useHandleNavigation(); // Reuse the navigation logic
//   useEffect(() => {
//     if (location.pathname === "/search") setShowSearch(true);
//   }, [location]);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         if (!profile?.first_name) {
//           const profileInfo = await getProfile();
//           localStorage.setItem("afri_profile", JSON.stringify(profileInfo));
//           dispatch(setProfile(profileInfo));
//         }
//       } catch (e) {
//         errorLog("", e);
//       }
//     };

//     fetchProfile();
//   }, [dispatch, profile]);

//   return (
//     <>
//       <header className="header">
//         <div>
//           <div className="header-wrapper">
//             <div className="header-left-content">
//               <Logo />
//               {prop.links > 2 && (
//                 <nav className="links">
//                   {/* <Link to="/home">
//                     <p
//                       className={
//                         location.pathname === "/home" ? "active-link" : ""
//                       }
//                     >
//                       featured
//                     </p>
//                   </Link> */}
//                   <Link
//                   // to="/movies"
//                    onClick={() => navigateHandler("/movies")}
//                    className="nav-link">
//                     <p
//                       className={
//                         location.pathname === "/movies" ? "active-link" : ""
//                       }
//                     >
//                       movies
//                     </p>
//                   </Link>
//                   {/* <Link to="/series">
//                     <p
//                       className={
//                         location.pathname === "/series" ? "active-link" : ""
//                       }
//                     >
//                       series
//                     </p>
//                   </Link> */}
//                   <Link className="nav-link" to="/livetv">
//                     <p
//                       className={
//                         location.pathname === "/livetv" ? "active-link" : ""
//                       }
//                     >
//                       live TV
//                     </p>
//                   </Link>
//                   <Link className="nav-link" to="/afripremiere">
//                     <p
//                       className={
//                         location.pathname === "/afripremiere"
//                           ? "active-link"
//                           : ""
//                       }
//                     >
//                       afripremiere
//                     </p>
//                   </Link>
//                   <Link className="nav-link" to="/afriplaylive">
//                     <p
//                       className={
//                         location.pathname === "/afriplaylive"
//                           ? "active-link"
//                           : ""
//                       }
//                     >
//                       live drama
//                     </p>
//                   </Link>
//                   <div className="dropdown">
//                     <button
//                       onClick={() => setShowAccessDropdown(!showAccessDropdown)}
//                       className="dropdown-toggler"
//                     >
//                       access packs
//                       {/* <img
//                         style={{ width: "20px", height: "20%", filter: "invert(60%)" }}
//                         src="/assets/svg/caret-down.svg"
//                         alt="chevron icon"
//                       /> */}
//                     </button>
//                     {showAccessDropdown && (
//                       <ul
//                         className="dropdown-menu"
//                         style={{ marginLeft: "2.2rem" }}
//                       >
//                         <li style={{ margin: "0", padding: "0" }}>
//                           <Link style={{ padding: "0" }} to="/subscriptions">
//                             <p
//                               className={
//                                 location.pathname === "/subscriptions"
//                                   ? "active-link"
//                                   : ""
//                               }
//                             >
//                               PACKS
//                             </p>
//                           </Link>
//                         </li>
//                         <li style={{ marginTop: "1rem" }}>
//                           <Link
//                             style={{ padding: "0" }}
//                             to="/subscription-history"
//                           >
//                             <p
//                               className={
//                                 location.pathname === "/subscription-history"
//                                   ? "active-link"
//                                   : ""
//                               }
//                             >
//                               HISTORY
//                             </p>
//                           </Link>
//                         </li>
//                       </ul>
//                     )}
//                   </div>
//                 </nav>
//               )}
//             </div>

//             <div className="right-content">
//               <div className="search-wrapper">
//                 {user_info ? (
//                   <div>
//                   {/* <div onClick={() => search(dispatch, searchQuery)}> */}
//                     <Link to="/search">
//                       {showSearch ? (
//                         <input
//                           value={searchQuery}
//                           onChange={(e) => {
//                             let text = e.target.value;
//                             setSearchQuery(text);
//                             // search(dispatch, text);
//                           }}
//                           autoFocus
//                           type="text"
//                           placeholder="Search"
//                         />
//                       ) : null}
//                       <img
//                         src="/assets/svg/search.svg"
//                         className="search-icon"
//                         style={showSearch ? { display: "none" } : null}
//                         alt="search"
//                       />
//                     </Link>
//                   </div>
//                 ) : null}
//               </div>
//               {/* className={`sign-in-up ${!user_info && "not-user-info"}`}  */}
//               <div className={`sign-in-up ${user_info && "not-user-info"}`}>
//                 {!user_info ? (
//                   <>
//                     <Link to="/signup" className="sign-up">
//                       <div>
//                         <p className="sign-up-text">SIGN UP</p>
//                       </div>
//                     </Link>
//                     <Link to="/signin" className="sign-in">
//                       <div>
//                         <p className="sign-in-text">SIGN IN</p>
//                       </div>
//                     </Link>
//                     <div
//                       className="access-packs"
//                       onClick={() => handleClick("/subscriptions")}
//                     >
//                       <div>
//                         <p>ACCESS PACKS</p>
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <div
//                     className="profile-wrapper"
//                     onClick={() => setShowAccountDropdown(!showAccountDropdown)}
//                   >
//                     <img
//                       src="/assets/profile.png"
//                       className="profile-icon"
//                       alt="profile icon"
//                     />
//                     <p>{profile?.first_name}</p>
//                     <img loading="lazy" src="/assets/svg/caret-down.svg" alt="chevron icon" />
//                   </div>
//                 )}
//               </div>
//               {!showSearch ? (
//                 <div
//                   className={`menu-btn ${user_info && "not-user-info"}`}
//                   onClick={() => _toggleDrawer()}
//                 >
//                   <svg
//                     clipRule="evenodd"
//                     fillRule="evenodd"
//                     fill="#fff"
//                     width={33}
//                     height={33}
//                     strokeLinejoin="round"
//                     strokeMiterlimit="2"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="m22 16.75c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z"
//                       fillRule="nonzero"
//                     />
//                   </svg>
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         </div>
//         {showAccountDropdown ? (
//           <div className="account-dropdown">
//             <Button label="Log Out" action={() => logout()} />
//             <Link to="/profile">
//               <p style={{ color: "#fff", marginTop: "10px" }}>Profile</p>
//             </Link>
//           </div>
//         ) : null}
//       </header>
//       <Drawer />
//     </>
//   );
// };

// const Logo = () => {
//   const [homeLink, setHomeLink] = useState("/");

//   useEffect(() => {
//     const path = window.location.pathname;
//     if (path === "/select-network" || path === "/signup" || path === "/") {
//       setHomeLink("/");
//     } else {
//       setHomeLink("/home");
//     }
//   }, []);

//   return (
//     <div id="logo">
//       <Link
//       // to={homeLink}
//        onClick={() => navigateHandler("/home")}>
//         <img loading="lazy" src={logoTextSrc} alt="afriplay-logo" />
//       </Link>
//     </div>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../components/styles/Header.scss";
import { hamburgerIcon, logoSrc, NotificationIcon, searchIcon, doubleCheck, noNotifications, searchFilter, WrapperSearch, searchMic, NoStream, ProfileChevron, headerProfilePlaceholder, AccountInformationIcon, ContentPreferencesIcon, WatchHistoryIcon, NotificationsAndRemindersIcon, SubscriptionsAndBillingIcon, ProfileSettingsIcon, ProfileSupportIcon, LogoutIcon } from "../../utils/assets";
import { toggleDrawer } from "../redux/slice/drawerSlice";
import Button from "./buttons/Button";
import Drawer from "./Drawer";
import TextInput from "../components/formInputs/textInput";
import { getProfile, logout } from "../redux/account";
import { setProfile } from "../redux/slice/accountSlice";
import { errorLog } from "../logger";
import { COOKIES } from "../../utils/constants";
const Header = ({ variantClassName }) => {
  const { profile } = useSelector((state) => state.account);
  const user_info = COOKIES.get("user_info");
  const location = useLocation();
  const dispatch = useDispatch();
  const { showDrawer } = useSelector(state => state.drawer);
  const _toggleDrawer = () => dispatch(toggleDrawer(!showDrawer));
  const navLinks = [
    { path: "/home", label: "Home" },
    { path: "/movies", label: "Movies" },
    { path: "/word", label: "Word" },
    { path: "/music", label: "Music" },
    { path: "/livetv", label: "Live Tv" },
    { path: "liveradio", label: "Live Radio" },
    { path: "/subscription", label: "Subscriptions" }
    // { path: "/series", label: "Series" },
    // { path: "/sermons", label: "Sermons" },
    // { path: "/devotionals", label: "Devotionals" },
    // { path: "/lifestyle", label: "Lifestyle" },
    // { path: "/kids", label: "Kids" },

  ];
  const notifications = [
    {
      id: 1,
      icon: "🔔",
      title: "Your Live Devotional Starts Now!",
      body: "Join today’s morning devotional with Pastor Grace Thompson.",
      linkText: "Tap to join the stream.",
      linkUrl: "#",
      time: "12:19AM",
      isUnread: true,
    },
    {
      id: 2,
      icon: "🎵",
      title: "Latest Gospel Music Drop!",
      body: "Listen to the newest release by Maverick City Music now on Eden Stream.",
      linkText: "Tap to join the stream.",
      linkUrl: "#",
      time: "02:19PM",
      isUnread: true,
    },
  ];

  const results = [
    { id: 1, header: "Word", resultImg: '/assets/word-of-god.png', resultTitle: 'Angels Friends' },
    { id: 2, header: "Word", resultImg: '/assets/word-of-god.png', resultTitle: 'Angels Friends' }
  ]


  const profileItems = [
    {
      key: "Account Information",
      label: "Account Information",
      icon: <AccountInformationIcon className="profile-item-icon" />,
    },
    {
      key: "Content Preferences",
      label: "Content Preferences",
      icon: <ContentPreferencesIcon className="profile-item-icon" />,
    },
    {
      key: "Watch History",
      label: "Watch History",
      icon: <WatchHistoryIcon className="profile-item-icon" />,
    },
    {
      key: "Notifications & Reminders",
      label: "Notifications & Reminders",
      icon: <NotificationsAndRemindersIcon className="profile-item-icon" />,
    },
    {
      key: "Subscription & Billing",
      label: "Subscription & Billing",
      icon: <SubscriptionsAndBillingIcon className="profile-item-icon" />,
    },
    {
      key: "Settings",
      label: "Settings",
      icon: <ProfileSettingsIcon className="profile-setting-item-icon profile-item-icon" />,
    },
    {
      key: "Support",
      label: "Support",
      icon: <ProfileSupportIcon className="profile-item-icon" />,
    },
   
  ]

  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(window.scrollY);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false)
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  const showNotificationHandler = () => {
    setShowNotificationDropdown((prev) => !prev
    )
  }
  const showSearchHandler = () => {
    setShowSearchDropdown((prev) => !prev
    )
  }
  const showProfileHandler = () => {
    setShowProfileDropdown((prev) => !prev
    )
  }
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(prevScrollY > currentScrollY || currentScrollY < 10);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!profile?.first_name) {
          const profileInfo = await getProfile();
          localStorage.setItem("afri_profile", JSON.stringify(profileInfo));
          dispatch(setProfile(profileInfo));
        }
      } catch (e) {
        errorLog("", e);
      }
    };

    fetchProfile();
  }, [dispatch, profile]);

  return (
    <>
      <header className={`page-header ${isVisible ? "visible" : "hidden"} ${showDrawer ? "drawer-color" : ""} ${variantClassName ? variantClassName : ""}`}>

        <div className="header-left-content">
          <Logo />
          <Drawer user_info={user_info}/>
        </div>
        <nav className={`nav-links ${!user_info && "invisible"}`}>
          {navLinks.map(({ path, label }) => (
            <Link className={`nav-link ${location.pathname === path ? "active-link" : ""}`} key={path} to={path}>
              <p className="nav-link-text">
                {label}
              </p>
            </Link>
          ))}
        </nav>
        <div className="right-content">
        {!user_info ? (<div className="sign-in-up-btns">
            <Link to="/login" className="log-in">
              <div>
                <p className="log-in-text">Log in</p>
              </div>
            </Link>
            <Link to="/signup" className="sign-up">
              <div>
                <p className="sign-up-text">Sign up</p>
              </div>
            </Link>
          </div>) : (
          <div className="notification-search-profile">
             <Button 
              className="notification-icon" 
              svg={<NotificationIcon className={`notification-svg ${showNotificationDropdown && "selected"}`} />} 
              action={showNotificationHandler} page="/" />
               {showNotificationDropdown && <div className="notification-dropdown"
              >
                <h4 className="notification-dropdown-header">
                  Notifications
                </h4>
                <div className="mark-as-read"><img src={doubleCheck} className="mark-as-read-img" /><p>Mark as Read</p></div>
                {notifications.length > 0 ? <><div className="notification-content-wrapper">
                  <h5 className="notification-period-header">Today</h5>
                  {notifications.map((notification) => (
                    <div key={notification.id} className="notification-detail">
                      <span className="notification-detail-img">{notification.icon}</span>
                      <div className="notification-detail-text">
                        <h6 className="notification-detail-header">{notification.title}</h6>
                        <p className="notification-detail-body">{notification.body}</p>
                        <Link to={notification.linkUrl} className="notification-detail-link">{notification.linkText}</Link>
                      </div>
                      <div className="notification-status-time">
                        <p className="notification-time">{notification.time}</p>
                        {notification.isUnread && <span className="notification-status unread"></span>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="view-all-notifications">
                  <a className="van-text">View All Notification</a>
                </div></> :<div className="no-notifications-wrapper">
                  <img className="no-notifications-img" src={noNotifications} />
                  <p className="no-notifications-text">No Notifications</p>
                </div>}
                
                
              </div>}
              <Button className="search-icon" icon={searchIcon} action={showSearchHandler} />
              {showSearchDropdown && <div className="search-dropdown"
              >

                <div className="search-filter-wrapper">
                  <div className="search-wrapper">
                    
                    <TextInput icon={<WrapperSearch className="wrapper-search"/>} className="header-search-textinput"/>
                    {/* <img src={searchMic} className="search-mic"/> */}
                  </div>
                <Link to="/search" className="filter-wrapper">
                  <img className="search-filter-img" src={searchFilter} />
                  </Link>
                  </div>
                  {results.length > 0 ? <><div className="search-results-wrapper">
                
                {results.map((result) => (
                  <div className="search-result">
                    <h6 className="search-result-header">{result.header}</h6>
                    <div className="search-result-detail">
                    <img className="search-result-img" src={result.resultImg}/>
                    <p className="search-result-title">{result.resultTitle}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="view-all-results">
                <a className="var-text">View all Search Results</a>
              </div></> : <div className="no-search-results">
                  {/* <img src={noStream} /> */}<NoStream className="no-stream-img" />
                  <p className="no-stream-text">We are sorry ,we cannot find the streaming
                    content you are looking for</p>
                </div>}
                
                
              </div>}
              <div className="profile-wrapper" onClick={showProfileHandler}>
                  <img className="profile-img" src={headerProfilePlaceholder}/>
                  {/* <img className="profile-chevron"/> */}
                  <ProfileChevron/>
              </div>
              {showProfileDropdown && <div className="profile-dropdown">
                <div className="profile-img-text-wrapper"><img className="profile-img" src={headerProfilePlaceholder}/>
                  <h4 className="profile-text">Veeda</h4>
                  </div>
                  <div className="profile-items-wrapper">
                    {profileItems.map(({label, icon}) => 
                 <Link to={`/profile?tab=${encodeURIComponent(label)}`} className="profile-item">{icon}
                 <p className="profile-item-label">{label}</p>
               </Link>)}
               <Link className="profile-item" onClick={() => logout()}><LogoutIcon className="profile-logout-icon"/>
                  <p className="profile-item-label">Logout</p></Link>
                  </div>
                 
                  </div>}
             </div>)}
        </div>
        {!showDrawer && <Button icon={hamburgerIcon} className="hamburger-icon" action={_toggleDrawer} />}

      </header>

    </>
  );
};
const Logo = () => {
  return (
    <div id="logo-wrapper">
      <Link
        id="logo-link"
        to="/"
      // onClick={() => navigateHandler("/home")}
      >
        <img loading="lazy" id="logo-img" src={logoSrc} alt="edenstreams-logo" />
        {/* <h1 id="logo-text">Eden Streams</h1> */}
      </Link>
    </div>
  );
};
export default Header;
