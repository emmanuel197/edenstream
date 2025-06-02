import React, { useState } from "react";
import "../components/styles/plans-container.scss"
import EdenStreamsPlanCard from "../components/cards/EdenStreamsPlanCard"
import SubscriptionsData from "../../utils/subscrptionPlansData"
import GenericModal from "./genericModal";
import { useSelector, useDispatch } from "react-redux";
import Button from "./buttons/Button";
import { subscriptionModalReducer } from '../redux/slice/subscriptionSlice';
import TextInput from "./formInputs/textInput";
import { TOAST, EMAIL_REGEXP } from '../../utils/constants';
import { purchasePackage } from '../redux/subscriptionApis';

const PlansContainer = ({ variant, planData }) => {
  const dispatch = useDispatch();
  const { modalOpen, productName, productPrice, productId } = useSelector((state) => state.fetchPackages);
  const [chosenPlanRef, setChosenPlanRef] = useState(null);
  const [chosenPlanRect, setChosenPlanRect] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
 // Debugging line to check profile state
  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChoosePlan = (uid, ref) => {
    setChosenPlanRef(ref);
    // Get bounding rect for absolute positioning
    if (ref && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setChosenPlanRect(rect);
      // Scroll into view
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // Dispatch modal open as before
    const plan = SubscriptionsData.find(p => p.uid === uid);
    dispatch(subscriptionModalReducer({
      isOpen: true,
      productId: plan?.id,
      productName: plan?.name,
      productPrice: plan?.price,
      currency: 'GHS'
    }));
  };

  const handleCancel = () => {
    dispatch(subscriptionModalReducer({
      isOpen: false,
      productId: null,
      productName: null,
      productPrice: null,
      currency: null
    }));
    setChosenPlanRef(null);
    setChosenPlanRect(null);
    setEmail("");
    setEmailTouched(false);
  }

  const handleContinue = () => {
    setEmailTouched(true);
    if (!email || !EMAIL_REGEXP.test(email)) {
      TOAST.error("Type your email and click continue");
      return;
    }
    const subscriber_uid = window.localStorage.getItem("afri_username");
    purchasePackage(productId, subscriber_uid, email);
  };

  const containerClassName = `plans-container${variant ? ` plans-container--${variant}` : ""}`;

  const emailInput = (
    <TextInput
      placeholder="Email"
      type="email"
      value={email}
      onChange={e => setEmail(e.target.value)}
      error={emailTouched && (!email || !EMAIL_REGEXP.test(email))}
      errorMessage={emailTouched && (!email || !EMAIL_REGEXP.test(email)) ? "Enter a valid email" : undefined}
    />
  );

  return (
    <div className={containerClassName} style={{ position: 'relative' }}>
      {modalOpen && windowWidth <= 420 && chosenPlanRef && chosenPlanRect && (
        <div
          style={{
            position: "absolute",
            left: chosenPlanRef.current.offsetLeft,
            top: chosenPlanRef.current.offsetTop,
            width: chosenPlanRef.current.offsetWidth,
            zIndex: 1000
          }}
        >
          <GenericModal headerText="Subscription Purchase Has Been Initiated" paragraphText={<>You will be billed <span className="subscription-price">GHS{productPrice}</span> for the {productName} subscription. Enter your email and click on continue to be redirected to the payment page</>} children={emailInput} buttons={[
            <Button label="Cancel" className="cancel-button" action={handleCancel} />,
            <Button label="Continue" action={handleContinue} isDisabled={!email || !EMAIL_REGEXP.test(email)} />
          ]} />
        </div>
      )}
      {modalOpen && windowWidth > 420 && (
        <GenericModal headerText="Subscription Purchase Has Been Initiated" paragraphText={<>You will be billed <span className="subscription-price">GHS{productPrice}</span> for the {productName} subscription. Enter your email and click on continue to be redirected to the payment page</>} children={emailInput} buttons={[
          <Button label="Cancel" className="cancel-button" action={handleCancel} />,
          <Button label="Continue" action={handleContinue} isDisabled={!email || !EMAIL_REGEXP.test(email)} />
        ]} />
      )}
      {SubscriptionsData.map((planDetails) => {
        return (
          <EdenStreamsPlanCard
            key={planDetails.uid}
            variant={variant}
            planTitle={planDetails.name}
            planDescription={planDetails.description}
            planPrice={planDetails.price}
            planPer={planDetails.per}
            planDuration={planDetails.planDuration}
            uid={planDetails.uid}
            onChoose={handleChoosePlan}
          />
        );
      })}
    </div>
  )
}

export default PlansContainer