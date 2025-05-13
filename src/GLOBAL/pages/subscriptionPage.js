import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChooseThePlanSection from "../components/ChooseThePlanSection";
import NewsletterSubscriptionSection from "../components/NewsletterSubscriptionSection";
import PlanDescriptionSection from "../components/planDescriptionSection";
const SubscriptionPage = () => {
  return (
    <>
      <main>
        <Header/>
        <div className="inner-sections-wrapper">
        <ChooseThePlanSection marginTop="7.875rem"/>
        <PlanDescriptionSection marginTop="4.375rem"/>
        <NewsletterSubscriptionSection marginTop="4.375rem"/>
        </div>
        
        <Footer marginTop="6.625rem"/>
      </main>
    </>
  );
};
export default SubscriptionPage;
