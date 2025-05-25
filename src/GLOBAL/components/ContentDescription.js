import React from "react";
import "../components/styles/content-description.scss";
import { releasedYear, genresIcon, ratingsIcon, directorImage, musicAuthorImage } from "../../utils/assets";

const ContentDescriptionSecton = ({marginTop, marginBottom, movieDetails}) => {
  const badges = ["Family ", "Faith"]
 
  console.log('ContentDescriptionSecton movieDetails:', movieDetails);

  if (!movieDetails) {
    return null;
  }

  // Extract genres from movieDetails
  const genres = movieDetails.movie_genres ? movieDetails.movie_genres : [];
  const castMembers = movieDetails.cast ? movieDetails.cast.split(',') : [];
  const country = Array.isArray(movieDetails.country) ? movieDetails.country[0] : movieDetails.country;

  return (
    <section className="content-description-section" style={{ marginTop: marginTop, marginBottom: marginBottom }}>
      <h3 className="cds-header">Description</h3>
      <p className="cds-paragraph">
        {movieDetails.description}
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
          <p className="release-year-text">{movieDetails.year || 'N/A'}</p>
        </div>
        <div className="duration-wrapper">
          <div className="duration-header-wrapper">
            <h4 className="duration-header-text">Duration</h4>
          </div>
          <p className="duration-text">{movieDetails.duration || 'N/A'} mins</p>
        </div>
        <div className="country-wrapper">
          <div className="country-header-wrapper">
            <h4 className="country-header-text">Country</h4>
          </div>
          <p className="country-text">{country || 'N/A'}</p>
        </div>
        <div className="genres-wrapper">
          <div className="genres-header-wrapper">
            <img loading="lazy" src={genresIcon} className="genres-header-icon" alt="genres-icon" />
            <h4 className="genres-header-text">Genres</h4>
          </div>
          <div className="genres-badges-wrapper">
            {genres.map((genre, index) => (
              <div key={index} className="genre-badge">{genre}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="director-music-wrapper">
       {movieDetails.director && <div className="director-wrapper">
          <h4 className="director-header">Director</h4>
          <div className="director-container">
            {/* <img loading="lazy" className="director-image" src={directorImage} /> */}
            <div className="name-country-wrapper">
              <p className="director-name">{movieDetails.director}</p>
              {/* <p className="director-country">From USA</p> */}
            </div>
          </div>
        </div>}
        {/* <div className="music-wrapper">
          <h4 className="music-header">Music</h4>
          <div className="music-container">
            <img loading="lazy" className="music-author-image" src={musicAuthorImage} />
            <div className="name-country-wrapper">
              <p className="music-author-name">Stephen Kendrick</p>
              <p className="music-author-country">From USA</p>
            </div>
          </div>
        </div> */}
      </div>
      <div className="ratings-flex-wrapper">
        <div className="cast-wrapper critics-rating-wrapper">
          <h4 className="cast-header">Critics Rating</h4>
          <div className="ratings-wrapper">
            <img className="ratings-icon" src={ratingsIcon} alt="ratings-icon" />
            <h4 className="ratings-text rating-header-color">{movieDetails.critics_rating}</h4>
          </div>
        </div>
        <div className="cast-wrapper user-rating-wrapper">
          <h4 className="cast-header">User Rating</h4>
          <div className="ratings-wrapper">
            <img className="ratings-icon" src={ratingsIcon} alt="ratings-icon" />
            <h4 className="ratings-text rating-header-color">{movieDetails.user_rating}</h4>
          </div>
        </div>
      </div>
      <div className="cast-wrapper">
        <h4 className="cast-header">Cast</h4>
        <div className="cast-cards-container">
          {castMembers.map((member)=> {
            return <div className="cast-card">
            {/* <img loading="lazy" className="cast-img" src={member.image}/> */}
            <div className="cast-name-country-wrapper">
              <p className="cast-name">{member}</p>
              {/* <p className="cast-cossuntry">{member.country}</p> */}
            </div>
          </div>
          })}
            
        </div>
      </div>
    </section>
  );
};

export default ContentDescriptionSecton;
