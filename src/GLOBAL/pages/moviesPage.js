import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import WantToAccess from "../components/WantToAccess";
import NewsletterSubscriptionSection from "../components/NewsletterSubscriptionSection";
import Reel from "../components/reels/Reel";
import ContentDescriptionSecton from "../components/ContentDescription";
import ReviewSection from "../components/reviewSection";
import DynamicBanner from "../components/banners/DynamicBanner";
import SeasonsAndEpisodes from "../components/seasonsAndEpisodes";

const MoviesPage = () => {
    const filteredMovies = [{ id: 1,   name: "Angels Friends", poster: "/assets/adipurush.png"
                }, {id: 2, name:"Faith", poster: "/assets/jackie.png"},
                 {id: 3, name:"Faith", poster: "/assets/sincity.png", newEpisode: true},
                {id:4, name:"Faith Tv", poster: "/assets/faith.png"},
                {id:4, name:"Faith Tv", poster: "/assets/faith.png"}]
                
    return (
        <>
        <main>
        <Header />
        <div className="inner-sections-wrapper">
        <DynamicBanner/>
        <ContentDescriptionSecton 
        marginTop="3.021vw"
        />
        <ReviewSection marginTop="5.26vw"/>
        <SeasonsAndEpisodes/>
        <Reel title="Recommended For You" movies={filteredMovies} marginTop="3.385vw"/>
        <Reel title="New on Eden Streams" movies={filteredMovies} marginTop="2.604vw"/>
        <Reel title="African Christian" movies={filteredMovies} marginTop="2.604vw"/>
        <Reel title="American Christian Movie" movies={filteredMovies} marginTop="2.604vw"/>
        <WantToAccess marginTop="2.604vw"/>
        <NewsletterSubscriptionSection marginTop="5.052vw"/>
        </div>
       
        <Footer marginTop="7.813vw"/>
        </main>
       
        </>
    )
}

export default MoviesPage