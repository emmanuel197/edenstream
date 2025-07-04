import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Button from "./buttons/Button";
import {
  playIcon,
  pauseIcon,
  muteIcon,
  unmuteIcon,
  rewind10,
  forward10,
  videoSettingsIcon,
  pictureInPicture,
  watchFullScreen,
  watchBackArrow,
  watchReplay
} from "../../utils/assets";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const VideoPlayer = forwardRef(
  (
    {
      src,
      poster,
      showControls = true, // <-- NEW prop to toggle overlay
      onTimeUpdate,
      onDurationChange,
      onVolumeChange,
      onPlay,
      onPause,
      movieTitle,
      loading,
      ...props
    },
    ref
  ) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      if (typeof window !== "undefined" && videoRef.current && !playerRef.current) {
        const player = videojs(videoRef.current, {
          autoplay: false,
          controls: false,
          responsive: true,
          fluid: true,
          sources: [{ src, type: "application/x-mpegURL" }],
          poster
        });
        playerRef.current = player;

        player.on("timeupdate", () => {
          const currentTime = player.currentTime();
          setCurrentTime(currentTime);
          onTimeUpdate?.(currentTime);
        });

        player.on("loadedmetadata", () => {
          const videoDuration = player.duration();
          setDuration(videoDuration);
          onDurationChange?.(videoDuration);
        });

        player.on("volumechange", () => {
          setMuted(player.muted());
          setVolume(player.volume());
          onVolumeChange?.(player.muted(), player.volume());
        });

        player.on("play", () => {
          setIsPlaying(true);
          onPlay?.();
        });

        player.on("pause", () => {
          setIsPlaying(false);
          onPause?.();
        });

        player.on("ended", () => {
          setVideoEnded(true);
        });
      }

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
      };
    }, [src, poster, onTimeUpdate, onDurationChange, onVolumeChange, onPlay, onPause]);

    // Expose imperative methods for the parent to control playback
    useImperativeHandle(ref, () => ({
      playVideo() {
        if (playerRef.current && playerRef.current.paused()) {
          playerRef.current.play();
        }
      },
      pauseVideo() {
        if (playerRef.current && !playerRef.current.paused()) {
          playerRef.current.pause();
        }
      },
      isPlaying: () => isPlaying,
      
      toggleMute() {
        if (playerRef.current) {
          const currentMute = playerRef.current.muted();
          const newMute = !currentMute;
          playerRef.current.muted(newMute);
          setMuted(newMute);
          return newMute;
        }
      },
      isMuted: () => muted,
    }));

    // Local event handlers for the custom controls (if shown)
    const handleVolumeChange = (e) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      if (playerRef.current) {
        playerRef.current.volume(newVolume);
        if (newVolume > 0) setMuted(false);
      }
    };

    const handleMuteChange = () => {
      if (playerRef.current) {
        const newMutedState = !muted;
        playerRef.current.muted(newMutedState);
        setMuted(newMutedState);
      }
    };

    const handlePlayPause = () => {
      if (playerRef.current) {
        if (playerRef.current.paused()) {
          playerRef.current.play();
        } else {
          playerRef.current.pause();
        }
      }
    };

    const handleRewind = () => {
      if (playerRef.current) {
        const newTime = Math.max(playerRef.current.currentTime() - 10, 0);
        playerRef.current.currentTime(newTime);
        setCurrentTime(newTime);
      }
    };

    const handleForward = () => {
      if (playerRef.current) {
        const newTime = Math.min(playerRef.current.currentTime() + 10, duration);
        playerRef.current.currentTime(newTime);
        setCurrentTime(newTime);
      }
    };

    const replay = () => {
      if (playerRef.current) {
        playerRef.current.currentTime(0);
        playerRef.current.play();
        setVideoEnded(false);
      }
    };

    const handleFullScreen = () => {
      if (playerRef.current) {
        if (playerRef.current.isFullscreen()) {
          playerRef.current.exitFullscreen();
        } else {
          playerRef.current.requestFullscreen();
        }
      }
    };

    const handleBackToLive = () => {
      if (playerRef.current) {
        // Jump to the live edge
        playerRef.current.currentTime(playerRef.current.seekable().end(0));
      }
    };

    // Seek by clicking on the progress bar
    const handleProgressBarClick = (e) => {
      if (!playerRef.current) return;
      const bar = e.target;
      const rect = bar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = clickX / rect.width;
      const newTime = percent * duration;
      playerRef.current.currentTime(newTime);
      setCurrentTime(newTime);
    };

    // Picture-in-Picture handler
    const handlePictureInPicture = () => {
      if (videoRef.current) {
        const videoEl = videoRef.current;
        if (videoEl.requestPictureInPicture) {
          videoEl.requestPictureInPicture();
        }
      }
    };

    const videoPlayerOverlayClassName = `video-player-overlay ${
      videoEnded ? "fade-out" : ""
    }`;

    return (
      <div data-vjs-player {...props}>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
        
        {/* Conditionally render the overlay controls based on `showControls` */}
        {showControls && (
          <div className={videoPlayerOverlayClassName}>
            <div className="watch-back-arrow-wrapper">
              <Button className="watch-back-arrow" action={() => navigate(-1)} icon={watchBackArrow} />
              <p className="watch-back-arrow-title">{movieTitle}</p>
              </div>
              {videoEnded && (
                <Button className="watch-replay" icon={watchReplay} action={replay} />
            )}

            {!videoEnded && (
              <>
                <div
                  className="progress-bar"
                 
                  onClick={handleProgressBarClick}
                >
                  <div
                    className="progress progress-bar-fill"
                    style={{
                      width: `${(currentTime / duration) * 100}%`,
                   
                      background: '#FFD36A',
                      borderRadius: '4px',
                      transition: 'width 0.1s linear',
                    }}
                  />
                </div>
                <div className="controls-wrapper">
                  <div className="left-controls">
                    <Button
                      className="rewind-10"
                      action={handleRewind}
                      icon={rewind10}
                    />
                    <Button
                      className="forward-10"
                      action={handleForward}
                      icon={forward10}
                    />
                    <Button
                      className="mute-unmute"
                      action={handleMuteChange}
                      icon={muted ? unmuteIcon : muteIcon}
                    />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="volume-slider"
                      style={{
                        background: `linear-gradient(to right, #F2CD70 ${
                          volume * 100
                        }%, #fff ${volume * 100}%)`
                      }}
                    />
                  </div>
                  <Button
                    className="watch-pause-play"
                    icon={isPlaying ? pauseIcon : playIcon}
                    action={handlePlayPause}
                  />
                  <div className="right-controls">
                    <div className="progress-timestamp">
                      {videojs.formatTime(currentTime)} / {videojs.formatTime(duration)}
                    </div>
                    <Button
                      className="pictureinpicture"
                      icon={pictureInPicture}
                      action={handlePictureInPicture}
                    />
                    <Button
                      className="video-settings-icon"
                      icon={videoSettingsIcon}
                      action={handlePlayPause}
                    />
                    <Button
                      className="watch-fullscreen"
                      icon={watchFullScreen}
                      action={handleFullScreen}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        {loading && <Spinner className="watch-spinner" />}
      </div>
    );
  }
);

export default VideoPlayer;
