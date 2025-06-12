import React, { useRef, useState, useEffect } from "react";
import "../../components/styles/banners/dynamicBanner.scss";
import Button from "../buttons/Button";
import ReactPlayer from "react-player";
import { fetchBannerContent, fetchTrailer, fetchAllSeries, checkFavoritedStatus, fetchWatchlist, addToFavorites } from "../../redux/fetchMoviesApi";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import getRandomIndexes from "../../../utils/getRandomIndexes";
import { updateWatchlist, removeWatchlist } from "../../redux/fetchMoviesApi";
import {
  arrowLeft,
  arrowRight,
  informationCircle,
  LikeIcon,
  muteIcon,
  unmuteIcon,
  pauseIcon,
  playIcon,
  plusIcon,
  minusIcon
} from "../../../utils/assets";
import Spinner from "../Spinner";

import { ErrorComponent } from "../../pages/errorPage";
const fetchDataForBannerSlider = (recentlyAdded) => {
  if (!recentlyAdded?.length) return [];

  const slides = [];
  const indexes = getRandomIndexes(recentlyAdded);

  indexes.forEach((index) => {
    const item = recentlyAdded[index];
    if (!slides.includes(item)) {
      slides.push(item);
    }
  });

  return slides;
};

const MAX_RETRIES = 3; // Define maximum retry attempts

