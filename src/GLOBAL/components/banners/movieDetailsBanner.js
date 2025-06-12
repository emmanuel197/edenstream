import React, { useEffect, useState, useRef } from "react";
import "../../components/styles/banners/dynamicBanner.scss";
import Button from "../buttons/Button";
import ReactPlayer from "react-player";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { returnMovieDetails, fetchTrailer, updateWatchlist, removeWatchlist, fetchWatchlist, favoritedMovies, checkFavoritedStatus, addToFavorites } from "../../redux/fetchMoviesApi";
import { playIcon, pauseIcon, unmuteIcon, muteIcon, LikeIcon, plusIcon, minusIcon, NoStream } from "../../../utils/assets";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner";
import { ErrorComponent } from "../../pages/errorPage";

const MovieDetailsBanner = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [movieData, setMovieData] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const playerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [watchlisted, setWatchlisted] = useState(false);
  const watchlist = useSelector(state => state.fetchMovies.watchlist || []);
  const [favoritedStatus, setFavoritedStatus] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    setMovieData(null);
    setLoading(true);
    let isCurrent = true;
    const loadMovie = async () => {
      if (id) {
        try {
          const foundMovie = await returnMovieDetails(id);
          if (foundMovie && isCurrent) {
            setMovieData({
              ...foundMovie,
              imageUrl: foundMovie.image_store_id
                ? `https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${foundMovie.image_store_id}?accessKey=WkVjNWNscFhORDBLCg==`
                : null,
            });
          }
        } catch (error) {
          console.error("Error loading movie details banner:", error);
        } finally {
          if (isCurrent) setLoading(false);
        }
      }
    };
    loadMovie();
    return () => { isCurrent = false; };
  }, [id]);

  // Fetch watchlist on mount and when id changes
  useEffect(() => {
    fetchWatchlist(dispatch);
  }, [dispatch, id]);

  // Fetch favorited movies on mount
  useEffect(() => {
    favoritedMovies(dispatch).then(result => {
      console.log('favoritedMovies result:', result);
    });
  }, [dispatch]);

  // Check favorited status when movieData is loaded
  useEffect(() => {
    if (id) {
      checkFavoritedStatus(dispatch, id).then((isFav) => {
        setFavoritedStatus(isFav);
      });
    }
  }, [dispatch, id]);

  // Update watchlisted state when watchlist or movieData changes
  useEffect(() => {
    if (!movieData) return;
    const _ids = watchlist.map(item => item.movie_id);
    setWatchlisted(_ids.includes(movieData.id));
  }, [movieData, watchlist]);

  // Fetch trailer URL when movieData changes
  useEffect(() => {
    const loadTrailerUrl = async () => {
      if (movieData?.movieId || movieData?.id || movieData?.uid) {
        try {
          const url = await fetchTrailer(movieData.movieId || movieData.id || movieData.uid);
          setTrailerUrl(url);
          setIsUrlValid(!!url);
        } catch (error) {
          setIsUrlValid(false);
        }
      }
    };
    loadTrailerUrl();
  }, [movieData]);

  const handlePlayToggle = () => {
    if (!isPlayerReady) return;
    setIsPlaying((prev) => !prev);
  };

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded((prev) => !prev);
  };

  const handlePlayerReady = () => setIsPlayerReady(true);
  const handlePlayerStart = () => {};
  const handlePlayerError = () => setIsUrlValid(false);

  const handleToggleWatchlist = () => {
    if (!movieData) return;
    if (watchlisted) {
      removeWatchlist(movieData.id, 'movie');
    } else {
      updateWatchlist(movieData.id, 'movie', 0);
    }
    setWatchlisted(!watchlisted);
    // await fetchWatchlist(dispatch);
  };

  const handleLikeClick = async () => {
    const result = await addToFavorites(dispatch, id);
    // Update the favoritedStatus state based on the result of the API call
    if (result !== undefined) { // Check if the result is not undefined (operation completed)
      setFavoritedStatus(result); // result is true if added, false if removed
    }
  };

  if (loading) return <Spinner wrapperClass="spinner-wrapper" className="watch-spinner"/>;
  if (!movieData) return <ErrorComponent/>

  const truncatedDescription = movieData.description?.length > 150
    ? `${movieData.description.substring(0, 150)}...`
    : movieData.description;

  
    console.log("favorited_movie[movieDetailsBanner]", movieData.favorited)
  return (
    <section className="dynamic-banner-section">
      {trailerUrl && isUrlValid ? (
        <ReactPlayer
          ref={playerRef}
          className="react-player"
          url={trailerUrl}
          playing={isPlaying}
          muted={isMuted}
          controls={false}
          width="100%"
          height="100%"
          playsinline
          onReady={handlePlayerReady}
          onStart={handlePlayerStart}
          onError={handlePlayerError}
          config={{
            file: {
              attributes: {
                poster: movieData.imageUrl,
                preload: 'auto',
              },
              forceVideo: true,
            },
          }}
        />
      ) : (
        movieData.imageUrl && (
          <img
            src={movieData.imageUrl}
            alt={movieData.title}
            style={{ width: '100%', height: '100%', objectFit: 'fill', objectPosition: 'center' }}
          />
        )
      )}
      <div className="dynamic-banner-overlay">
        <div className="banner-badge">
          <p className="banner-badge-text">{movieData?.genre || 'Top Trending'}</p>
        </div>
        <div className="banner-description-container">
          <div className="bdc-text-wrapper">
            <h1 className="bdc-header">{movieData?.title}</h1>
            <p className="bdc-paragraph" onClick={toggleDescription}>
              {isDescriptionExpanded ? movieData?.description : truncatedDescription}
            </p>
          </div>
          <div className="bdc-btns">
            <Button
              className="bdc-play-now-btn"
              label="Play Now"
              icon={playIcon}
              action={() => navigate(`/watch/movie/${movieData?.uid}`, { state: { title: movieData?.title } })}
            />
            <div className="bdc-icon-btns">
              <Button 
                className={`bdc-plus-btn ${watchlisted ? 'active' : ''}`} 
                page="/" 
                icon={watchlisted ? minusIcon : plusIcon} 
                action={handleToggleWatchlist}
              />
              <Button className={`bdc-like-btn ${favoritedStatus && "liked"}`} action={() => handleLikeClick()} svg={<LikeIcon className={favoritedStatus && `liked`}/>} />
              <Button 
                className="bdc-mute-btn" 
                action={handleMuteToggle} 
                icon={isMuted ? unmuteIcon : muteIcon} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetailsBanner;