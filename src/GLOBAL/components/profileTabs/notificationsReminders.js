import React, { useState } from "react";
import { Link } from "react-router-dom";
import { noNotifications, DeleteNotificationIcon, NotificationsAndRemindersIcon, ProfileSettingsIcon, watchBackArrow, MarkAllAsReadIcon, pauseDurationModalImg, paymentSuccessModalImg } from "../../../utils/assets"
import Button from "../buttons/Button";
import "../../components/styles/profileTabs/notifications-reminders.scss"
import ToggleSwitch from "../formInputs/toggleSwitch";
import GenericModal from "../genericModal";

const NotificationReminders = ({ active }) => {
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [showSettings, setShowSettings] = useState(true);
    const handleConfirm = () => {
        console.log("confirm")
    }
    const handleCancel = () => {
        console.log("cancel")
    }
    if (active === 'Notifications & Reminders') {
        const notifications = [
            {
                timeSentHeader: "Today",
                notificationsd: [
                    {
                        id: 1,
                        icon: "🔔",
                        title: "Your Live Devotional Starts Now!",
                        body: "Join today’s morning devotional with Pastor Grace Thompson. Tap to join the stream.",
                        linkText: "Tap to join the stream.",
                        linkUrl: "#",
                        time: "12:19AM",
                        isUnread: true,
                    },
                    {
                        id: 2,
                        icon: "🎵",
                        title: "Latest Gospel Music Drop!",
                        body: "Listen to the newest release by Maverick City Music now on Eden Stream. Tap to join the stream.",
                        linkText: "Tap to join the stream.",
                        linkUrl: "#",
                        time: "02:19PM",
                        isUnread: true,
                    }
                ]
            },
            {
                timeSentHeader: "Earlier",
                notificationsd: [
                    {
                        id: 3,
                        icon: "🔔",
                        title: "Subscription Renewal Reminder",
                        body: "Your Eden Stream Premium plan renews on April 8.",
                        linkText: "Manage Subscription",
                        linkUrl: "#",
                        time: "2d",
                        isUnread: true,
                    },
                    {
                        id: 4,
                        icon: "🔥",
                        title: "Limited-Time Offer: Get 1 Month Free!",
                        body: "Sign up for a 12-month plan and get 1 month free!",
                        linkText: "See Offer",
                        linkUrl: "#",
                        time: "7d",
                        isUnread: true,
                    },
                    {
                        id: 5,
                        icon: "📺",
                        title: "Watch History: New Sermon 'YOU' Level!",
                        body: "We saw you might enjoy the new sermon “YOU” Level by Pastor Lisa Brown. Tap to watch now!",
                        linkText: "Tap to watch now",
                        linkUrl: "#",
                        time: "8d",
                        isUnread: true,
                    },
                    {
                        id: 6,
                        icon: "🔔",
                        title: "Subscription Renewal Reminder",
                        body: "Your Eden Stream Premium plan renews on April 1.",
                        linkText: "Manage Subscription",
                        linkUrl: "#",
                        time: "1mo",
                        isUnread: false,
                    },
                    {
                        id: 7,
                        icon: "🔥",
                        title: "Limited-Time Offer: Get 1 Month Free!",
                        body: "Sign up for a 12-month plan and get 1 month free!",
                        linkText: "See Offer",
                        linkUrl: "#",
                        time: "2mo",
                        isUnread: false,
                    },
                    {
                        id: 8,
                        icon: "📺",
                        title: "Watch History: New Sermon 'YOU' Level!",
                        body: "We saw you might enjoy the new sermon “YOU” Level by Pastor Lisa Brown. Tap to watch now!",
                        linkText: "Tap to watch now",
                        linkUrl: "#",
                        time: "2mo",
                        isUnread: false,
                    }
                ]
            }
        ];


        const clearAllHandler = () => {
            console.log("clear all")
        }
        const markallasreadHandler = () => {
            console.log("mark all as read")
        }
        const handleBack  = () => {
            console.log("back")
        }
        const filterItems = ["All", "Live Event", "New Content", "Billing", "History"]
        const selectedFilterItem = (filter) => {
            setSelectedFilter(filter);
        };
        return (
            <section className="notifications-reminders-section">
                <div className="notifications-reminders-section-header-wrapper">
                    <NotificationsAndRemindersIcon className="notifications-reminders-section-header-icon"/>
                    <h3 className="notifications-reminders-section-header">Notification & Reminders</h3>
                </div>
                {showSettings ? <PreferedNotificationSettings setShowSettings={setShowSettings}/> : 
                <div className="notifications-tab-content-wrapper">
                           {/* <GenericModal
                headerText="Clear All Notifications?"
                paragraphText="Are you sure you want to clear all notifications? This action cannot be undone."
                img={pauseDurationModalImg}
                sectionClassName="manage-subscriptions-modal-section"
                ContentWrapper="manage-subscriptions-modal-content-wrapper"
                buttons={[<Button className="cancel-btn" label="Cancel" action={handleCancel} />, <Button className="pause-duration-btn" label="Confirm" action={handleConfirm} />] }
            />           */}
                    <div className="notifications-tab-content-controls">
                        <Button
                            className="watch-back-arrow"
                            icon={watchBackArrow}
                            action={handleBack}
                        />
                        <div className="notifications-tab-right-control-btns">
                            <Button svg={<MarkAllAsReadIcon className="markallasread-icon"/>} label="Mark all as read" className="nt-markallasread-btn" action={markallasreadHandler} />
                            <Button svg={<DeleteNotificationIcon className="clear-all-icon"/> }label="Clear All" className="nt-clearall-btn" action={clearAllHandler} />
                            <ProfileSettingsIcon className="notifications-settings-icon" onClick={() => setShowSettings(true)}  />
                        </div>
                    </div>
                    <div className="notifications-tab-content-filter">
                        {filterItems.map((filterItem)=> {
                            return (
                            <div key={filterItem} className={`ntcf-item ${selectedFilter === filterItem ? "selectedfilter" : ""}`} onClick={() => selectedFilterItem(filterItem)}>
                                {filterItem}
                            </div>)
                        }) }
                        
                        </div>
                        
                        <div className="notifications-tab-content">
  {notifications && notifications.length > 0 ? (
    notifications.map(({ timeSentHeader, notificationsd }) => (
      <React.Fragment key={timeSentHeader}>
        <div className="notification-fragment">
        <h4 className="time-sent-header">{timeSentHeader}</h4>
        {notificationsd.map((notification) => (
          <div key={notification.id} className="notification-item-wrapper">
            <div className="notifications-item">
              <div className="notification-item-icon">{notification.icon}</div>
              <div className="notifications-item-info">
                <h6 className="notification-item-title">{notification.title}</h6>
                <p className="notification-item-body">{notification.body}</p>
                {notification.linkText && (
                  <Link to={notification.linkUrl} className="notification-item-link">
                    {notification.linkText}
                  </Link>
                )}
              </div>
              <div className="notification-item-time">
                <p className="notification-time">{notification.time}</p>
                {notification.isUnread && <span className="notification-item-unread"></span>}
              </div>
            </div>
            <DeleteNotificationIcon className="delete-notification-item-icon" />
          </div>
        ))}
        </div>
        
      </React.Fragment>
    ))
  ) : (
    <div className="no-notifications">
        <img loading="lazy" className="no-notifications-img"src={noNotifications}/>
      <p className="no-notifications-text">No new notifications</p>
    </div>
  )}
</div>

                </div>}
                
               
            </section>
        )
    }

    return <></>
}


