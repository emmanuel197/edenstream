import React from "react";
import "../components/styles/content-description.scss";
import { releasedYear, genresIcon, ratingsIcon, directorImage, musicAuthorImage } from "../../utils/assets";

const ContentDescriptionSecton = ({marginTop, marginBottom}) => {
  const badges = ["Family ", "Faith"]
  const castMembers = [
    { id: 1, name: "Dallas Jenkins", country: "USA", image: "/assets/alex-kendrick.png" },
    { id: 2, name: "Jonathan Roumie", country: "USA", image: "/assets/alex-kendrick.png" },
    { id: 3, name: "Elizabeth Tabish", country: "USA", image: "/assets/alex-kendrick.png" },
    { id: 4, name: "Shahar Isaac", country: "Israel", image: "/assets/alex-kendrick.png" },
    { id: 5, name: "Noah James", country: "USA", image: "/assets/alex-kendrick.png" },
    { id: 6, name: "Paras Patel", country: "USA", image: "/assets/alex-kendrick.png" },
   
  ];
  return (
    <section className="content-description-section" style={{marginTop: marginTop, marginBottom: marginBottom}}>
      <h3 className="cds-header">Description</h3>
      <p className="cds-paragraph">
        War Room (2015) is a powerful Christian drama that explores the
        importance of prayer in overcoming life’s struggles. The film follows
        Tony and Elizabeth Jordan, a couple facing a failing marriage. When
        Elizabeth meets Miss Clara, an elderly woman with a deep faith, she
        learns to fight for her family through strategic prayer in her dedicated
        "war room." As she strengthens her relationship with God, she discovers
        how prayer can transform lives, restore love, and bring victory in the
        battles of life. War Room is an inspiring story of faith, redemption,
        and the power of prayer.
      </p>
      <div className="release-genres-ratings-wrapper">
        <div className="release-year-wrapper">
          <div className="release-year-header-wrapper">
            <img
              className="release-year-header-icon"
              src={releasedYear}
              alt="release-year-header-icon"
            />
            <h4 className="release-year-header-text">Released Year</h4>
          </div>
          <p className="release-year-text">2022</p>
        </div>
        <div className="genres-wrapper">
          <div className="genres-header-wrapper">
            <img loading="lazy"  src={genresIcon} className="genres-header-icon" />
            <h4 className="genres-header-text">Genres</h4>
          </div>
          <div className="genres-badges-wrapper">
            {badges.map((badge) => {
              return <div className="genre-badge">{badge}</div>;
            })}
          </div>
        </div>
        <div className="ratings-wrapper">
          <img loading="lazy" className="ratings-icon" src={ratingsIcon} />
          <h4 className="ratings-text">Ratings</h4>
        </div>
      </div>
      <div className="director-music-wrapper">
        <div className="director-wrapper">
          <h4 className="director-header">Director</h4>
          <div className="director-container">
            <img loading="lazy" className="director-image" src={directorImage} />
            <div className="name-country-wrapper">
              <p className="director-name">Alex Kendrick</p>
              <p className="director-country">From USA</p>
            </div>
          </div>
        </div>
        <div className="music-wrapper">
          <h4 className="music-header">Music</h4>
          <div className="music-container">
            <img loading="lazy" className="music-author-image" src={musicAuthorImage} />
            <div className="name-country-wrapper">
              <p className="music-author-name">Stephen Kendrick</p>
              <p className="music-author-country">From USA</p>
            </div>
          </div>
        </div>
      </div>
      <div className="cast-wrapper">
        <h4 className="cast-header">Cast</h4>
        <div className="cast-cards-container">
          {castMembers.map((member)=> {
            return <div className="cast-card">
            <img loading="lazy" className="cast-img" src={member.image}/>
            <div className="cast-name-country-wrapper">
              <p className="cast-name">{member.name}</p>
              <p className="cast-country">{member.country}</p>
            </div>
          </div>
          })}
            
        </div>
      </div>
    </section>
  );
};

export default ContentDescriptionSecton;
