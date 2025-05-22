import React from "react";
// COMPONENTS
import Footer from "../components/Footer";
import Header from "../components/Header";
import OTPVerificationComponent from "../components/otpVerificationPage/otpVerification";

const OTPVerification = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get mobile number from localStorage
  const mobileNumber = window.localStorage.getItem("afri_mobile_number") || "";

  return (
    <>
      <Header links={1} signup={5} />
      <OTPVerificationComponent mobileNumber={mobileNumber} />
      <Footer />
    </>
  );
};

export default OTPVerification;
