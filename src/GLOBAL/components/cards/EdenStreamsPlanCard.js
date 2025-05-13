import React, {useState} from "react";
import Button from "../buttons/Button";
import "../../components/styles/EdenStreamsPlanCard.scss";
import { selectedPlanIcon } from "../../../utils/assets";

const EdenStreamsPlanCard = ({
  variant,
  planTitle,
  planDescription,
  planPrice,
  planDuration
}) => {
  const [selectedPlan, setSelectedPlan] = useState(false)
  return (
    <div className={`plan-card ${variant==="selected" && "plan-card-selected"}`}>
      <div className="plan-card-text">
        <div className="plan-card-header-wrapper">
        <h3 className="plan-card-header">{planTitle}</h3>
        {variant==="selected" && <span className="current-plan-badge">Current Plan</span>}
        </div>
        
        <p className="plan-card-paragraph">{planDescription}</p>
      </div>

      <p className="plan-card-price">
        {" "}
        {planPrice}
       {!variant && <span className="plan-duration">/{planDuration}</span>}
      </p>
     { !(variant==="selected") && <Button icon={selectedPlan && selectedPlanIcon} className={`choose-plan-btn ${selectedPlan && "selected-plan"}`} label="Choose Plan" page="/home" />}
    </div>
  );
};

export default EdenStreamsPlanCard;
