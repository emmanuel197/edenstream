import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./GLOBAL/pages/landing";
import SignUpPage from "./GLOBAL/pages/signUpPage";
import SignInPage from "./GLOBAL/pages/signInPage";
import ResetPasswordPage from "./GLOBAL/pages/resetPasswordPage";
import OTPVerification from "./GLOBAL/pages/otpVerification";
import MovieDetailsPage from "./GLOBAL/pages/MovieDetailsPage";
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
import MyListPage from "./GLOBAL/pages/myListPage";
// import RedirectAuthenticated from "./GLOBAL/components/RedirectAuthenticated";

function App() {
  // const isAuthenticated = window.localStorage.getItem('isAuthenticated')
  
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route index element={<Landing />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        {/* <Route path="/contact" element={<ProtectedRoute><ContactUsPage /></ProtectedRoute>} /> */}
        <Route path="/subscription" element={<ProtectedRoute><SubscriptionPage /></ProtectedRoute>} />
        <Route path="/movies" element={<ProtectedRoute><MoviesPage/></ProtectedRoute>}/>
        <Route path="/movie/:id" element={<ProtectedRoute><MovieDetailsPage /></ProtectedRoute>} />
        <Route path="/livetv" element={<ProtectedRoute><LiveTvPage/></ProtectedRoute>}/>
        <Route path="/series" element={<ProtectedRoute><SeriesPage/></ProtectedRoute>}/>
        <Route path="/word" element={<ProtectedRoute><DevotionalPage/></ProtectedRoute>}/>
        <Route path="/music" element={<ProtectedRoute><MusicPage/></ProtectedRoute>}/>
        <Route path="/mylist" element={<ProtectedRoute><MyListPage/></ProtectedRoute>}/>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />

        <Route path="/watch/:type/:id" element={<ProtectedRoute><Watch /></ProtectedRoute>}/>

        
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* <Route path="/series" element={<ProtectedRoute><Series /></ProtectedRoute>} /> */}

   
        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />

        <Route path="/out-of-region" element={<ErrorPage text='Service is only available in Ghana and Nigeria' />} />
        

        <Route path="*" element={<ErrorPage text='Page not found!' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
