import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import WantToAccess from "../components/WantToAccess";
import NewsletterSubscriptionSection from "../components/NewsletterSubscriptionSection";
import Reel from "../components/reels/Reel";
import ContentDescriptionSecton from "../components/ContentDescription";
import ReviewSection from "../components/reviewSection";
import DynamicBanner from "../components/banners/DynamicBanner";
import ChannelsSection from "./channelsSection";
const LiveTvPage = () => {
    const filteredMovies = [{ id: 1,   name: "Angels Friends", poster: "/assets/adipurush.png"
                }, {id: 2, name:"Faith", poster: "/assets/jackie.png"},
                 {id: 3, name:"Faith", poster: "/assets/sincity.png", newEpisode: true},
                {id:4, name:"Faith Tv", poster: "/assets/faith.png"}]
    return (
        <>
        <main>
        <Header />
        {/* <div className="inner-sections-wrapper">
        <DynamicBanner/>
        <ContentDescriptionSecton 
        marginTop="3.625rem"
        />
        <ReviewSection marginTop="6.3125rem"/>
        <Reel title="Recommended For You" movies={filteredMovies} marginTop="4.0625rem"/>
        <Reel title="New on Eden Streams" movies={filteredMovies} marginTop="3.125rem"/>
        <Reel title="African Christian" movies={filteredMovies} marginTop="3.125rem"/>
        <Reel title="American Christian Movie" movies={filteredMovies} marginTop="3.125rem"/>
        </div>
        
        <WantToAccess/>
        <NewsletterSubscriptionSection marginTop="6.0625rem"/> */}
        <ChannelsSection/>
        <Footer marginTop="9.375rem"/>
        </main>
       
        </>
    )
}

export default LiveTvPage


