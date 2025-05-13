import Header from "../components/Header"
import Footer from "../components/Footer";
// import GenreTabs from '../components/home/GenreTabs'
import Reel from "../components/reels/Reel";
import DynamicBanner from "../components/banners/DynamicBanner";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { fetchGenres, fetchMovie } from "../redux/fetchMoviesApi";
// import { setActiveGenreTab } from "../redux/slice/genreTabSlice";
// import GenreMovies from "../components/GenreMovies";
import WantToAccess from "../components/WantToAccess";
import NewsletterSubscriptionSection from "../components/NewsletterSubscriptionSection.js"
const SeriesPage = () => {
    const dispatch = useDispatch()

    // useEffect(() => {
    //     const _setActiveGenreTab = (_genreTab = 'ALL') => dispatch(setActiveGenreTab(_genreTab))
    //     _setActiveGenreTab('ALL')
    //     fetchMovie(dispatch)
    //     fetchGenres(dispatch)
    // }, [dispatch])
    
    
    
   
  
    return (
        <>
            <main >
                <Header links={5} signup={1} />
                <DynamicBanner />
                <Reel title='Recommended  For You ' />
                <Reel title='New on Eden Streams' />
                <Reel title='Christian Comedy' />
                <Reel title=' African Christian Series' />
               <WantToAccess/>
               
                <NewsletterSubscriptionSection/>
                <Footer />

                {/* <Reel title='PAY PER VIEW' /> */}
            </main>

        </>
    )
}

export default SeriesPage

