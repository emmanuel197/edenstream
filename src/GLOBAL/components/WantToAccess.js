import React from "react";
import "../components/styles/want-to-access.scss";
import Button from "./buttons/Button";
const WantToAccess = ({ marginTop, marginBottom }) => {
  return (
    <>
      <section className="want-to-access-section" style={{marginTop: marginTop, marginBottom: marginBottom}}>
        <div className="fade-out-top"/>
        <div className="wta-content-container">
        <div className="wta-header-wrapper">
          <h2 className="want-to-access-section-header">
            Want to Access All Movies and Channels?
          </h2>
          <p className="want-to-access-section-paragraph">
            Unlock unlimited access to our full library of faith-based movies,
            sermons, worship services, and more. Subscribe now and enjoy all the
            content you love, anytime, anywhere!
          </p>
        </div>
        <Button
          className="wta-get-started-button"
          label="Get Started"
          page="/"
        />
        </div>
        <div className="fade-out-bottom"/>
      </section>
    </>
  );
};

export default WantToAccess;
