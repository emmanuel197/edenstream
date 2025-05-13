import React, { useRef, forwardRef } from "react";
import VideoPlayer from "../components/videoPlayer.js";
import "../../GLOBAL/components/styles/watch.scss";

const Watch = forwardRef(({ wcClassName, showControls = true }, ref) => {
  const videoSrc = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
  const posterImg = "/assets/banner-background-placeholder.png ";

  return (
    <div className={`watch-container ${wcClassName}`}>
      <div className="inner-sections-wrapper">
        {/* Pass the ref down to VideoPlayer */}
        <VideoPlayer
          ref={ref}
          src={videoSrc}
          poster={posterImg}
          showControls={showControls}
        />
      </div>
    </div>
  );
});

export default Watch;
