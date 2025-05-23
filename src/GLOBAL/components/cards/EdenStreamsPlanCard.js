import React, {useRef, useState} from "react";
import Button from "../buttons/Button";
import "../../components/styles/EdenStreamsPlanCard.scss";
import { selectedPlanIcon } from "../../../utils/assets";
import { useDispatch } from "react-redux";
import { subscriptionModalReducer } from '../../redux/slice/subscriptionSlice';

const EdenStreamsPlanCard = ({
  variant,
  planTitle,
  planDescription,
  planPrice,
  planPer,
  uid,
  onChoose
}) => {
  const [selectedPlan, setSelectedPlan] = useState(false);
  const dispatch = useDispatch();
  const cardRef = useRef();
  const _initPurchasePackage = () => {
    if (onChoose) onChoose(uid, cardRef);
    // setSelectedPlan(true);
    // dispatch(subscriptionModalReducer({
    //   isOpen: true,
    //   productId: uid,
    //   productName: planTitle,
    //   productPrice: planPrice,
    //   currency: 'GHS'
    // }));
  };
  return (
    <div ref={cardRef} className={`plan-card ${variant==="selected" && "plan-card-selected"}`}>
      <div className="plan-card-text">
        <div className="plan-card-header-wrapper">
        <h3 className="plan-card-header">{planTitle}</h3>
        {variant==="selected" && <span className="current-plan-badge">Current Plan</span>}
        </div>
        
        <p className="plan-card-paragraph">{planDescription}</p>
      </div>

      <p className="plan-card-price">
        {" "}
        gh{planPrice}
       {!variant && uid !=='freetowatch' && <span className="plan-duration">/{planPer}</span>}
      </p>
     { !(variant==="selected") && <Button icon={selectedPlan && selectedPlanIcon} className={`choose-plan-btn ${selectedPlan && "selected-plan"}`} label="Choose Plan" action={_initPurchasePackage} />}
    </div>
  );
};

export default EdenStreamsPlanCard;
