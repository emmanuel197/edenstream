import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from "../components/Header";
import MovieDetailsBanner from "../components/banners/movieDetailsBanner";
import ContentDescriptionSecton from "../components/ContentDescription";
import ReviewSection from "../components/reviewSection";
import Footer from "../components/Footer";
import { fetchMovieDetails } from '../redux/fetchMoviesApi';

const MovieDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { movieDetails, loading } = useSelector(state => state.fetchMovies);

    useEffect(() => {
        if (id) {
            fetchMovieDetails(dispatch, id);
        }
    }, [dispatch, id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Transform movie details for the banner
    const bannerData = movieDetails ? {
        title: movieDetails.title,
        description: movieDetails.description,
        imageUrl: movieDetails.image_store_id ? 
            `https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movieDetails.image_store_id}?accessKey=WkVjNWNscFhORDBLCg==` : 
            null,
        
        duration: movieDetails.duration,
        year: movieDetails.year,
        genre: movieDetails.genre,
        trailerUrl: movieDetails.trailer_url,
        isInWatchlist: movieDetails.is_in_watchlist,
        movieId: movieDetails.id,
        type: movieDetails.type
    } : null;

    return (
        <>
            <main>
                <Header />
                <div className="inner-sections-wrapper">
                    <MovieDetailsBanner />
                    <ContentDescriptionSecton 
                        marginTop="3.021vw" 
                        marginBottom="5.021vw"
                        movieDetails={movieDetails}
                    />
                    <ReviewSection 
                        marginTop="5.26vw"
                        movieId={id}
                    />
                </div>
                <Footer />
            </main>
        </>
    );
};

export default MovieDetailsPage; 