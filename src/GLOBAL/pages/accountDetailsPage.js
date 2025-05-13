import React from "react";

// components
import Header from "../components/Header";
import Footer from "../components/Footer";

import { useEffect } from "react";
import AccountDetailsComp from "../components/accountdetails/AccountDetailsComp";

const AccountDetailsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
       
      <Header links={5} signup={1} />
      <AccountDetailsComp />
      <Footer />
    </>
  );
};

export default AccountDetailsPage;
