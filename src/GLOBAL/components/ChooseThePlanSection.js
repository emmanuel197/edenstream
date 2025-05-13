import React from "react";
import "../components/styles/choose-the-plan-section.scss"
import PlansContainer from "./plansContainer";
const ChooseThePlanSection = ({marginTop, marginBottom}) => {
 
  return (
    <>
      <section className="choose-the-plan-section" style={{marginTop: marginTop, marginBottom: marginBottom}}>
        <div className="choose-the-plan-section-header-wrapper">
          <div className="choose-the-plan-section-header-container">

          <h2 className="choose-the-plan-section-header">
              Choose the plan that's right for you
            </h2>
            <p className="choose-the-plan-section-paragraph">
              join EdenStream and choose from our flexible subscription plans
              designed to fit your faith-filled viewing needs. Get ready to
              experience endless inspiration, anytime, anywhere!
            </p>
          </div>
        </div>
        <PlansContainer/>
      
      </section>
    </>
  );
};

export default ChooseThePlanSection;
