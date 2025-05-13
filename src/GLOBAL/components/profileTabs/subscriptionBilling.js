import { useState } from "react";
import { SubscriptionsAndBillingIcon, SettingsArrowRight, watchBackArrow, ContentPreferencesIcon, AccountInformationIcon, WatchHistoryIcon, NotificationsAndRemindersIcon, AddPaymentPlus, mtnPaymentImg, visaPaymentImg, mastercardPaymentImg, dateRangeImg, changeSubModalImg, paymentSuccessModalImg, pauseDurationModalImg, datePickerCaret } from "../../../utils/assets";
import "../../components/styles/profileTabs/subscription-billing.scss";
import Button from "../../components/buttons/Button";
import EdenStreamsPlanCard from "../cards/EdenStreamsPlanCard";
import PlansContainer from "../plansContainer";
import Radio from "../../components/formInputs/radioInput"
import Checkbox from "../../components/formInputs/checkbox"
import ToggleSwitch from "../formInputs/toggleSwitch";
import TextInput from "../formInputs/textInput";
import SelectInput from "../formInputs/selectInput";
import DateRangePicker from "../datePicker";
import GenericModal from "../genericModal";

const SubscriptionBilling = ({ active }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    if (active === 'Subscription & Billing') {
        const handleBack = () => {
            setSelectedOption(null);
        };

        const subscriptionWrapperClass = `subscription-main-wrapper ${!selectedOption && "main-detail-padding"}`;

        return (
            <section className="subscription-billing-section">
                <div className="subscription-billing-section-header-wrapper">
                    <SubscriptionsAndBillingIcon className="subscription-billing-section-header-icon" />
                    <h2 className="subscription-billing-header">Subscription & Billing</h2>
                </div>
                <div className={subscriptionWrapperClass}>
                    <div className="subscription-main">
                        {selectedOption ? (
                            <>
                                <Button
                                    className="watch-back-arrow"
                                    icon={watchBackArrow}
                                    action={handleBack}
                                />
                                <SubscriptionContent selectedOption={selectedOption} />
                            </>
                        ) : (
                            <SubscriptionMainDetail onSelectOption={setSelectedOption} />
                        )}
                    </div>
                </div>
            </section>
        );
    }
    return <></>;
};

export default SubscriptionBilling;

const SubscriptionMainDetail = ({ onSelectOption }) => {
    const options = [
        { id: 1, icon: <AccountInformationIcon className="subscription-icon subscription-plan-img" />, text: "Subscription Plan" },
        { id: 2, icon: <ContentPreferencesIcon className="subscription-icon payment-methods-img" />, text: "Payment Methods" },
        { id: 3, icon: <WatchHistoryIcon className="subscription-icon billing-history-img" />, text: "Billing History" },
        { id: 4, icon: <NotificationsAndRemindersIcon className="subscription-icon subscription-settings-img" />, text: "Subscription Settings" },
        { id: 5, icon: <SubscriptionsAndBillingIcon className="subscription-icon manage-subscriptions-img" />, text: "Manage Subscription" }
    ];

    return (
        <>
            {options.map((option) => (
                <div
                    key={option.id}
                    className="subscription-detail"
                    onClick={() => onSelectOption(option.id)}
                >
                    <div className="subscription-detail-icon-text-wrapper">
                        {option.icon}
                        <p className="subscription-detail-text">{option.text}</p>
                    </div>

                    <SettingsArrowRight className="settings-arrow-right" />
                </div>
            ))}
        </>
    );
};

