import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// COMPONENTS
import Banner from "../components/landing/Banner";
import Faq from "../components/landing/Faq";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/landing/Hero";
import NewsletterSubscriptionSection from "../components/NewsletterSubscriptionSection";
import ChooseThePlanSection from "../components/ChooseThePlanSection";
import StreamsOfLifeGiven from "../components/landing/StreamsOfLifeGiven";
import { setDeviceInCookies } from "../constants/setDeviceInCookies";
import Devices from "../components/landing/Devices";
import Logo from "../components/Logo";
import { sendLog } from "../redux/account";
import DataFriendly from "../components/landing/DataFriendly";
//new landing page dynamicbanner import
import DynamicBanner from "../components/banners/DynamicBanner";
// import { fetchGenres, fetchMovie, fetchTrendingAndRecentlyAddedMovies } from "../redux/fetchMoviesApi";
import { setActiveGenreTab } from "../redux/slice/genreTabSlice";
// import Reel from "../components/reels/Reel";
import { Navigate } from "react-router-dom";
import { COOKIES } from "../../utils/constants";
import "../components/styles/landing.scss";
import ReelWrapper from "../components/reels/ReelWrapper";
import WantToAccess from "../components/WantToAccess";
const Landing = () => {
  // I am setting cookies that ll later check for user browser when user logs in
  // this will help in setting the device info for login post API
  // I will do this for the landing and signup - signin
  // and it ll load when the user visits page or refreshes page with useEffect beneath this
  // const isAuthenticated = JSON.parse(window.localStorage.getItem('isAuthenticated'))
  const dispatch = useDispatch();
  const user_info = COOKIES.get("user_info");

  // If user is logged in, redirect to home page

  useEffect(() => {
    const initSendLogs = async () => {
      await sendLog({
        action: "visit",
        instance: process.env.REACT_APP_DEFAULT_COUNTRY_SYMBOL
      });
    };

    window.scrollTo(0, 0);
    setDeviceInCookies();
    initSendLogs();
  }, []);
  // console.log(user_info)

  // if (user_info) {
  //   return <Navigate replace to="/home" />;
  // }
  return (
    <>
      <main>
        <div className="landing-page-bg">
          <Header />
          <Hero />
        </div>
        <div className="inner-sections-wrapper">
          <StreamsOfLifeGiven marginBottom="clamp(25px, 9.1667vw, 176px)"/> 
          <Devices marginBottom="clamp(25px, 9.1667vw, 176px)"/>
          <ChooseThePlanSection marginBottom="clamp(25px, 9.1667vw, 176px)"/>
          <Faq marginBottom="clamp(25px, 8.3854vw, 161px)"/>
          <NewsletterSubscriptionSection marginBottom="clamp(25px, 3.3203vw, 63.75px)"/>
          </div>
        {/* <DynamicBanner showSlides={false} className="landing-dynamic-banner" /> */}
        {/* <Banner isAuthenticated={isAuthenticated}/> */}
        
        {/* <DataFriendly /> */}
        
        {/* <Logo w='200px' /> */}
        <Footer />
      </main>
    </>
  );
};


export default Landing