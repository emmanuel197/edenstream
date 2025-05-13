import React from "react";
import "../../GLOBAL/components/styles/seasons-and-episodes.scss";
import { backToTop } from "../../utils/assets";
import {RwContentContainer} from "../components/reels/ReelWrapper";
import Button from "../components/buttons/Button";
const SeasonsAndEpisodes = () => {

  const seriesData = [
    {
      seasonNumber: 1,
      episodeCount: 9,
      episodes: [
        {
          id: 1,
          episode: 1,
          name: "Episode 1",
          poster: "/assets/adipurush.png",
        },
        {
          id: 2,
          episode: 2,
          name: "Episode 2",
          poster: "/assets/jackie.png",
        },
        {
          id: 3,
          episode: 3,
          name: "Episode 3",
          poster: "/assets/sincity.png",
        },
        {
          id: 4,
          episode: 4,
          name: "Episode 4",
          poster: "/assets/faith.png",
        },
        // ... add more episodes for season 1
      ],
    },
    {
      seasonNumber: 2,
      episodeCount: 5,
      episodes: [
        {
          id: 4,
          episode: 1,
          name: "Episode 1 (Season 2)",
          poster: "/assets/jackie.png",
        },  {
          id: 5,
          episode: 2,
          name: "Episode 2 (Season 2)",
          poster: "/assets/sincity.png",
        },
        {
          id: 3,
          episode: 3,
          name: "Episode 3",
          poster: "/assets/adipurush.png",
        },
        {
          id: 4,
          episode: 4,
          name: "Episode 4",
          poster: "/assets/faith.png",
        },
        // ... add more episodes for season 2
      ],
    },
    // ... add more seasons if needed
  ];

  

  return (
    <section className="seasons-and-episodes-section">
      <h2 className="sae-header">Seasons and Episodes</h2>
      <div className="series-wrapper">
        {seriesData.map(({ seasonNumber, episodeCount, episodes }, index) => (
          <>
          <div className="season-header" key={index}>
            <div className="season-no-episode-no">
              <h3 className="season-number">Season {seasonNumber}</h3>
              <p className="no-of-episodes">{episodeCount} Episodes</p>
            </div>
            <Button className="season-header-toggle" icon={backToTop} page="/"/>
            {/* <img loading="lazy" src={backToTop} className="season-header-toggle"/> */}
          </div>  
          <RwContentContainer movies={episodes}/></>
          
        ))}
        
      </div>
    </section>
  );
};

export default SeasonsAndEpisodes;
