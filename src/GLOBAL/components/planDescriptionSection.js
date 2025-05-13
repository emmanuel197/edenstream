import React from "react";
import "../components/styles/plan-description-section.scss";

const PlanDescriptionSection = ({ marginTop, marginBottom }) => {
  const headers = [{name: "Features"}, {name: "Daily"}, {name: "Weekly",  popular: true}, {name: "Monthly"}];
  const subscriptionPlans = [
    {
      feature: "Price",
      daily: "$9.99/Month",
      weekly: "$12.99/Month",
      monthly: "$14.99/Month",
    },
    {
      feature: "Content",
      daily: "Access to a wide selection of movies and shows, including some new releases.",
      weekly: "Access to a wider selection of movies and shows, including most new releases and exclusive content.",
      monthly: "Access to the widest selection of movies and shows, including all new releases and Offline Viewing.",
    },
    {
      feature: "Devices",
      daily: "Watch on one device simultaneously.",
      weekly: "Watch on two devices simultaneously.",
      monthly: "Watch on four devices simultaneously.",
    },
    {
      feature: "Free Trial",
      daily: "7 Days",
      weekly: "7 Days",
      monthly: "7 Days",
    },
    {
      feature: "Cancel Anytime",
      daily: "Yes",
      weekly: "Yes",
      monthly: "Yes",
    },
    {
      feature: "HDR",
      daily: "No",
      weekly: "Yes",
      monthly: "Yes",
    },
    {
      feature: "Dolby Atmos",
      daily: "No",
      weekly: "Yes",
      monthly: "Yes",
    },
    {
      feature: "Ad-Free",
      daily: "No",
      weekly: "Yes",
      monthly: "Yes",
    },
    {
      feature: "Offline Viewing",
      daily: "No",
      weekly: "Yes, for select titles.",
      monthly: "Yes, for all titles.",
    },
    {
      feature: "Family Sharing",
      daily: "No",
      weekly: "Yes, up to 5 family members.",
      monthly: "Yes, up to 6 family members.",
    },
  ];
  
  return (
    <>
      <section
        className="plan-description-section"
        style={{ marginTop: marginTop, marginBottom: marginBottom }}
      >
       {headers.map((header, index) => (
        <div key={index} className="pds-header-wrapper">
          <h3 className="pds-header">{header.name}</h3>
          {header.popular && <span className="popular-badge">Popular</span>}
        </div>
      ))}

      {subscriptionPlans.map((plan, index) => (
        <>
          <div key={index} className="pds-feature-wrapper">
            <p className="pds-feature">{plan.feature}</p>
          </div>
          <div className="pds-detail">{plan.daily}</div>
          <div className="pds-detail">{plan.weekly}</div>
          <div className="pds-detail">{plan.monthly}</div>
        </>
      ))}
      </section>
    </>
  );
};

export default PlanDescriptionSection;
