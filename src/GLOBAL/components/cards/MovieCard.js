import { useEffect, useState } from "react";
import { DeleteWatchHistory, mcPlayVector } from "../../../utils/assets";
import "../../components/styles/movie-card.scss";
import { useLocation } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const MovieCard = ({movie, className}) => {
    const isLive = false;
    const startsIn = false;
    const type = movie.type || "series";
    const location = useLocation();
    const titleClassName = `${isLive && "mc-content-bg"} ${type === "series" && "episode-title"} mc-content`;
    const imageOverlayWrapperClassName = `${startsIn && "starts-in-bg"} image-overlay-wrapper`;
    const movieCardClassName = `movie-card moviecard-${location.pathname && location.pathname.slice(1)}`;

    return (
        <>
            <div className={movieCardClassName}>
                <div className="mc-image-wrapper">
                    <LazyLoadImage
                        className="mc-image"
                        src={movie.poster}
                        alt={movie.name}
                        width="100%"
                        placeholder={<div className="poster-img-placeholder"></div>}
                        effect="blur"
                        threshold={200}
                        key={movie.id}
                    />
                    <div className={imageOverlayWrapperClassName}>
                        <img loading="lazy" src={mcPlayVector} className="image-overlay-vector"/>
                        {location.pathname === "/profile" && <DeleteWatchHistory className="delete-watch-history"/>}
                        {startsIn && 
                            <div className="starts-in-text">
                                <p className="starts-in-paragraph">🔴Live Sermon: "Faith & Miracles"</p>
                                <span className="starts-in-time">⏳Starts in: 02:12:45:30</span>
                            </div>
                        }
                        {movie.newEpisode && <span className="new-episode-badge">New Episode</span>}
                    </div>
                </div>
                <div className={titleClassName}>
                    <h3 className="mc-title">{movie.name}</h3>
                </div>
            </div>
        </>
    );
};

export default MovieCard;