import React, { useRef, useState, useEffect } from "react";
import "../../components/styles/banners/dynamicBanner.scss";
import Button from "../buttons/Button";
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
import Watch from "../../pages/watch";

const DynamicBanner = () => {
  // Track whether the video is playing
  const [isPlaying, setIsPlaying] = useState(false);
  // Track whether the play button overlay should be visible when video is playing
  const [showPlayButton, setShowPlayButton] = useState(false);
  // Ref to access the underlying VideoPlayer
  const bannerPlayerRef = useRef(null);
  // Ref for our timer so we can clear it if needed
  const [isMuted, setIsMuted] = useState(false);
  const timerRef = useRef(null);

  // Toggle play/pause and hide the button once play is toggled.
  const handlePlayToggle = () => {
    if (!isPlaying) {
      // Play video
      bannerPlayerRef.current?.playVideo();
      setIsPlaying(true);
      // Hide the button after starting playback
      setShowPlayButton(false);
    } else {
      // Pause video
      bannerPlayerRef.current?.pauseVideo();
      setIsPlaying(false);
      // Show the button (video is paused)
      setShowPlayButton(true);
    }
  };

  // When clicking the banner while the video is playing, show the play button overlay temporarily.
  const handleBannerClick = () => {
    if (isPlaying) {
      setShowPlayButton(true);
      // Clear any existing timer
      if (timerRef.current) clearTimeout(timerRef.current);
      // Hide the play button after 3 seconds
      timerRef.current = setTimeout(() => {
        setShowPlayButton(false);
      }, 3000);
    }
  };

    // Handler for the mute button on the dynamic banner
    const handleMuteDynamic = () => {
      if (bannerPlayerRef.current && bannerPlayerRef.current.toggleMute) {
        const newMute = bannerPlayerRef.current.toggleMute();
        setIsMuted(newMute);
      }
    };
  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section className="dynamic-banner-section" onClick={handleBannerClick}>
      {/* Hide the default video controls for the banner */}
      <Watch
        wcClassName="dynamic-banner-watch-container"
        ref={bannerPlayerRef}
        showControls={false}
      />

      <div className="dynamic-banner-overlay">
        <div className="banner-badge">
          <p className="banner-badge-text">Top Trending</p>
        </div>

        <div className="play-and-navigators-wrapper">
          <Button icon={arrowLeft} className="pan-arrow-left" page="/" />

          {/* Render the play button if either video is not playing OR if it's playing and showPlayButton is true */}
          {(!isPlaying || (isPlaying && showPlayButton)) && (
            <Button
              icon={isPlaying ? pauseIcon : playIcon}
              className="pan-play-btn"
              page="/"
              action={handlePlayToggle}
            />
          )}

          <Button icon={arrowRight} className="pan-arrow-right" page="/" />
        </div>

        <div className="banner-description-container">
          <div className="bdc-text-wrapper">
            <h1 className="bdc-header">War Room</h1>
            <p className="bdc-paragraph">
              With the help of remaining allies, the Avengers must assemble once
              more in order to undo Thanos's actions and undo the chaos to the
              universe, no matter what consequences may be in store...
            </p>
          </div>

          <div className="bdc-btns">
            <Button
              className="bdc-play-now-btn"
              label="Play Now"
              page="/"
              icon={playIcon}
              action={handlePlayToggle}
            />
            <Button
              className="bdc-information-circle-btn"
              label="More Info"
              page="/"
              icon={informationCircle}
            />
            <div className="bdc-icon-btns">
              <Button className="bdc-plus-btn" page="/" icon={plusIcon} />
              <Button className="bdc-like-btn" page="/" icon={likeIcon} />
              <Button className="bdc-mute-btn"  action={handleMuteDynamic} icon={isMuted ? unmuteIcon : muteIcon} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicBanner;
