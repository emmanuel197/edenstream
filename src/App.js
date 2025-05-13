import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./GLOBAL/pages/landing";
import SignUpPage from "./GLOBAL/pages/signUpPage";
import SignInPage from "./GLOBAL/pages/signInPage";
import ResetPasswordPage from "./GLOBAL/pages/resetPasswordPage";
import OTPVerification from "./GLOBAL/pages/otpVerification";

import Home from "./GLOBAL/pages/home";
import ProtectedRoute from "./GLOBAL/components/ProtectedRoute";

import ErrorPage from "./GLOBAL/pages/errorPage";
import Profile from "./GLOBAL/pages/profile";

// import Watch from "./GLOBAL/pages/watch";

import Search from "./GLOBAL/pages/search";
import SelectNetwork from "./GLOBAL/pages/auth/selectNetwork";
import "./_global.scss";
import { useSelector } from "react-redux";
import ContactUsPage from "./GLOBAL/pages/contactUsPage";
import SubscriptionPage from "./GLOBAL/pages/subscriptionPage";
import MoviesPage from "./GLOBAL/pages/moviesPage";
import DevotionalPage from "./GLOBAL/pages/devotionalPage"
import MusicPage from "./GLOBAL/pages/musicPage";
import SeriesPage from "./GLOBAL/pages/seriesPage";
import Watch from "./GLOBAL/pages/watch"
import LiveTvPage from "./GLOBAL/components/liveTvPage";
// import RedirectAuthenticated from "./GLOBAL/components/RedirectAuthenticated";

function App() {
  // const isAuthenticated = window.localStorage.getItem('isAuthenticated')
  
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route index element={<Landing />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/movies" element={<MoviesPage/>}/>
        <Route path="/livetv" element={<LiveTvPage/>}/>
        <Route path="/series" element={<SeriesPage/>}/>
        <Route path="/word" element={<DevotionalPage/>}/>
        <Route path="/music" element={<MusicPage/>}/>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
    
        <Route path="/watch" element={<Watch />} />
        

        
        <Route path="/profile" element={<Profile />} />

        {/* <Route path="/series" element={<ProtectedRoute><Series /></ProtectedRoute>} /> */}

   
        <Route path="/search" element={<Search />} />

        <Route path="/out-of-region" element={<ErrorPage text='Service is only available in Ghana and Nigeria' />} />
        

        <Route path="*" element={<ErrorPage text='Page not found!' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
