import React, { useState } from "react";
import "../components/styles/channels-section.scss";
import { NoStream } from "../../utils/assets";
import { RwContentContainer } from "./reels/ReelWrapper";

const ChannelsSection = () => {
  const rwacItems = [
    { id: 1, rwacLabel: "Recently Watched Channels" },
    { id: 2, rwacLabel: "All Channels" }
  ];
  const [rwacSelected, setRwacSelected] = useState(1);

  const handleRwacSelected = (id) => {
    setRwacSelected(id);
  };

  // Sample recently watched movies
  const recentlywatched = [
    { id: 1, name: "Angels Friends", poster: "/assets/adipurush.png" },
    { id: 2, name: "Faith", poster: "/assets/jackie.png" },
    { id: 3, name: "Faith", poster: "/assets/sincity.png", newEpisode: true },
    { id: 4, name: "Faith Tv", poster: "/assets/faith.png" }
  ];

  return (
    <div className="channels-section">
      <div className="recentlywatched-allchannels-wrapper">
        {rwacItems.map(({ id, rwacLabel }) => {
          return (
            <p
              key={id}
              className={`rw-ac-item ${rwacSelected === id ? "selected" : ""}`}
              onClick={() => handleRwacSelected(id)}
            >
              {rwacLabel}
            </p>
          );
        })}
      </div>
      {rwacSelected === 1 ? (
        recentlywatched.length > 0 ? (
          <Recentlywatched movies={recentlywatched} />
        ) : (
          <NoRecentlyWatched />
        )
      ) : (
        <AllChannels movies={recentlywatched}/>
      )}
    </div>
  );
};

export default ChannelsSection;

const NoRecentlyWatched = () => {
  return (
    <div className="no-recently-watched">
      <NoStream className="no-recently-watched-img" />
      <p className="no-recently-watched-text">
        No content available. Watch new channels for it to show here.
      </p>
    </div>
  );
};

const Recentlywatched = ({ movies }) => {
  return (
    <div className="recently-watched inner-sections-wrapper">
      <RwContentContainer marginTop="clamp(20px, 2.2917vw, 44.0006px)" movies={movies}  isChannelsSection={true}/>
    </div>
  );
};

const AllChannels = ({movies}) => {
  // You can customize this component to display a list of all channels.
  return (
    <div className="all-channels inner-sections-wrapper">
       <RwContentContainer marginTop="2.2917vw" movies={movies} isChannelsSection={true}/>
    </div>
  );
};
