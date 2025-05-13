import React from "react";
// import { ReactComponent as ArrowIcon } from "../../assets/arrow-right.svg"; // Import your arrow icon
import '../../components/styles/eden-streams-content-card.scss'
const EdenStreamsContentCard = ({ imageUrl, title, onClick, variant }) => {
  if (variant === "variant1") {
    
    return (
      <div className="content-card" onClick={onClick}>
        <div
          className="card-image-wrapper"
          // style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <img loading="lazy" className="card-image" src={imageUrl}/>
          <div className="image-overlay" />
        </div>
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
        </div>
      </div>
    );
  }
};

export default EdenStreamsContentCard;
