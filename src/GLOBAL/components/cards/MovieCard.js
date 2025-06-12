import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { selectedMovieReducer } from "../../redux/slice/moviesSlice";
import { useHandleNavigation } from "../../components/navigationHelpers";
import Button from "../buttons/Button";
import { DeleteWatchlistIcon } from "../../../utils/assets";
import { fetchWatchlist, removeWatchlist } from "../../redux/fetchMoviesApi";
import "../../components/styles/movie-card.scss";
import { fetchChannelInfo } from "../../redux/channels";
import getEPGInfo from "../../../utils/getEPGInfo";
// Modify getImageSrc to accept type and channelInfo
export const getImageSrc = (movie_img, movie, type, channelInfo) => {
    if (type === "livetv" && channelInfo?.image_stores?.[0]?.id) {
        return `https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${channelInfo.image_stores[0].id}?accessKey=WkVjNWNscFhORDBLCg==`;
    } else if (movie_img) {
        return `https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie_img}?accessKey=WkVjNWNscFhORDBLCg==`;
    } else if (movie?.poster) {
        return movie?.poster;
    } else {
        return '/assets/word-of-god.png'; // fallback image
    }
};

// Add EPGInfo and channelInfo to props
const MovieCard = ({ movie, type, active }) => {
    const dispatch = useDispatch();
    const handleClick = useHandleNavigation(movie);
    const location = window.location.pathname;
    const { watchlist } = useSelector((state) => state.fetchMovies);

    console.log("MovieCard: Received movie prop", movie); // Log the movie prop
    console.log("MovieCard: Received type prop", type); // Log the type prop
    console.log("Movie shows", movie); // Log movie shows for debugging
    const imageId = movie?.image_id;
    const imageStoreId = movie?.image_store_id;
    const movie_image = movie?.image_id || movie?.image_store_id;
    const [channelInfo, setChannelInfo] = useState({});
    const [EPGInfo, setEPGInfo] = useState({
        start: "00:00",
        end: "00:00",
        title: ""
    });
    console.log("EPGInfo", EPGInfo);
    console.log("ChannelInfo", channelInfo);
    console.log("MovieCard movie", movie.shows);
    console.log("MovieCard type", type);
    console.log("MovieCard uid", channelInfo.uid);
    // Determine if the movie is in the watchlist
    const isWatchlisted = watchlist.some(
        (item) => item.movie_id === movie.id || (item.movie && item.movie.movie_id === movie.id)
    );
    useEffect(() => {
        const initFetchChannelInfo = async () => {
            console.log("MovieCard: Fetching channel info for ID", movie.id); // Log channel info fetch
            const result = await fetchChannelInfo(movie.id);
            console.log("MovieCard: Fetched channel info result", result); // Log fetched channel info
            if (result !== null) {
                setChannelInfo(result);
            }
        };
        // Only fetch channel info if type is livetv and movie.id exists
        if (type === "livetv" && movie.id) {
            initFetchChannelInfo();
        } else {
            console.log("MovieCard: Not fetching channel info (not livetv type or missing movie.id)");
        }
    }, [movie.id, type]); // Add type to dependency array
    useEffect(() => {
        if (location === "/livetv" && movie.shows) { // Check if movie.shows exists
            console.log("MovieCard: Setting EPG info for movie", movie.id); // Log EPG info setting
            const initSetDates = async () => setEPGInfo(getEPGInfo(movie.shows));
            initSetDates();
        } else {
            console.log("MovieCard: Not setting EPG info (not livetv page or missing movie.shows)");
        }
    }, [location, movie.shows]); // Add movie.shows to dependency array
    const handleToggleWatchlist = async (e, movieId) => {
        e.stopPropagation();
        if (isWatchlisted) {
            await removeWatchlist(movieId, 'movie');
            await fetchWatchlist(dispatch);
        }
    };

    // Conditional rendering for livetv type
    if (type === "livetv" && EPGInfo && channelInfo && channelInfo.image_stores) { // Add check for channelInfo.image_stores
        console.log("MovieCard: Rendering LiveTV card for movie", movie.id); // Log LiveTV render path
        console.log("Epg info", EPGInfo);
        console.log("Channel info", channelInfo);
        return (
            <div className="movie-card live-tv-movie-card">
                {/* Wrap content in Link for Live TV */}
                <Link className="movie-card-livetv" to={`/watch/live/${channelInfo?.uid}`}>
                    <div
                        className="mc-image-wrapper"
                        // Remove onClick handler here as Link handles navigation
                    >
                        <LazyLoadImage
                            className="mc-image livetv-movie-card"
                            // Pass type and channelInfo to getImageSrc
                            src={getImageSrc(movie_image, movie, type, channelInfo)}
                            alt={movie.name || movie.title}
                            width="100%"
                            placeholder={<div className="poster-img-placeholder"></div>}
                            effect="blur"
                            threshold={200}
                            key={movie.id}
                        />
                        <div className="image-overlay-wrapper">
                            {movie.newEpisode && <span className="new-episode-badge">New Episode</span>}
                            <div
                                className="delete-watch-history-wrapper"
                                onClick={(e) => handleToggleWatchlist(e, movie.id)}
                            >
                                {active === "Watch History" && <DeleteWatchlistIcon
                                    className={`delete-watch-history${isWatchlisted ? ' active' : ''}`}
                                />}
                            </div>
                        </div>
                    </div>
                    <div className="mc-content">
                        <h3 className="mc-title">{movie.name || movie.title || channelInfo.name}</h3>
                        <p className="epg">{EPGInfo.start} - {EPGInfo.end}</p>
                    </div>
                </Link>
            </div>
        );
    }

    // Existing MovieCardComponent logic for other types
    const MovieCardComponent = () => {
        console.log("MovieCard: Rendering standard MovieCardComponent for movie", movie.id); // Log standard render path
        return (
            <div className="movie-card live-tv-movie-card ">
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
                        className={`mc-image`}
                        // Pass type and channelInfo to getImageSrc (though they won't be used here)
                        src={getImageSrc(movie_image, movie)}
                        alt={movie.name || movie.title}
                        width="100%"
                        placeholder={<div className="poster-img-placeholder"></div>}
                        effect="blur"
                        threshold={200}
                        key={movie.id}
                    />
                    <div className="image-overlay-wrapper">
                        {movie.newEpisode && <span className="new-episode-badge">New Episode</span>}
                        <div
                            className="delete-watch-history-wrapper"
                            onClick={(e) => handleToggleWatchlist(e, movie.id)}
                        >
                            {active === "Watch History" && <DeleteWatchlistIcon
                                className={`delete-watch-history${isWatchlisted ? ' active' : ''}`}
                            />}
                        </div>
                    </div>
                </div>
                <div className="mc-content">
                    <h3 className="mc-title">
                        {movie.name || movie.title}
                    </h3>
                    
                </div>
            </div>
        );
    };

    // Conditional rendering based on type and data availability
    if (type === "livetv") {
        // Only render LiveTV card if EPG and channel info with image stores are available
        if (EPGInfo && channelInfo && channelInfo.image_stores) {
            console.log("MovieCard: Final render decision - LiveTV card");
            console.log("Epg info", EPGInfo);
            console.log("Channel info", channelInfo);
            return (
                <div className="movie-card live-tv-movie-card">
                    <Link to={`/watch/live/${channelInfo?.uid}`}>
                        <div className="movie-box">
                            <div className="poster-div">
                                {channelInfo.image_stores ? (
                                    <LazyLoadImage
                                        src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${channelInfo?.image_stores[0]?.id}?accessKey=WkVjNWNscFhORDBLCg==`}
                                        alt={movie.alt}
                                        className="livetv-movie-card"
                                        width="100%"
                                        placeholder={
                                            <div className="poster-img-placeholder livetv-poster-img-placeholder"></div>
                                        }
                                    />
                                ) : null}
                            </div>
                            <div className="card-text" style={{ marginTop: "5px" }}>
                                {/* Add EPG info here if needed */}
                            </div>
                        </div>
                    </Link>
                </div>
            );
        } else {
            // If type is livetv but info is missing (e.g., 404 on channelInfo), render nothing
            console.log("MovieCard: Final render decision - Not rendering LiveTV card due to missing info for movie", movie.id);
            return null; // Or <></>
        }
    } else if (type === "search" || type === "genre-movies" || !type) {
        console.log("MovieCard: Final render decision - Standard MovieCardComponent (search/genre/default)");
        return <MovieCardComponent />;
    } else {
        console.log("MovieCard: Final render decision - Standard MovieCardComponent (fallback)");
        return <MovieCardComponent />; // Fallback for any other type
    }
};

export default MovieCard;