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
    
    const imageId = movie?.image_id;
    const imageStoreId = movie?.image_store_id;
    const movie_image = movie?.image_id || movie?.image_store_id;
    const [channelInfo, setChannelInfo] = useState({});
  const [EPGInfo, setEPGInfo] = useState({
    start: "00:00",
    end: "00:00",
    title: ""
  });

 
    // Determine if the movie is in the watchlist
    const isWatchlisted = watchlist.some(
        (item) => item.movie_id === movie.id || (item.movie && item.movie.movie_id === movie.id)
    );
    useEffect(() => {
    const initFetchChannelInfo = async () => {
      const result = await fetchChannelInfo(movie.id)
      console.log(result)
      if (result !== null) {
        setChannelInfo(result);
      }
      
    };
    initFetchChannelInfo();
  }, [movie.id]);
  useEffect(() => {
    if (location === "/livetv") {
      const initSetDates = async () => setEPGInfo(getEPGInfo(movie.shows));
      initSetDates();
    }
  }, [location, movie.shows]);
    const handleToggleWatchlist = async (e, movieId) => {
        e.stopPropagation();
        if (isWatchlisted) {
            await removeWatchlist(movieId, 'movie');
            await fetchWatchlist(dispatch);
        }
    };

    // Conditional rendering for livetv type
    if (type === "livetv" && EPGInfo && channelInfo) {
        return (
            <div className="movie-card">
                {/* Wrap content in Link for Live TV */}
                <Link to={`/watch/live/${channelInfo?.uid}`}>
                    <div
                        className="mc-image-wrapper"
                        // Remove onClick handler here as Link handles navigation
                    >
                        <LazyLoadImage
                            className="mc-image"
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
                        <h3 className="mc-title">{movie.name || movie.title}</h3>
                    </div>
                </Link>
            </div>
        );
    }

    // Existing MovieCardComponent logic for other types
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
    if (type === "livetv" && EPGInfo && channelInfo) {
    console.log("Epg info", EPGInfo);
    console.log("Channel info", channelInfo);
    return (
      // channelInfo.image_stores[0].id !== undefined && 
      (<div className="movie-card">
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
              
            </div>
          </div>
        </Link>
      </div>)
    );
  }
    if (type === "search" || type === "genre-movies" || !type) {
        return <MovieCardComponent />;
    }

    return <MovieCardComponent />;
};

export default MovieCard;