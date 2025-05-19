import React, { useRef, forwardRef, useEffect } from "react";
import VideoPlayer from "../components/videoPlayer.js";
import { fetchPurchaseHistory } from "../redux/subscriptionApis";
import {
  fetchEpisodeInfo,
  fetchMovieVideo,
  fetchTrailer,
  sendPlayLogs,
  updateWatchlist
} from "../redux/fetchMoviesApi";
import "../../GLOBAL/components/styles/watch.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { updateWatchlist } from "../../redux/fetchMoviesApi.js"
import { useState } from "react";
// import { sendPlayLogs } from "../../redux/account";
import { createRef } from "react";
import { clearVideoReducer } from "../redux/slice/moviesSlice";

const testVideo = "https://www.w3schools.com/html/mov_bbb.mp4"; // For debugging

const Watch = forwardRef(({ wcClassName, showControls = true, videoUrl }, ref) => {
  const videoSrc = videoUrl;
  const posterImg = "/assets/banner-background-placeholder.png ";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const _ref = createRef();
  const { id, type } = useParams();
  const { video, selectedMovie } = useSelector((state) => state.fetchMovies);
  const { premiumSub } = useSelector((state) => state.fetchPackages);
  const [secondsPlayed, setSecondsPlayed] = useState(0);
  const [lengthWatchedInMs, setLengthWatchedInMs] = useState(0);
  const [showNextPopup, setShowNextPopup] = useState(false);
  const [nextEpisodeId, setNextEpisodeId] = useState("");
  const [nextEpisodeInfo, setNextEpisodeInfo] = useState({});
  const [isLiveTv, setIsLiveTv] = useState(true);
  const [trailer, setTrailer] = useState("");
  const [error, setError] = useState(null); // State to track errors
  const [loading, setLoading] = useState(true); // State to track loading
  const [retryTime, setRetryTime] = useState(0); // State to track retry time
  const [useTestVideo, setUseTestVideo] = useState(false); // For debugging

  console.log("Watch page video src:", video);

  useEffect(() => {
    dispatch(clearVideoReducer()); // Clear previous video
    const fetchData = async () => {
      try {
        await fetchPurchaseHistory(dispatch, 'Active');
        if (premiumSub) {
          fetchMovieVideo(dispatch, id, type);
        } else {
          const validId = !isNaN(+id) && id;
          const trailerData = await fetchTrailer(validId || selectedMovie || JSON.parse(localStorage.getItem('selectedMovie')));
          setTrailer(trailerData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dispatch, id, type, premiumSub, selectedMovie]);

  useEffect(() => {
    const route = location.pathname;
    if (route.substring(0, 12) === "/watch/live/") setIsLiveTv(true);
    else setIsLiveTv(false);
  }, [location.pathname]);

  const onNextPopupClick = () => {
    setShowNextPopup(false);
    navigate(`/watch/series/${nextEpisodeInfo.id}`);
  };

  // Only render VideoPlayer if video is a valid URL
  const isValidVideo = video && video !== "/" && video !== "undefined" && video !== undefined && video !== null;

  return (
    <div className={`watch-container ${wcClassName}`}>
      <div className="inner-sections-wrapper">
        {/* Debug button to test with a known-good video URL */}
        {/* <button onClick={() => setUseTestVideo((v) => !v)}>
          {useTestVideo ? "Use Real Video" : "Use Test Video"}
        </button> */}
        {isValidVideo || useTestVideo ? (
          <VideoPlayer
            ref={ref}
            src={useTestVideo ? testVideo : video}
            poster={posterImg}
            showControls={showControls}
          />
        ) : (
          <div style={{ color: 'white', textAlign: 'center', padding: '2em' }}>
            Loading video or no video available...
          </div>
        )}
      </div>
    </div>
  );
});

export default Watch;
