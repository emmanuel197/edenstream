import React, { useEffect, useState, useRef } from "react";
import "../../components/styles/banners/dynamicBanner.scss";
import Button from "../buttons/Button";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { returnMovieDetails, fetchTrailer } from "../../redux/fetchMoviesApi";
import { playIcon, pauseIcon, unmuteIcon, muteIcon, likeIcon, plusIcon } from "../../../utils/assets";

const MovieDetailsBanner = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const playerRef = useRef(null);
  const [loading, setLoading] = useState(false);

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

  if (loading) return <div style={{minHeight: 300}}>Loading banner...</div>;
  if (!movieData) return <div style={{minHeight: 300}}>Movie not found.</div>;

  const truncatedDescription = movieData.description?.length > 150
    ? `${movieData.description.substring(0, 150)}...`
    : movieData.description;

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
              page={`/watch/movie/${movieData?.uid || movieData?.id}`}
              icon={playIcon}
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