const DynamicBanner = ({ movieData: propMovieData, showControls = false, showSlides = true, bannerData }) => {
  const location = useLocation();
  const { inspiring, watchlist } = useSelector((state) => state.fetchMovies);
  console.log("watchlist[DynamicBanner]", watchlist)
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [movieData, setMovieData] = useState(bannerData || propMovieData);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allSlides, setAllSlides] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchlisted, setWatchlisted] = useState(false);
  const [favoritedStatus, setFavoritedStatus] = useState(false);
  const [retryCount, setRetryCount] = useState(0); // State to track retry attempts
  const playerRef = useRef(null);
  const timerRef = useRef(null);
  const movieDetailsFetched = useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Update movieData when bannerData changes
  useEffect(() => {
    if (bannerData) {
      console.log('Debug: Using banner data from props:', bannerData);
      setMovieData(bannerData);
      setSelectedMovie(bannerData);
      // Don't set allSlides since we don't need navigation on details page
    }
  }, [bannerData]);

  // Load slides based on route and data source (only if no bannerData)
  useEffect(() => {
    const loadSlides = async () => {
      // If we have bannerData, don't load slides
      if (bannerData) {
        console.log('Debug: Using provided banner data, skipping slide load');
        return;
      }

      try {
        if (location.pathname === "/series") {
          console.log('Debug: Fetching series data');
          const _allSeries = await fetchAllSeries();
          const randomSeriesIndexes = getRandomIndexes(_allSeries);
          // Add imageUrl to each series
          const _allSlides = randomSeriesIndexes.map(index => {
            const item = _allSeries[index];
            return {
              ...item,
              imageUrl: item.image_id
                ? `https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${item.image_id}?accessKey=WkVjNWNscFhORDBLCg==`
                : null,
            };
          });
          console.log('Debug: Series slides loaded:', _allSlides);

          if (_allSlides && _allSlides.length > 0) {
            setAllSlides(_allSlides);
            setSelectedMovie(_allSlides[0]);
            setMovieData(_allSlides[0]);
          } else {
            console.log('Debug: No series data, using dummy data');
          }
        } else {
          console.log('Debug: Using inspiring data');
          // Add imageUrl to each inspiring movie
          const slides = fetchDataForBannerSlider(inspiring).map(movie => ({
            ...movie,
            imageUrl: movie.image_id
              ? `https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie.image_id}?accessKey=WkVjNWNscFhORDBLCg==`
              : null,
          }));
          console.log('Debug: Inspiring slides:', slides);

          if (slides && slides.length > 0) {
            setAllSlides(slides);
            setSelectedMovie(slides[0]);
            setMovieData(slides[0]);
          } else {
            console.log('Debug: No inspiring data, using dummy data');
          }
        }
      } catch (error) {
        console.error('Error loading slides:', error);
        console.log('Debug: Error occurred, using dummy data');
      }
    };

    loadSlides();
  }, [location.pathname, inspiring, bannerData]);

  // Handle navigation with proper state updates
  const handlePrevious = () => {
    console.log('Debug: handlePrevious called');
    console.log('Current slides:', allSlides);

    if (!allSlides.length) return;

    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? allSlides.length - 1 : prevIndex - 1;
      const nextMovie = allSlides[newIndex];
      if (nextMovie) {
        setMovieData(nextMovie);
        setSelectedMovie(nextMovie);
        movieDetailsFetched.current = false;
      }
      return newIndex;
    });
  };

  const handleNext = () => {
    console.log('Debug: handleNext called');
    console.log('Current slides:', allSlides);

    if (!allSlides.length) return;

    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === allSlides.length - 1 ? 0 : prevIndex + 1;
      const nextMovie = allSlides[newIndex];
      if (nextMovie) {
        setMovieData(nextMovie);
        setSelectedMovie(nextMovie);
        movieDetailsFetched.current = false;
      }
      return newIndex;
    });
  };

  useEffect(() => {
    let isMounted = true;
    const movieIdToCheck = movieData && (movieData.id || movieData.movieId);
    console.log('[FavoritedStatus Effect] movieData:', movieData);
    console.log('[FavoritedStatus Effect] movieIdToCheck:', movieIdToCheck);
    if (movieIdToCheck) {
      checkFavoritedStatus(dispatch, movieIdToCheck).then((isFav) => {
        // Only set if still mounted and movieId matches
        const currentMovieId = (movieData && (movieData.id || movieData.movieId));
        console.log('[FavoritedStatus Effect] checkFavoritedStatus resolved:', { movieIdToCheck, currentMovieId, isFav, isMounted });
        if (isMounted && String(movieIdToCheck) === String(currentMovieId)) {
          console.log('[FavoritedStatus Effect] Setting favoritedStatus:', isFav);
          setFavoritedStatus(isFav);
        } else {
          console.log('[FavoritedStatus Effect] Not setting favoritedStatus due to mismatch or unmounted.');
        }
      });
    } else {
      console.log('[FavoritedStatus Effect] No valid movieIdToCheck, setting favoritedStatus to false');
      setFavoritedStatus(false);
    }
    return () => { isMounted = false; };
  }, [dispatch, movieData]);

  // Fetch banner content if no movieData is provided
  useEffect(() => {
    console.log('Debug: Checking data availability');
    console.log('propMovieData:', propMovieData);
    console.log('allSlides:', allSlides);
    console.log('currentIndex:', currentIndex);
    console.log('_setSelectedMovie function:', typeof _setSelectedMovie);

    const loadBannerContent = async () => {
      if (!propMovieData && !allSlides.length) {
        if (retryCount >= MAX_RETRIES) {
          console.error('Max retries reached for loading banner content.');
          return;
        }
        try {
          const bannerContent = await fetchBannerContent();
          if (inspiring && inspiring.length > 0) {
            const firstInspiring = inspiring[0];
            setMovieData({
              uid: firstInspiring.uid,
              title: firstInspiring.title,
              description: firstInspiring.description,
              imageUrl: firstInspiring.image_id ?
                `https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${firstInspiring.image_id}?accessKey=WkVjNWNscFhORDBLCg==` :
                null,
              genre: firstInspiring.genre,
              movieId: firstInspiring.id,
              type: firstInspiring.type?.toLowerCase()
            });
            if (retryCount > 0) setRetryCount(0);
          } else {
            console.log('fetchBannerContent succeeded, but inspiring data is empty.');
          }
        } catch (error) {
          console.error(`Error loading banner content (Attempt ${retryCount + 1}/${MAX_RETRIES}):`, error);
          setRetryCount(prevCount => prevCount + 1);
          setTimeout(loadBannerContent, 2000);
        }
      } else if (allSlides.length) {
        setMovieData(allSlides[currentIndex]);
        if (retryCount > 0) setRetryCount(0);
      } else {
        setMovieData(propMovieData);
        if (retryCount > 0) setRetryCount(0);
      }
    };

    loadBannerContent();
  }, [propMovieData, allSlides, currentIndex, inspiring, watchlist, retryCount]);

  // Fetch trailer URL when movieData changes
  useEffect(() => {
    const loadTrailerUrl = async () => {
      if (movieData?.movieId) {
        try {
          const url = await fetchTrailer(movieData.movieId);
          console.log('Fetched trailer URL:', url);
          setTrailerUrl(url);
          setIsUrlValid(!!url);
        } catch (error) {
          console.error('Error fetching trailer URL:', error);
          setIsUrlValid(false);
        }
      }
    };

    loadTrailerUrl();
  }, [movieData?.movieId]);

  // Toggle play/pause
  const handlePlayToggle = () => {
    if (!isPlayerReady) {
      console.log('Player not ready yet');
      return;
    }

    console.log('Play button clicked');
    console.log('Current isPlaying state:', isPlaying);

    if (playerRef.current) {
      const player = playerRef.current.getInternalPlayer();
      console.log('Player internal state:', {
        player,
        playing: isPlaying,
      });
    }

    setIsPlaying(!isPlaying);
    setShowPlayButton(isPlaying); // Show play button when paused
  };

  // Handle banner click for showing/hiding controls
  const handleBannerClick = () => {
    setShowPlayButton(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowPlayButton(false);
      }
    }, 3000);
  };

  // Handle mute toggle
  const handleMuteDynamic = () => {
    setIsMuted(!isMuted);
  };

  // Toggle description expansion
  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  // Handle scroll to pause video when out of view
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 350;
      if (window.scrollY < scrollThreshold) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Debug player events
  const handlePlayerReady = () => {
    console.log('Player ready');
    setIsPlayerReady(true);
  };

  const handlePlayerStart = () => {
    console.log('Player started');
    setShowPlayButton(false);
  };

  const handlePlayerError = (error) => {
    console.error('Player error:', error);
    setIsPlayerReady(false);
    setIsUrlValid(false);
  };

  // Render slide indicators (only if no bannerData)
  const renderSlideIndicators = () => {
    if (bannerData || !allSlides?.length) return null;

    return (
      <div className="slide-indicators-container">
        {allSlides
          .filter((movie) => movie?.image_id !== undefined)
          .map((_, index) => (
            <div
              key={index}
              className={`slide-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setCurrentIndex(index);
                const selectedMovie = allSlides[index];
                if (selectedMovie) {
                  setMovieData(selectedMovie);
                  setSelectedMovie(selectedMovie);
                  movieDetailsFetched.current = false;
                }
              }}
            >
              <div className="indicator-line"></div>
            </div>
          ))}
      </div>
    );
  };

  // Add watchlist effect
  useEffect(() => {
    if (!movieData) return;
    const movieIdToCheck = movieData.id || movieData.movieId;
    const watchlistIds = watchlist.map(item =>
      item.movie_id || (item.movie && item.movie.movie_id)
    );
    setWatchlisted(watchlistIds.map(String).includes(String(movieIdToCheck)));
  }, [movieData, watchlist]);

  // Add watchlist toggle handler
  const handleToggleWatchlist = () => {
    if (!movieData) return;
     const movieId = movieData.id || movieData.movieId;
    if (watchlisted) {
      removeWatchlist(movieId, 'movie');
    } else {
      updateWatchlist(movieId, 'movie', 0);
    }
    setWatchlisted(!watchlisted);
  };

  // Fetch watchlist on mount
  useEffect(() => {
    fetchWatchlist(dispatch);
  }, [dispatch]);

  // Add handleLikeClick function
  const handleLikeClick = async () => {
    if (!movieData) return;
    const movieId = movieData.id || movieData.movieId;
    if (movieId) {
      const result = await addToFavorites(dispatch, movieId);
      // Update the favoritedStatus state based on the result of the API call
      if (result !== undefined) { // Check if the result is not undefined (operation completed)
        setFavoritedStatus(result); // result is true if added, false if removed
      }
    }
  };

  if (loading) return <Spinner wrapperClass="spinner-wrapper" className="watch-spinner"/>;
  if (!movieData) return <ErrorComponent/>

  const truncatedDescription = movieData.description?.length > 150
    ? `${movieData.description.substring(0, 150)}...`
    : movieData.description;

  console.log('Render state:', {
    isPlaying,
    showPlayButton,
    isUrlValid,
    isPlayerReady,
    trailerUrl,
    currentIndex,
    totalMovies: allSlides.length
  });

  return (
    <section className="dynamic-banner-section" onClick={handleBannerClick}>
      {trailerUrl && isUrlValid ? (
        <ReactPlayer
          ref={playerRef}
          className="react-player"
          url={trailerUrl}
          playing={isPlaying}
          muted={isMuted}
          controls={showControls}
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
                preload: 'auto'
              },
              forceVideo: true
            }
          }}
        />
      ) : (
        movieData.imageUrl && (
          <img
            src={movieData.imageUrl}
            alt={movieData.title}
            style={{ width: '100%', height: '100%', objectFit: 'fill', objectPosition: 'center', }}
          />
        )
      )}

      <div className="dynamic-banner-overlay">
        {!bannerData && showSlides && (
          <div className={`play-and-navigators-wrapper ${allSlides.length <= 1 ? 'center-play' : ''}`}>
            {allSlides.length > 1 && (
              <Button
                icon={arrowLeft}
                className="pan-arrow-left"
                action={handlePrevious}
              />
            )}

            {showPlayButton && (
              <Button
                icon={isPlaying ? pauseIcon : playIcon}
                className="pan-play-btn"
                action={handlePlayToggle}
              />
            )}

            {allSlides.length > 1 && (
              <Button
                icon={arrowRight}
                className="pan-arrow-right"
                action={handleNext}
              />
            )}
          </div>
        )}

        {!bannerData && !showSlides && showPlayButton && (
          <div className="play-and-navigators-wrapper center-play">
            <Button
              icon={isPlaying ? pauseIcon : playIcon}
              className="pan-play-btn"
              action={handlePlayToggle}
            />
          </div>
        )}

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
              action={() => navigate(`/watch/movie/${movieData?.uid}`, { state: { title: movieData?.title } })}
              icon={playIcon}
            />
            <Button
              className="bdc-information-circle-btn"
              label="More Info"
              page={`/movie/${movieData?.id}`}
              icon={informationCircle}
            />
            <div className="bdc-icon-btns">
              <Button
                className={`bdc-plus-btn ${watchlisted ? 'active' : ''}`}
                action={() => handleToggleWatchlist(movieData.id)}
                icon={watchlisted ? minusIcon : plusIcon}
              />
              <Button
                className={`bdc-like-btn${favoritedStatus ? ' liked' : ''}`}
                action={handleLikeClick}
                svg={<LikeIcon className={favoritedStatus ? 'liked' : ''} />}
              />
              <Button
                className="bdc-mute-btn"
                action={handleMuteDynamic}
                icon={isMuted ? unmuteIcon : muteIcon}
              />
            </div>
          </div>
        </div>

        {showSlides && !bannerData && renderSlideIndicators()}
      </div>
    </section>
  );
};

export default DynamicBanner;