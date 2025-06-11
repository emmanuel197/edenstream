import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { noNotifications, DeleteNotificationIcon, NotificationsAndRemindersIcon, ProfileSettingsIcon, watchBackArrow, MarkAllAsReadIcon, pauseDurationModalImg, paymentSuccessModalImg } from "../../../utils/assets"
import Button from "../buttons/Button";
import "../../components/styles/profileTabs/notifications-reminders.scss"
import ToggleSwitch from "../formInputs/toggleSwitch";
import GenericModal from "../genericModal";
import { fetchNotifications, deleteNotification } from "../../redux/account"; // Import deleteNotification
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch

const NotificationReminders = ({ active }) => {
    const [selectedFilter, setSelectedFilter] = useState("All");
    const notifications = useSelector((state) => state.account.messages);
    const dispatch = useDispatch(); // Get the dispatch function

    // State for the delete confirmation modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [notificationToDeleteId, setNotificationToDeleteId] = useState(null);

    const handleConfirm = () => {
        console.log("confirm")
    }
    const handleCancel = () => {
        console.log("cancel")
    }
    useEffect(() => {
        // Fetch notifications when the component mounts
        fetchNotifications(dispatch); // Dispatch the action
    }, [dispatch]); // Add dispatch to the dependency array

    // Function to show the delete confirmation modal
    const handleDeleteNotification = (notificationId) => {
        setNotificationToDeleteId(notificationId);
        setShowDeleteModal(true);
    };

    // Function to handle confirmation from the modal
    const confirmDelete = async () => {
        if (notificationToDeleteId) {
            const success = await deleteNotification(notificationToDeleteId);
            if (success) {
                // Refetch notifications after successful deletion
                fetchNotifications(dispatch);
            }
            // Hide the modal and reset the ID
            setShowDeleteModal(false);
            setNotificationToDeleteId(null);
        }
    };

    // Function to handle cancellation from the modal
    const cancelDelete = () => {
        setShowDeleteModal(false);
        setNotificationToDeleteId(null);
    };

    if (active === 'Notifications & Reminders') {
        console.log("notifications", notifications)

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
                            <ProfileSettingsIcon className="notifications-settings-icon" />
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
                {/* Use 'message' field from the JSON */}
                <p className="notification-item-body">{notification.message}</p>
                {notification.linkText && (
                  <Link to={notification.linkUrl} className="notification-item-link">
                    {notification.linkText}
                  </Link>
                )}
              </div>
              <div className="notification-item-time">
                <p className="notification-time">{notification.time}</p>
                {/* Check 'notification_status' field from the JSON */}
                {notification.notification_status === 'unread' && <span className="notification-item-unread"></span>}
              </div>
            </div>
            {/* Add onClick handler to call handleDeleteNotification */}
            <DeleteNotificationIcon
                className="delete-notification-item-icon"
                onClick={() => handleDeleteNotification(notification.id)} // Call the function to show modal
            />
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

                </div>


            </section>
        )
    }

    return (
        <>
            {/* Render the GenericModal when showDeleteModal is true */}
            {showDeleteModal && (
                <GenericModal
                    headerText="Delete Notification?"
                    paragraphText="Are you sure you want to delete this notification? This action cannot be undone."
                    img={pauseDurationModalImg} // Use an appropriate image
                    sectionClassName="delete-notification-modal-section" // Add a specific class name
                    ContentWrapper="delete-notification-modal-content-wrapper" // Add a specific class name
                    buttons={[
                        <Button key="cancel" className="cancel-btn" label="Cancel" action={cancelDelete} />,
                        <Button key="confirm" className="delete-btn" label="Delete" action={confirmDelete} /> // Use confirmDelete
                    ]}
                />
            )}
        </>
    );
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