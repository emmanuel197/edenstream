import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import { selectedMovieReducer } from "../../redux/slice/moviesSlice";
import { useHandleNavigation } from "../../components/navigationHelpers";
import "../../components/styles/movie-card.scss";

const MovieCard = ({ movie, type }) => {
    const dispatch = useDispatch();
    const handleClick = useHandleNavigation(movie);
    const location = window.location.pathname;
    
    const imageId = movie?.image_id;
    const imageStoreId = movie?.image_store_id;
    const movie_image = movie?.image_id || movie?.image_store_id;
    const getImageSrc = () => {
        if (movie_image) {
            return `https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie_image}?accessKey=WkVjNWNscFhORDBLCg==`;
        } else if (movie.poster) {
            return movie.poster;
        } else {
            return '/assets/word-of-god.png'; // fallback image
        }
    };

    const MovieCardComponent = () => (
        <div className="movie-card">
            <div
                className="mc-image-wrapper"
                onClick={() => {
                    dispatch(selectedMovieReducer(movie));
                    handleClick(
                        movie.type === "series"
                            ? `/series/${movie.id}`
                            : `/movie/${movie.id}`
                    );
                }}
            >
                <LazyLoadImage
                    className="mc-image"
                    src={getImageSrc()}
                    alt={movie.name || movie.title}
                    width="100%"
                    placeholder={<div className="poster-img-placeholder"></div>}
                    effect="blur"
                    threshold={200}
                    key={movie.id}
                />
                <div className="image-overlay-wrapper">
                    {movie.newEpisode && <span className="new-episode-badge">New Episode</span>}
                </div>
            </div>
            <div className="mc-content">
                <h3 className="mc-title">{movie.name || movie.title}</h3>
            </div>
        </div>
    );

    if (type === "search" || type === "genre-movies" || !type) {
        return <MovieCardComponent />;
    }

    return <MovieCardComponent />;
};

export default MovieCard;