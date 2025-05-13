import Header from "../components/Header"
import Footer from "../components/Footer";
import GenreTabs from '../components/home/GenreTabs'
import Reel from "../components/reels/Reel";
import DynamicBanner from "../components/banners/DynamicBanner";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActiveGenreTab } from "../redux/slice/genreTabSlice";
import "../components/styles/home.scss";

const Home = () => {
    const dispatch = useDispatch()

    const filteredMovies = [{ id: 1,   name: "Angels Friends", poster: "/assets/adipurush.png"
                }, {id: 2, name:"Faith", poster: "/assets/jackie.png"},
                 {id: 3, name:"Faith", poster: "/assets/sincity.png", newEpisode: true},
                {id:4, name:"Faith Tv", poster: "/assets/faith.png"}]

   const reelSections = [{reelTitle: "Continue Watching"}, {reelTitle:"Recommended For You"}, {reelTitle: "Live Tv"}, {reelTitle: "Movies"}, {reelTitle: "Series"}, {reelTitle: "Word"}, {reelTitle: "Music"}, {reelTitle: "Sermons"}, {reelTitle: "Devotionals"}, {reelTitle: "Lifestyle"}, {reelTitle: "Kids"}]

    return (
        <>
            <main >
                <Header links={5} signup={1} />
                <div className="inner-sections-wrapper">
                <DynamicBanner />
               {reelSections.map(({reelTitle}) => {
                    return <Reel title={reelTitle} movies={filteredMovies} marginTop="2.6042vw"/>
               })}
                </div>
             
                <br /><br />
                {/* <Reel title='MOST WATCHED' /> */}
                {/* <Reel title='TRENDING' />
                <Reel title='RECENTLY ADDED' />
                <Reel title='BINGE WORTHY' />
                <Reel title='NOSTALGIA' />
                <Reel title='ROMCOM' />
                <Reel title='OMG' />
                <Reel title='SUGGESTED MOVIES FOR YOU' />
                <Reel title='READY SET POPCORN' /> */}
       
                {/* <Reel title='COMING SOON' /> */}
                {/* <Reel title='AFRIPLAY LIVE' /> */}
                {/* <Reel title=''/> */}
                {/* <Reel title='MOST WATCHED' />
                <Reel title='RECENTLY ADDED' />
                <Reel title='AFRIPREMIERE' />
                <Reel title='COMING SOON' />
                <Reel title='AFRIPLAY LIVE' /> */}
                <Footer />

                {/* <Reel title='PAY PER VIEW' /> */}
            </main>

        </>
    )
}

export default Home

