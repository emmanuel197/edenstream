import React from "react";
// COMPONENTS
import Footer from "../components/Footer";
import Header from "../components/Header";
import OTPVerificationComponent from "../components/otpVerificationPage/otpVerification";

const OTPVerification = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header links={1} signup={5} />
      <OTPVerificationComponent />
      <Footer />
    </>
  );
};

export default OTPVerification;
