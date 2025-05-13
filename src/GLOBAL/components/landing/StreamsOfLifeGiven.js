import React, { useState } from "react";
import Button from "../buttons/Button";
import EdenStreamsContentCard from "../cards/EdenStreamsContentCard";
import '../../../GLOBAL/components/styles/streams-of-life-given.scss';
import CustomScrollbar from "../customScrollbar";
import { useCustomScrollbar } from "../../../utils/scrollbarLogic";


const StreamsOfLifeGiven = () => {
  const { containerRef, scrollThumbRef } = useCustomScrollbar("74");
    const contentItems = [
        { id: 1, title: "Live Channels", image: "/assets/live-channel.png" },
        { id: 2, title: "Gospel Music", image: "/assets/gospel-music.png" },
        { id: 3, title: "Devotional", image: "/assets/devotional.png" },
        { id: 4, title: "Christian Movies", image: "/assets/christian-movies.png" },
        { id: 5, title: "Christian Drama", image: "/assets/christian-drama.png" },
      ];
  return (
    <>
      <section className="streams-of-life-given-section">
        <div className="streams-of-life-given-section-header-wrapper">
          <div className="streams-of-life-given-section-header-container">
            {" "}
            <h2 className="streams-of-life-given-section-header">
              Streams of Life-Giving Content, Just for You.
            </h2>
            <p className="streams-of-life-given-section-paragraph">
              Whether you seek a sermon for guidance, a gospel film for
              inspiration, or a documentary to deepen your faith, EdenStream has
              it all.
            </p>
          </div>

          {/* <Button className='view-all-btn' label="View all" page="/home"/> */}
        </div>
        <div className="streams-of-life-given-content-container" ref={containerRef}>
        {contentItems.map((item) => (
            <EdenStreamsContentCard
            variant="variant1"
              key={item.id}
              title={item.title}
              imageUrl={item.image}
              onClick={() => console.log('Navigate to', item.title)}
            />
          ))}
       
        </div>
        <CustomScrollbar thumbRef={scrollThumbRef} />
      </section>
    </>
  );
};

export default StreamsOfLifeGiven;

{/* <div className="notification-search-profile">
              <Button className="notification-icon" svg={<NotificationIcon className={`notification-svg ${showNotificationDropdown && "selected"}`} />} action={showNotificationHandler} page="/" />
              {showNotificationDropdown && <div className="notification-dropdown"
              >
                <h4 className="notification-dropdown-header">
                  Notifications
                </h4>
                <div className="mark-as-read"><img loading="lazy" src={doubleCheck} className="mark-as-read-img" /><p>Mark as Read</p></div>
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
                  <img loading="lazy" className="no-notifications-img" src={noNotifications} />
                  <p className="no-notifications-text">No Notifications</p>
                </div>}
                
                
              </div>}
              <Button className="search-icon" icon={searchIcon} action={showSearchHandler} />
              {showSearchDropdown && <div className="search-dropdown"
              >

                <div className="search-filter-wrapper">
                  
                    
                    < TextInput icon={<WrapperSearch/>} className="header-search-textinput"/>
                    
                  
                <Link className="filter-wrapper" to="/search">
                  <img loading="lazy" className="search-filter-img" src={searchFilter} />
                  </Link>
                  </div>
                  {results.length > 0 ? <><div className="search-results-wrapper">
                
                {results.map((result) => (
                  <div className="search-result">
                    <h6 className="search-result-header">{result.header}</h6>
                    <div className="search-result-detail">
                    <img loading="lazy" className="search-result-img" src={result.resultImg}/>
                    <p className="search-result-title">{result.resultTitle}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="view-all-results">
                <a className="var-text">View all Search Results</a>
              </div></> : <div className="no-search-results">
                  <NoStream className="no-stream-img" />
                  <p className="no-stream-text">We are sorry ,we cannot find the streaming
                    content you are looking for</p>
                </div>}
                
                
              </div>}
              <div className="profile-wrapper" onClick={showProfileHandler}>
                  <img loading="lazy" className="profile-img" src={headerProfilePlaceholder}/>

                  <ProfileChevron/>
              </div>
              {showProfileDropdown && 
              <div className="profile-dropdown">
                <div className="profile-img-text-wrapper">
                  <img loading="lazy" className="profile-img" src={headerProfilePlaceholder}/>
                  <h4 className="profile-text">Veeda</h4>
                </div>
                <div className="profile-items-wrapper">
                 {profileItems.map(({label, icon}) => 
                 <Link to={`/profile?tab=${encodeURIComponent(label)}`} className="profile-item">
                    {icon}
                    <p className="profile-item-label">{label}</p>
                  </Link>)}
                  <div className="profile-item">
                  <LogoutIcon className="profile-logout-icon"/>
                  <p className="profile-item-label">Logout</p>
                  </div>
                  
                </div>   
              </div>}
            </div> */}