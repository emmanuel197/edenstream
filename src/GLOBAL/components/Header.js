import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { search } from "../redux/fetchMoviesApi";
import { useHandleNavigation } from "../components/navigationHelpers";
import { getImageSrc } from "./cards/MovieCard";

const Header = ({ variantClassName }) => {
  const { profile } = useSelector((state) => state.account);
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
      body: "Join today's morning devotional with Pastor Grace Thompson.",
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

  const navigate = useNavigate();
  // Get search results from Redux
  const { searchResponse } = useSelector((state) => state.input);
  // console.log('Header searchResponse:', searchResponse);

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
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [userInfo, setUserInfo] = useState(COOKIES.get("user_info"));
  
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

  useEffect(() => {
    if (location.pathname === "/search") setShowSearch(true);
    else setShowSearch(false);
  }, [location]);

  useEffect(() => {
    const checkAuth = () => setUserInfo(COOKIES.get("user_info"));
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // Handle input change and dispatch search
  const handleSearchInput = (e) => {
    const text = e.target.value;
    console.log('Search input changed:', text);
    setSearchQuery(text);
    console.log('Dispatching search action with text:', text);
    dispatch(search(text));
  };

  return (
    <>
      <header className={`page-header ${isVisible ? "visible" : "hidden"} ${showDrawer ? "drawer-color" : ""} ${variantClassName ? variantClassName : ""}`}>

        <div className="header-left-content">
          <Logo />
          <Drawer user_info={userInfo}/>
        </div>
        <nav className={`nav-links ${!userInfo && "invisible"}`}>
          {navLinks.map(({ path, label }) => (
            <Link className={`nav-link ${location.pathname === path ? "active-link" : ""}`} key={path} to={path}>
              <p className="nav-link-text">
                {label}
              </p>
            </Link>
          ))}
        </nav>
        <div className="right-content">
        {!userInfo ? (<div className="sign-in-up-btns">
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
                    <TextInput value={searchQuery} onChange={handleSearchInput} icon={<WrapperSearch className="wrapper-search"/>} className="header-search-textinput"/>
                  </div>
                  <Link to="/search" className="filter-wrapper">
                    <img className="search-filter-img" src={searchFilter} />
                  </Link>
                </div>
                {searchResponse && searchResponse.length > 0 ? <>
                  <div className="search-results-wrapper">
                    {searchResponse.slice(0, 2).map((result) => (
                      <div className="search-result" key={result.id}>
                        <h6 className="search-result-header">{result.title || result.name}</h6>
                        <div className="search-result-detail">
                          <img className="search-result-img" src={getImageSrc(result.image_id, result)}/>
                          <p className="search-result-title">{result.title || result.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="view-all-results">
                    <a className="var-text" onClick={() => navigate('/search')} style={{cursor: 'pointer'}}>View all Search Results</a>
                  </div>
                </> : <div className="no-search-results">
                  <NoStream className="no-stream-img" />
                  <p className="no-stream-text">We are sorry ,we cannot find the streaming
                    content you are looking for</p>
                </div>}
              </div>}
              <div className="profile-wrapper" onClick={showProfileHandler}>
                  <img className="profile-img" src={profile?.profile_image || headerProfilePlaceholder}/>
                  {/* <img className="profile-chevron"/> */}
                  <ProfileChevron/>
              </div>
              {showProfileDropdown && <div className="profile-dropdown">
                <div className="profile-img-text-wrapper"><img className="profile-img" src={profile?.profile_image || headerProfilePlaceholder}/>
                  <h4 className="profile-text">{profile?.first_name || 'Veeda'}</h4>
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
