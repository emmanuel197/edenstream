import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../components/styles/Header.scss";
import { hamburgerIcon, logoSrc, NotificationIcon, SearchIcon, doubleCheck, noNotifications, SearchFilter, WrapperSearch, searchMic, NoStream, ProfileChevron, headerProfilePlaceholder, AccountInformationIcon, ContentPreferencesIcon, WatchHistoryIcon, NotificationsAndRemindersIcon, SubscriptionsAndBillingIcon, ProfileSettingsIcon, ProfileSupportIcon, LogoutIcon } from "../../utils/assets";
import { toggleDrawer } from "../redux/slice/drawerSlice";
import Button from "./buttons/Button";
import Drawer from "./Drawer";
import TextInput from "../components/formInputs/textInput";
import { getProfile, logout, fetchNotifications } from "../redux/account";
import { setProfile } from "../redux/slice/accountSlice";
import { errorLog } from "../logger";
import { COOKIES } from "../../utils/constants";
import { search } from "../redux/fetchMoviesApi";
import { useHandleNavigation } from "../components/navigationHelpers";
import { getImageSrc } from "./cards/MovieCard";
import Cookies from "universal-cookie";

const Header = ({ variantClassName }) => {
  const { profile } = useSelector((state) => state.account);
  const cookies = new Cookies();
  const location = useLocation();
  console.log('Header location:');
  const dispatch = useDispatch();
  const { showDrawer } = useSelector(state => state.drawer);
  const _toggleDrawer = () => dispatch(toggleDrawer(!showDrawer));
  const navLinks = [
    { path: "/home", label: "Home" },
    { path: "/movies", label: "Movies" },
    // { path: "/word", label: "Word" },
    // { path: "/music", label: "Music" },
    { path: "/livetv", label: "Live Tv" },
    { path: "/mylist", label: "My List" },
    { path: "/subscription", label: "Subscriptions" }
  ];

  const notifications = useSelector((state) => state.account.messages);
  console.log('Header notifications:', notifications);

  const navigate = useNavigate();
  const { searchResponse } = useSelector((state) => state.input);
  console.log('Header searchResponse:', searchResponse);

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
      label: "Watchlist",
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
  ];

  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(window.scrollY);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [userInfo, setUserInfo] = useState(COOKIES.get("user_info"));

  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const searchDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const showNotificationHandler = () => {
    setShowSearchDropdown(false);
    setShowProfileDropdown(false);
    setShowNotificationDropdown((prev) => !prev);
  };

  const showSearchHandler = () => {
    setShowNotificationDropdown(false);
    setShowProfileDropdown(false);
    setShowSearchDropdown((prev) => !prev);
  };

  const showProfileHandler = () => {
    setShowNotificationDropdown(false);
    setShowSearchDropdown(false);
    setShowProfileDropdown((prev) => !prev);
  };

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
    fetchNotifications(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === "/search") setShowSearch(true);
    else setShowSearch(false);
  }, [location]);

  useEffect(() => {
    const checkAuth = () => setUserInfo(COOKIES.get("user_info"));
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleSearchInput = (e) => {
    const text = e.target.value;
    console.log('Search input changed:', text);
    setSearchQuery(text);
    console.log('Dispatching search action with text:', text);
    dispatch(search(text));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showNotificationDropdown && notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target) &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotificationDropdown(false);
      }

      if (
        showSearchDropdown && searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target) &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSearchDropdown(false);
      }

      if (
        showProfileDropdown && profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
      }
    };

    if (showNotificationDropdown || showSearchDropdown || showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotificationDropdown, showSearchDropdown, showProfileDropdown]);

  return (
    <>
      <header className={`page-header ${isVisible ? "visible" : "hidden"} ${showDrawer ? "drawer-color" : ""} ${variantClassName ? variantClassName : ""}`}>
        <div className="header-left-content">
          <Logo />
          <Drawer user_info={userInfo} />
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
                ref={notificationRef}
                className="notification-icon"
                svg={<NotificationIcon className={`notification-svg ${showNotificationDropdown && "selected"}`} />}
                action={showNotificationHandler} page="/" />
              {showNotificationDropdown && <div ref={notificationDropdownRef} className="notification-dropdown">
                <h4 className="notification-dropdown-header">
                  Notifications
                </h4>
                <div className="mark-as-read"><img src={doubleCheck} className="mark-as-read-img" /><p>Mark as Read</p></div>
                {notifications && notifications.length > 0 ? <><div className="notification-content-wrapper">
                  <h5 className="notification-period-header">Today</h5>
                  {notifications.map((notification) => (
                    <div key={notification.id} className="notification-detail">
                      <span className="notification-detail-img">{notification.icon}</span>
                      <div className="notification-detail-text">
                        <h6 className="notification-detail-header">{notification.title}</h6>
                        <p className="notification-detail-body">{notification.message}</p>
                        {notification.linkText && notification.linkUrl && (
                          <Link to={notification.linkUrl} className="notification-detail-link">{notification.linkText}</Link>
                        )}
                      </div>
                      <div className="notification-status-time">
                        <p className="notification-time">{notification.time}</p>
                        {notification.notification_status === 'unread' && <span className="notification-status unread"></span>}
                      </div>
                    </div>
                  ))}
                </div>
                  <div className="view-all-notifications">
                    <a className="van-text">View All Notification</a>
                  </div></> : <div className="no-notifications-wrapper">
                  <img className="no-notifications-img" src={noNotifications} />
                  <p className="no-notifications-text">No Notifications</p>
                </div>}
              </div>}
              <Button
                ref={searchRef}
                className="search-icon"
                svg={<SearchIcon className={`search-svg ${location.pathname === "/search" && "selected"}`} />}
                action={showSearchHandler} />
              {showSearchDropdown && <div ref={searchDropdownRef} className="search-dropdown">
                <div className="search-filter-wrapper">
                  <div className="search-wrapper">
                    <TextInput value={searchQuery} onChange={handleSearchInput} icon={<WrapperSearch className="wrapper-search" />} className="header-search-textinput" />
                  </div>
                  <Link to="/search" className="filter-wrapper">
                    <SearchFilter className="search-filter-img" />
                  </Link>
                </div>
                {searchQuery ? ( // Only show results or no results message if a search query exists
                  searchResponse && searchResponse.length > 0 ? ( // Check if there are search results
                    <>
                      <div className="search-results-wrapper">
                        {searchResponse.slice(0, 2).map((result) => (
                          <div className="search-result" key={result.id}>
                            <div className="search-result-detail" onClick={() => navigate(`/watch/movie/${result.uid}`, { state: { title: result.title } })}>
                              <img className="search-result-img" src={getImageSrc(result.image_id, result)} />
                              <p className="search-result-title">{result.title || result.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="view-all-results">
                        <a className="var-text" onClick={() => navigate('/search')} style={{ cursor: 'pointer' }}>View all Search Results</a>
                      </div>
                    </>
                  ) : (
                    // Display "no results" message when query exists but no results are found
                    <div className="no-search-results">
                      <NoStream className="no-stream-img" />
                      <p className="no-stream-text">We are sorry, we cannot find the streaming
                        content you are looking for</p>
                    </div>
                  )
                ) : (
                   <div className="no-search-results">
       
                  <div className="initial-search-prompt">
                    Enter a search term to find content.
                  </div>
                  </div>
                )}
              </div>}
              <div ref={profileRef} className="profile-wrapper" onClick={showProfileHandler}>
                <img className="profile-img" src={cookies.get('edenstream_avatar') || headerProfilePlaceholder} alt="Profile Avatar" />
                <ProfileChevron />
              </div>
              {showProfileDropdown && <div ref={profileDropdownRef} className="profile-dropdown">
                <div className="profile-img-text-wrapper"><img className="profile-img" src={cookies.get('edenstream_avatar') || headerProfilePlaceholder} />
                  <h4 className="profile-text">{profile?.first_name || 'Veeda'}</h4>
                </div>
                <div className="profile-items-wrapper">
                  {profileItems.map(({ label, icon }) =>
                    <Link to={`/profile?tab=${encodeURIComponent(label)}`} className="profile-item">{icon}
                      <p className="profile-item-label">{label}</p>
                    </Link>)}
                  <Link className="profile-item" onClick={() => logout()}><LogoutIcon className="profile-logout-icon" />
                    <p className="profile-item-label">Logout</p></Link>
                </div>
              </div>}
            </div>)}
        </div>
        <div className="right-content-mobile">
          {userInfo && <Button
            className={`notification-icon `}
            svg={<NotificationIcon className={`notification-svg ${showNotificationDropdown && "selected"} ${location.search == "?tab=Notifications%20%26%20Reminders" ? "active" : ""}`} />}
            page="/profile?tab=Notifications%20%26%20Reminders"
          />}
          {userInfo && <Button className="search-icon" svg={<SearchIcon className={`search-svg ${location.pathname === "/search" && "selected"}`} />} page="/search" />}
          {!showDrawer && <Button icon={hamburgerIcon} className="hamburger-icon" action={_toggleDrawer} />}
        </div>
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
      >
        <img loading="lazy" id="logo-img" src={logoSrc} alt="edenstreams-logo" />
      </Link>
    </div>
  );
};

export default Header;
