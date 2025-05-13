import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const BannerBackground = ({
  muted,
  bannerImg,
  _trailer,
  _onPlayTrailer,
  _bannerContent,
}) => {
  const [onPlayTrailer, setOnPlayTrailer] = useState(_onPlayTrailer);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Handle scroll locally, only affecting the BannerBackground
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 350) setIsPlaying(true);
      else setIsPlaying(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to render the banner image
  const bannerImgRender = () => (
    <div className="hero-player-container">
      <img
        src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${bannerImg}?accessKey=WkVjNWNscFhORDBLCg==`}
        alt={_bannerContent?.title}
        className="dynamic-landing-banner"
        width="100%"
        height="100%"
      />
    </div>
  );

  // Handle the case when _trailer is undefined or there is an error
  if (onPlayTrailer && _trailer && !hasError) {
    return (
      <div className="hero-player-container">
        {/* Show the banner image while the player is not ready */}
        {!isPlayerReady && bannerImgRender()}
        <ReactPlayer
          height="100%"
          width="100%"
          className="react-player"
          url={_trailer}
          playing={isPlaying}
          muted={muted}
          autoPlay={true}
          controls={false}
          onReady={() => setIsPlayerReady(true)}
          onError={() => {
            // Catch any playback error and fall back to the banner image
            setHasError(true);
            setIsPlayerReady(false);
            setOnPlayTrailer(false);
          }}
          onEnded={() => {
            setIsPlayerReady(false);
            setOnPlayTrailer(false);
          }}
        />
      </div>
    );
  } else if (bannerImg) {
    return bannerImgRender();
  }
  return null;
};

export default BannerBackground;