export default NotificationReminders

const PreferedNotificationSettings = ({ setShowSettings }) => {
    const [toggleStates, setToggleStates] = useState({});

    const handleToggle = (label) => {
        setToggleStates((prevState) => ({
            ...prevState,
            [label]: !prevState[label]
        }));
    };

    const handleReset = () => {
        console.log("reset")
    }

    const handleSaveChanges = () => {
        console.log("reset")
    }
    const handleModalGotIt = ()  => {
        console.log("got it")
    }
    const notificationSettingsToggles = [{settingsItemsLabel: " Notification Categories", notificationSettingItems: [{label: "Live Event Reminders"}, {label: "New Content Alerts"}, {label: "Subscription & Billing Updates"}],}, {settingsItemsLabel: "Delivery Preferences", notificationSettingItems:[{label: " Push Notifications"}, {label: "Email Alerts"}, {label: "SMS Notifications"}]}]
    const handleBack = () => {
        setShowSettings((prev)=> !prev)
    }
    return (
        <section className="prefered-notification-settings-section">
            {/* <GenericModal
                headerText="Notification Changes sucessful!"
                paragraphText="You have successfully made changes to the notification settings"
                img={paymentSuccessModalImg}
                sectionClassName="subscription-plans-change-modal-section"
                ContentWrapper="subscription-plans-change-modal-content-wrapper"
                buttons={[<Button className="got-it-btn" label="Got It" action={handleModalGotIt} />]}
            /> */}
            <Button
                            className="watch-back-arrow"
                            icon={watchBackArrow}
                            action={handleBack}
                   
                        />
              {notificationSettingsToggles.map(({ settingsItemsLabel, notificationSettingItems }) => (
      <React.Fragment key={settingsItemsLabel}>
        <div className="notification-settings-fragment">
        <h4 className="notification-settings-header">{settingsItemsLabel}</h4>
        <div className="notification-settings-items-wrapper">
        {notificationSettingItems.map(({ label }) => (
        
        <div className="notification-setting-item">
         
          
            <h6 className="notification-setting-item-text">{label}</h6>

          
         <ToggleSwitch checked={toggleStates[label] || false}
                            onChange={() => handleToggle(label)}/>
        </div>
    
    ))}
        </div>
        
        </div>
        
      </React.Fragment>
    ))}  
        <div className="save-reset-notification-settings-changes">
            <Button className="reset-notification-settings-btn" label="Reset" action={handleReset}/>
            <Button className="save-notification-settings-btn" label="Save Changes" action={handleSaveChanges}/>
        </div>
        </section>
    )
}