import React, { useRef, useState, useEffect } from "react";
import "../../components/styles/banners/dynamicBanner.scss";
import Button from "../buttons/Button";
import ReactPlayer from "react-player";
import { fetchBannerContent, fetchTrailer, fetchAllSeries } from "../../redux/fetchMoviesApi";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import getRandomIndexes from "../../../utils/getRandomIndexes";
import {
  arrowLeft,
  arrowRight,
  informationCircle,
  likeIcon,
  muteIcon,
  unmuteIcon,
  pauseIcon,
  playIcon,
  plusIcon
} from "../../../utils/assets";

const DUMMY_SLIDES = [
  {
    id: 'dummy1',
    title: 'War Room',
    description: 'With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos\'s actions and undo the chaos to the universe, no matter what consequences may be in store.',
    genre: 'Action',
    image_id: 'dummy_image_1',
    movieId: 'dummy1',
    imageUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1',
    type: 'movie',
    images: {
      POSTER: 'dummy_image_1'
    }
  },
  {
    id: 'dummy2',
    title: 'Black Panther',
    description: 'After the death of his father, T\'Challa returns home to the African nation of Wakanda to take his rightful place as king.',
    genre: 'Action',
    image_id: 'dummy_image_2',
    movieId: 'dummy2',
    imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26',
    type: 'movie',
    images: {
      POSTER: 'dummy_image_2'
    }
  },
  {
    id: 'dummy3',
    title: 'The Woman King',
    description: 'A historical epic inspired by true events that took place in The Kingdom of Dahomey, one of the most powerful states of Africa in the 18th and 19th centuries.',
    genre: 'Drama',
    image_id: 'dummy_image_3',
    movieId: 'dummy3',
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1',
    type: 'movie',
    images: {
      POSTER: 'dummy_image_3'
    }
  }
];

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

const DynamicBanner = ({ movieData: propMovieData, showControls = false, showSlides = true, bannerData }) => {
  const location = useLocation();
  const { inspiring } = useSelector((state) => state.fetchMovies);
  
  const [isPlaying, setIsPlaying] = useState(false);
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
  const playerRef = useRef(null);
  const timerRef = useRef(null);
  const movieDetailsFetched = useRef(false);

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

      console.log('Debug: Loading slides');
      console.log('Current path:', location.pathname);
      console.log('Inspiring data:', inspiring);
      
      try {
        if (location.pathname === "/series") {
          console.log('Debug: Fetching series data');
          const _allSeries = await fetchAllSeries();
          const randomSeriesIndexes = getRandomIndexes(_allSeries);
          const _allSlides = randomSeriesIndexes.map(index => _allSeries[index]);
          console.log('Debug: Series slides loaded:', _allSlides);
          
          if (_allSlides && _allSlides.length > 0) {
            setAllSlides(_allSlides);
            setSelectedMovie(_allSlides[0]);
            setMovieData(_allSlides[0]);
          } else {
            console.log('Debug: No series data, using dummy data');
            setAllSlides(DUMMY_SLIDES);
            setSelectedMovie(DUMMY_SLIDES[0]);
            setMovieData(DUMMY_SLIDES[0]);
          }
        } else {
          console.log('Debug: Using inspiring data');
          const slides = fetchDataForBannerSlider(inspiring);
          console.log('Debug: Inspiring slides:', slides);
          
          if (slides && slides.length > 0) {
            setAllSlides(slides);
            setSelectedMovie(slides[0]);
            setMovieData(slides[0]);
          } else {
            console.log('Debug: No inspiring data, using dummy data');
            setAllSlides(DUMMY_SLIDES);
            setSelectedMovie(DUMMY_SLIDES[0]);
            setMovieData(DUMMY_SLIDES[0]);
          }
        }
      } catch (error) {
        console.error('Error loading slides:', error);
        console.log('Debug: Error occurred, using dummy data');
        setAllSlides(DUMMY_SLIDES);
        setSelectedMovie(DUMMY_SLIDES[0]);
        setMovieData(DUMMY_SLIDES[0]);
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

  // Fetch banner content if no movieData is provided
  useEffect(() => {
    console.log('Debug: Checking data availability');
    console.log('propMovieData:', propMovieData);
    console.log('allSlides:', allSlides);
    console.log('currentIndex:', currentIndex);
    console.log('_setSelectedMovie function:', typeof _setSelectedMovie);

    const loadBannerContent = async () => {
      if (!propMovieData && !allSlides.length) {
        try {
          const bannerContent = await fetchBannerContent();
          console.log('Debug: Fetched banner content:', bannerContent);
          
          if (bannerContent) {
            setMovieData({
              title: bannerContent.title,
              description: bannerContent.description,
              imageUrl: bannerContent.image_store_id ? 
                `https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${bannerContent.image_store_id}?accessKey=WkVjNWNscFhORDBLCg==` : 
                null,
              genre: bannerContent.genre,
              movieId: bannerContent.content_id,
              type: bannerContent.vod_type?.toLowerCase()
            });
          } 
        } catch (error) {
          console.error('Error loading banner content:', error);
          console.log('Debug: Error in banner content, using dummy data');
          setAllSlides(DUMMY_SLIDES);
          setMovieData(DUMMY_SLIDES[0]);
        }
      } else if (allSlides.length) {
        setMovieData(allSlides[currentIndex]);
      } else {
        setMovieData(propMovieData);
      }
    };

    loadBannerContent();
  }, [propMovieData, allSlides, currentIndex]);

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

  if (!movieData) {
    return null;
  }

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
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )
      )}

      <div className="dynamic-banner-overlay">
        <div className="banner-badge">
          <p className="banner-badge-text">{movieData?.genre || 'Top Trending'}</p>
        </div>

        {/* Only show navigation if we don't have bannerData and showSlides is true */}
        {!bannerData && showSlides && (
          <div className="play-and-navigators-wrapper">
            <Button 
              icon={arrowLeft} 
              className="pan-arrow-left" 
              action={handlePrevious} 
            />

            {showPlayButton && (
              <Button
                icon={isPlaying ? pauseIcon : playIcon}
                className="pan-play-btn"
                action={handlePlayToggle}
              />
            )}

            <Button 
              icon={arrowRight} 
              className="pan-arrow-right" 
              action={handleNext} 
            />
          </div>
        )}

        {/* Show centered play button when showSlides is false */}
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
              page={`/watch/movie/${movieData?.uid}`}
              icon={playIcon}
              action={handlePlayToggle}
            />
            <Button
              className="bdc-information-circle-btn"
              label="More Info"
              page={`/movie/${movieData?.id}`}
              icon={informationCircle}
            />
            <div className="bdc-icon-btns">
              <Button 
                className={`bdc-plus-btn ${movieData?.isInWatchlist ? 'active' : ''}`} 
                page="/" 
                icon={plusIcon} 
              />
              <Button className="bdc-like-btn" page="/" icon={likeIcon} />
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
