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
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, fetchMovie } from "../redux/fetchMoviesApi";
import { setActiveGenreTab } from "../redux/slice/genreTabSlice";
import GenreTabs from '../components/home/GenreTabs';
import GenreMovies from "../components/GenreMovies";

const MoviesPage = () => {
    const dispatch = useDispatch();
    
    // Get all state from Redux store
    const moviesState = useSelector(state => state.fetchMovies);
    const { loading } = moviesState;

    useEffect(() => {
        const _setActiveGenreTab = (_genreTab = 'ALL') => dispatch(setActiveGenreTab(_genreTab));
        _setActiveGenreTab('ALL');
        fetchGenres(dispatch);
    }, [dispatch]);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                await fetchMovie(dispatch);
                console.log('Movies fetched successfully');
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        loadMovies();
    }, [dispatch]);

    // Create reel sections from categories
    const reelSections = Object.entries(moviesState.moviesByCategories || {})
        .map(([categoryUid, _]) => ({
            reelTitle: categoryUid.toUpperCase(),
            movies: moviesState[categoryUid.toLowerCase()] || []
        }))
        .filter(section => section.movies && section.movies.length > 0);

    return (
        <>
            <main style={{ background: '#1a052b' }}>
                <Header links={5} signup={1} />
                <div className="inner-sections-wrapper">
                    <DynamicBanner />
                    <GenreTabs />
                    <GenreMovies />
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        reelSections.map(({reelTitle, movies}) => (
                            <Reel 
                                key={reelTitle}
                                title={reelTitle} 
                                movies={movies} 
                                marginTop="2.6042vw"
                            />
                        ))
                    )}
                    <WantToAccess marginTop="2.604vw"/>
                    <NewsletterSubscriptionSection marginTop="5.052vw"/>
                </div>
                <Footer marginTop="7.813vw"/>
            </main>
        </>
    );
};

export default MoviesPage;