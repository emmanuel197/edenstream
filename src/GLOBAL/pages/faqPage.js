import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Faq from "../components/landing/Faq"; // Assuming Faq component is in this path

const FaqPage = () => {
  return (
    <>
      <Header />
     <div className="inner-sections-wrapper">
     <Faq marginBottom="clamp(25px, 8.3854vw, 161px)" marginTop="clamp(25px, 8.3854vw, 161px)"/>
        
        </div> 
      <Footer />
    </>
  );
};

export default FaqPage;