const PaymentMethods = () => {
    // Example data structure for top payment cards
    const [addPaymentMethod, setAddPaymentMethod] = useState(false)
    const [selectedMethod, setSelectedMethod] = useState(null)
    const [paymentCards] = useState([
        {
            id: 1,
            title: "Sakuku",
            balance: "Gh845",
            number: "1234 1234 1234 1234",
            expiry: null,
            variant: "sakuku-card", // for styling overrides
        },
        {
            id: 2,
            title: "Mtn Momo",
            balance: null,
            number: "3555 7644 0037 1021",
            expiry: "Exp 24/26",
            variant: "momo-card", // for styling overrides
        },
    ]);

    // Example data structure for payment method items
    const [methodList, setMethodList] = useState([
        { id: 1, label: "Mobile Money", removable: true },
        { id: 2, label: "Visa Card", removable: false },
        { id: 3, label: "Master Card", removable: false },
    ]);

    // Handler to remove a payment method from the list
    const handleRemoveMethod = (id) => {
        setMethodList((prev) => prev.filter((item) => item.id !== id));
    };

    // Handler to simulate adding a new payment method
    const handleAddMethod = () => {
        return (
            setAddPaymentMethod((prev) => !prev)
        )
    };

    // Renders the form for the selected payment method
    const renderPaymentMethodView = () => {
        switch (selectedMethod) {
            case 1:
                return <MomoPaymentView />;
            case 2:
                return <VisaPaymentView />;
            case 3:
                return <MastercardPaymentView />;
            default:
                return null;
        }
    };
    // If a payment method is selected, render only its component
    if (selectedMethod) {
        const handleCancel = () => {
            console.log("cancel")
        }

        const handleConfirm = () => {
            console.log("confirm")
        }
        return (
            <>
            <div className="payment-method-form-container">
                {renderPaymentMethodView()}
            </div>
            {/* <GenericModal
                headerText="Deleting Payment Mode"
                paragraphText="Are you sure you want to delete this payment mode. Deleting this payment mode means you would lose all information attached to this payment mode"
                img={pauseDurationModalImg}
                sectionClassName="manage-subscriptions-modal-section"
                ContentWrapper="manage-subscriptions-modal-content-wrapper"
                buttons={[<Button className="cancel-btn" label="Cancel" action={handleCancel} />, <Button className="pause-duration-btn" label="Confirm" action={handleConfirm} />] }
            /> */}
            </>
        );
    }

    return (
        <>
            {!addPaymentMethod ? <div className="payment-methods-container">
                {/* Top Payment Cards */}
                <div className="payment-cards-wrapper">
                    {paymentCards.map((card) => (
                        <div key={card.id} className={`payment-card ${card.variant}`}>
                            <div className="payment-card-content">
                                <h4 className="payment-card-title">{card.title}</h4>
                                <div className="payment-card-bottom-details">
                                    {card.balance && <p className="payment-card-balance">{card.balance}</p>}
                                    <p className="payment-card-number">{card.number}</p>
                                    {card.expiry && <p className="payment-card-exp">{card.expiry}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Payment Methods List */}
                <div className="payment-methods-list">
                    {methodList.map((method) => (
                        <div key={method.id} className="payment-method-item" onClick={() => setSelectedMethod(method.id)}>
                            <span className="payment-method-label">{method.label}</span>
                            <SettingsArrowRight className="payment-arrow-right" />
                        </div>
                    ))}
                </div>

                {/* Add New Payment Method Button */}
                <Button className="add-new-payment-btn" action={handleAddMethod} label="Add New Payment Method" svg={<AddPaymentPlus className="add-payment-plus" />} />

            </div> : <AddPaymentMethod />}
        </>

    );
};

const MomoPaymentView = () => {
    const momopaymentdata = [{ name: "Davida Dzato" }, { "card Number": "**** *** 348" }, { "Valid From": "10/15" }, { "expire Date": "10/20" }]
    const handleDelete = () => {
        console.log('delete')
    }
    return (
        <div className="payment-method-view">
            {momopaymentdata.map((data, index) => {
                // Each object has one key/value pair
                const key = Object.keys(data)[0];
                const value = data[key];
                return (
                    <div key={index} className="payment-method-view-item">
                        <span className="payment-method-view-label">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                        <span className="payment-method-view-value">{value}</span>
                    </div>
                );
            })}

            <Button className="payment-method-view-delete" label="Delete Account" action={handleDelete} />

        </div>
    )
}

const VisaPaymentView = () => {
    return (
        <></>
    )
}

const MastercardPaymentView = () => {
    return (
        <></>
    )
}
const AddPaymentMethod = () => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [methodList, setMethodList] = useState([
        { id: 1, methodImg: mtnPaymentImg, label: "Mobile Money", removable: true },
        { id: 2, methodImg: visaPaymentImg, label: "Visa Card", removable: false },
        { id: 3, methodImg: mastercardPaymentImg, label: "Master Card", removable: false },
    ]);

    // Renders the form for the selected payment method
    const renderPaymentMethodComponent = () => {
        switch (selectedMethod) {
            case 1:
                return <AddMomoPaymentMethod />;
            case 2:
                return <VisaPaymentMethod />;
            case 3:
                return <VisaPaymentMethod />;
            default:
                return null;
        }
    };
    // If a payment method is selected, render only its component
    if (selectedMethod) {
        const handleGotIt = () => {
            console.log("got it")
        }
        return (
            <> 
            {/* <GenericModal
            headerText="Payment Method Added!"
            paragraphText="Payment method successfully added! You can now use [Selected Payment Option] for transactions."
            img={paymentSuccessModalImg}
            sectionClassName="subscription-plans-change-modal-section"
            ContentWrapper="subscription-plans-change-modal-content-wrapper"
            buttons={  [<Button className="got-it-btn" label="Got It" action={handleGotIt} />]}
        /> */}
        <div className="payment-method-form-container">
                {renderPaymentMethodComponent()}
            </div>
            </>
        );
    }
    return (
        <div className="add-payment-method">
            {methodList.map((method) => (
                <div key={method.id} className="add-payment-method-item" onClick={() => setSelectedMethod(method.id)}>
                    <img loading="lazy" className="add-payment-method-img" src={method.methodImg} />
                    <span className="add-payment-method-label">{method.label}</span>
                    <SettingsArrowRight className="payment-arrow-right" />
                </div>
            ))}
        </div>
    )
}

const VisaPaymentMethod = () => {

    const [cardNumber, setCardNumber] = useState("");
    const [confirmCardNumber, setConfirmCardNumber] = useState("");
    const [cvv, setCvv] = useState("");
    const [expiryDate, setExpiryDate] = useState("");

    const handleAddPaymentMethod = () => {
        // Here you can handle the logic for adding the payment method,
        // such as validating inputs, sending data to the server, etc.
        console.log({
            cardNumber,
            confirmCardNumber,
            cvv,
            expiryDate,
        });
    };

    return (
        <div className="new-payment-method-container">

            <form className="payment-method-form">

                <TextInput
                    name="cardNumber"
                    type="number"
                    value={cardNumber}
                    placeholder="Enter Card Number"
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="new-payment-method-textinput"
                />

                <TextInput
                    name="confirmCardNumber"
                    type="text"
                    value={confirmCardNumber}
                    placeholder="Re-enter Card Number"
                    onChange={(e) => setConfirmCardNumber(e.target.value)}
                    className="new-payment-method-textinput"
                />

                <TextInput
                    name="cvv"
                    type="text"
                    value={cvv}
                    placeholder="Enter CVV"
                    onChange={(e) => setCvv(e.target.value)}
                    className="new-payment-method-textinput"
                />

                <TextInput
                    name="expiryDate"
                    type="text"
                    value={expiryDate}
                    placeholder="MM/YY"
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="new-payment-method-textinput"
                />

                <Button
                    className="add-payment-method-button"
                    label="Add Payment Method"
                    action={handleAddPaymentMethod}
                />
            </form>
        </div>
    );
};

const AddMomoPaymentMethod = () => {
    // State for form fields
    const [momoType, setMomoType] = useState("");
    const [momoNumber, setMomoNumber] = useState("");
    const [momoName, setMomoName] = useState("");
    const momoOptions = [
        { value: 'MTN', label: 'MTN' },
        { value: 'Vodafone', label: 'Vodafone' },
        { value: 'AirtelTigo', label: 'AirtelTigo' },
    ];
    // Handler for form submission
    const handleAddPaymentMethod = (e) => {
        e.preventDefault();
        // You could add form validation here
        const newPaymentData = {
            momoType,
            momoNumber,
            momoName,
        };
        console.log("New Payment Method: ", newPaymentData);
        // Perform your API calls or other logic here

        // Reset fields if needed
        setMomoType("");
        setMomoNumber("");
        setMomoName("");
    };

    return (
        <div className="new-payment-method-container">

            <form className="payment-method-form" >
                {/* MoMo Type */}
                <SelectInput
                    // icon={<img loading="lazy" src={datePickerCaret} className="caret-down"/>}
                    iconPosition="right"
                    name="momoType"
                    value={momoType}
                    placeholder="Select Momo Type"
                    onChange={(e) => setMomoType(e.target.value)}
                    options={momoOptions}
                    className="new-payment-method-selectinput" // additional class name if needed
                />

                {/* MoMo Number */}
                <TextInput
                    name="momoNumber"
                    type="number"
                    value={momoNumber}
                    placeholder="Enter your mobile money number"
                    onChange={(e) => setMomoNumber(e.target.value)}
                    className="new-payment-method-textinput"
                />
                {/* Name on the mobile money account */}

                <TextInput name="momoName" value={momoName} placeholder="Name on the mobile money account" onChange={(e) => setMomoName(e.target.value)} className="new-payment-method-textinput" />
                {/* Submit Button */}

                <Button
                    type="submit"
                    className="add-payment-method-button"
                    label="Add Payment Method"
                    action={handleAddPaymentMethod}
                />

            </form>
        </div>
    );
};


const SubscriptionPlans = () => {
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const currentPlan = {
        planTitle: "Monthly Plan",
        planDescription:
            "Access to a wider selection of movies and shows, including most new releases and exclusive content.",
        planPrice: "Gh300.99",
        planDuration: "monthly"
    };

    // 2) Upgrade/downgrade plans
    const upgradePlans = [
        {
            planTitle: "Weekly Plan",
            planDescription:
                "Access to a wide selection of movies and shows, including new releases.",
            planPrice: "Gh70.00",
            planDuration: "weekly"
        },
        {
            planTitle: "Daily Plan",
            planDescription:
                "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
            planPrice: "Gh10.00",
            planDuration: "daily"
        }
    ];
    const handleCancel = () => {
        console.log('cancel sub change')
    }
    const handleConfirmSwitch = () => {
        console.log('confirm switch')
        setPaymentSuccess(true)
    }
    const handleGotIt = () => {
        console.log('got it')

    }

    return (
        <>
            <div className="subscription-plans-view">
                {/* Current Plan */}
                <div className="current-plan-wrapper">
                    <h3 className="current-plan-section-header">Current Plan</h3>
                    <EdenStreamsPlanCard
                        variant="selected" // highlight the current plan
                        planTitle={currentPlan.planTitle}
                        planDescription={currentPlan.planDescription}
                        planPrice={currentPlan.planPrice}
                        planDuration={currentPlan.planDuration}
                    />
                </div>

                {/* Upgrade/Downgrade Options */}
                <div className="upgrade-plans-wrapper">
                    <h3 className="upgrade-plans-section-header">Upgrade/Downgrade Options</h3>
                    <PlansContainer variant="column" planData={upgradePlans} />
                    {/* 
            ^ Pass a custom prop (e.g. `plansData`) so PlansContainer 
            knows which plans to render. 
          */}
                </div>
            </div>
            {/* <GenericModal
                headerText={!paymentSuccess ? "Confirm Plan Changes" : "Payment Plan Successful"}
                paragraphText={!paymentSuccess ? <>
                    Your new plan will take effect on <span className="next-billing-date">[Next Billing Date].</span><br /><br />
                    No refunds are issued for the current cycle. You will be charged <span className="next-billing-date">$5.99 per</span> month moving forward.
                </> : <>
                    Your subscription has been updated to<span className="next-billing-date">[New Plan].</span>
                    Your next billing date is <span className="next-billing-date">[Date]</span>
                </>}
                img={!paymentSuccess ? changeSubModalImg : paymentSuccessModalImg}
                sectionClassName="subscription-plans-change-modal-section"
                ContentWrapper="subscription-plans-change-modal-content-wrapper"
                buttons={!paymentSuccess ? [<Button className="cancel-plan-change-btn" label="Cancel" action={handleCancel} />, <Button className="confirm-switch-btn" label="Confirm Switch " action={handleConfirmSwitch} />] : [<Button className="got-it-btn" label="Got It" action={handleGotIt} />]}
            /> */}
            </>


    );
};


const BillingHistory = () => {
    const [dateRangeSelected, setDateRangeSelect] = useState(false)
    const handledateRangeSelect = () => {
        setDateRangeSelect((prev) => !prev)
    }
    return (
        <div className="billing-history">
            <div className="select-date-range">
                <div className={`select-date-range-header ${dateRangeSelected && "date-range-selected"}`} onClick={handledateRangeSelect}>
                    <img loading="lazy" className="date-range-img" src={dateRangeImg} />
                    <p className="date-range-text">Select Date Range</p>
                </div>
                {dateRangeSelected && <DateRangePicker />}
            </div>

        </div>
    );
};

const ManageSubscription = () => {
    const [isOn, setIsOn] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [selectedPauseDuration, setSelectedPauseDuration] = useState(null);
    const pauseDurationOptions = [{id:1, optionLabel: "⏳ 1 Month"}, {id:2, optionLabel: "⏳ 3 Months"}, {id:3, optionLabel: "⏳ 6 Months"}]
    const handleCancel = () => {
        console.log('cancel')
    }
    const handlePauseDuration = () => {
        console.log('pause duration')
        setShowConfirmationModal(true)
    }

    const handleConfirmPause = () => {
        console.log('confirm pause')
    }
    return (

        <>
            <div className="manage-subscription-main">
                <div className="pause-subscription-toggle-wrapper">


                    <h3 className="ps-toggle-text">Pause Subscription</h3>

                    <ToggleSwitch
                        checked={isOn}
                        onChange={(val) => setIsOn(val)}
                    />
                </div>
            </div>
            {/* <GenericModal
                headerText={!showConfirmationModal ? "Need a Break?" : "Select Pause Duration"}
                paragraphText={!showConfirmationModal ? <>You can pause your subscription and resume anytime before <span>[20th March,2025].</span> During this period, you won’t be charged, and access will be restricted.</> : <>You can resume your subscription anytime before <span>[expiry date].</span></>}
                img={!showConfirmationModal ? pauseDurationModalImg : ""}
                sectionClassName="manage-subscriptions-modal-section"
                children={
                <>{showConfirmationModal && <div className="pd-options-wrapper">
                {pauseDurationOptions.map(({ id, optionLabel }) => (
            <div key={id} className="pause-duration-option">
              <Radio
                name="pauseDuration"
                label={optionLabel}
                value={id}
                checked={selectedPauseDuration === id}
                onChange={() => setSelectedPauseDuration(id)}
              />
            </div>
          ))}
                </div>}</>}
                ContentWrapper="manage-subscriptions-modal-content-wrapper"
                buttons={!showConfirmationModal ? [<Button className="cancel-btn" label="Cancel" action={handleCancel} />, <Button className="pause-duration-btn" label="Pause Duration" action={handlePauseDuration} />] : [<Button className="cancel-btn" label="Cancel" action={handleCancel} />, <Button className="pause-duration-btn" label="Pause Duration" action={handleConfirmPause} />]}
            /> */}
        </>
    );
};

const SubscriptionSettings = () => {
    const [isOn, setIsOn] = useState(false);
    const subscriptionRemindersData = [
        { id: 1, label: "1 day before renewal", value: "1 day before renewal" },
        { id: 2, label: "3 days before renewal", value: "3 days before renewal" },
        { id: 3, label: "7 days before renewal", value: "7 days before renewal" },
        { id: 4, label: "Custom", value: "Custom" }
    ];
    const reminderDeliveryData = [
        { id: 1, label: "Email Notification", name: "email" },
        { id: 2, label: "Push Notification", name: "push" },
        { id: 3, label: "SMS Reminder", name: "sms" }
    ];
    const handleCancel = () => {
        console.log("cancel")
    }
    const handleModalConfirm = () => {
        console.log("cancel")
    }
    const handleModalCancel = () => {
        console.log("cancel")
    }
    const handleConfirmSwitch = () => {
        console.log("confirm switch")
    }
    return (
        <>
        {/* <GenericModal sectionClassName="subscription-settings-modal-section" ContentWrapper="subscription-settings-content-wrapper" img={pauseDurationModalImg} headerText="Turn off Auto-Renewal?" paragraphText="Turning off auto-renewal means you’ll lose access to premium features after 20th March,2025."  buttons={[<Button className="cancel-btn" label="Cancel" action={handleModalCancel} />, <Button className="pause-duration-btn" label="Confirm" action={handleModalConfirm} />]}/> */}
        <div className="subscription-settings-main">
            <div className="auto-renew-section">
                <h3 className="auto-renew-section-title">Auto Renewal Toggle</h3>
                <div className="auto-renew-toggle-wrapper">
                    <span className="auto-renew-toggle-label">Renew Subscriptions</span>
                    <ToggleSwitch
                        checked={isOn}
                        onChange={(val) => setIsOn(val)} />
                </div>
            </div>
            <div className="subscription-reminders-section">
                <h3 className="reminders-section-title">Subscription Reminders</h3>
                <div className="subscription-reminders-wrapper">
                    {subscriptionRemindersData.map((item) => (
                        <Radio
                            key={item.id}
                            className="radio-wrapper-subscription"
                            name="subscriptionReminder"
                            value={item.value}
                            label={item.label}

                        // checked={reminderOption === item.value}
                        // onChange={handleReminderChange}
                        />
                    ))}
                </div>
            </div>
            <div className="reminder-delivery-section">
                <h3 className="delivery-section-title">Reminder Delivery Method</h3>
                <div className="delivery-methods-wrapper">
                    {reminderDeliveryData.map((item) => (
                        <Checkbox
                            key={item.id}
                            className="checkbox-delivery"
                            name={item.name}
                            label={item.label}
                            radioRightVariant="subscription-reminders-variant"
                        //   checked={deliveryMethods[item.name] || false}
                        //   onChange={() => handleDeliveryChange(item.name)}
                        />
                    ))}
                </div>
            </div>
            <div className="cancel-confirm-btns">
                <Button className="subscription-settings-cancel-btn" label="Cancel" action={handleCancel} />
                <Button className="subscription-settings-confirm-btn" label="Confirm Switch" action={handleConfirmSwitch} />
            </div>
        </div></>
    )
}

const SubscriptionContent = ({ selectedOption }) => {
    switch (selectedOption) {
        case 1:
            return <SubscriptionPlans />;
        case 2:
            return <PaymentMethods />;
        case 3:
            return <BillingHistory />;
        case 4:
            return <SubscriptionSettings />
        case 5:
            return <ManageSubscription />;
        default:
            return null;
    }
};


