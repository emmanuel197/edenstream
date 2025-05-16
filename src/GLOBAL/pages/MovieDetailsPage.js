import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from "../components/Header";
import DynamicBanner from "../components/banners/DynamicBanner";
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

    return (
        <>
            <main>
                <Header />
                <div className="inner-sections-wrapper">
                    <DynamicBanner />
                    <ContentDescriptionSecton marginTop="3.021vw" />
                    <ReviewSection marginTop="5.26vw"/>
                </div>
                <Footer />
            </main>
        </>
    );
};

export default MovieDetailsPage; 