import React from "react";
import "../components/styles/plans-container.scss"
import EdenStreamsPlanCard from "../components/cards/EdenStreamsPlanCard"
const PlansContainer = ({variant, planData}) => {
    const plansData = planData || [
      {
        planTitle: "Daily Plan",
        planDescription:
          "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
        planPrice: "gh10.00",
        planDuration: "daily"
      },
      {
        planTitle: "Weekly Plan",
        planDescription:
          "Access to a wider selection of movies and shows, including most new releases and exclusive content.",
        planPrice: "gh70.00",
        planDuration: "weekly"
      },
      {
        planTitle: "Monthly Plan",
        planDescription:
          "Access to a widest selection of movies and shows, including all new releases and Offline Viewing.",
        planPrice: "gh300.99",
        planDuration: "weekly"
      }
    ];

      // If `variant` is provided, we append a BEM-like modifier class
  const containerClassName = `plans-container${
    variant ? ` plans-container--${variant}` : ""
  }`;
    return (
      <div className={containerClassName}>
            {plansData.map((planDetails) => {
              return (
                <>
                  <EdenStreamsPlanCard
                    variant={variant}                  
                    planTitle={planDetails.planTitle}
                    planDescription={planDetails.planDescription}
                    planPrice={planDetails.planPrice}
                    planDuration={planDetails.planDuration}
                  />
                </>
              );
            })}
          </div>
    )
  }

  export default PlansContainer