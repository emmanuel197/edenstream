import React, {useState} from "react";
import { Link } from "react-router-dom";
import {
  facebook,
  twitter,
  instagram,
  linkedIn,
  youtube,
  logoSrc,
  appleDownload,
  googlePlayDownload,
  playIcon,
  backToTop
} from "../../utils/assets";
import "./styles/Footer.scss";

// import { ReactComponent as AppStore } from "../../assets/app-store.svg";
// import { ReactComponent as PlayStore } from "../../assets/play-store.svg";
// import { ReactComponent as ArrowUp } from "../../assets/arrow-up.svg";

const Footer = ({marginTop, marginBottom}) => {
  const [selectedPlatform, setSelectedPlatform] = useState(null); // Track only one selected


  const footerLinks = {
    home: ["Featured", "Movies", "Word", "Music", "Live TV", "Live Radio"],
    support: ["Contact", "FAQs"],
    subscription: ["Plans", "Features"]
  };

  const socialLinks = [
    "facebook",
    "instagram",
    "linkedIn",
    "twitter",
    "youtube"
  ];
  const socialIcons = { facebook, instagram, linkedIn, twitter, youtube };

  const handleSelect = (platform) => {
    setSelectedPlatform(platform === selectedPlatform ? null : platform); // Deselect if clicked again
  };
  return (
    <footer className="footer" style={{marginTop: marginTop, marginBottom: marginBottom}}>
      <div className="footer-wrapper">
        {/* Main Footer Content */}
    <div className="footer-main">
          {/* Logo and Description Column */}
          <div className="footer-column logo-column">
            <div className="logo-container">
              <div className="logo-header-wrapper">
                <img
                  src={logoSrc}
                  alt="EdenStream logo"
                  className="logo-image"
                />
                
              </div>
              <p className="logo-description">
                Aliquam monous Igula est, non guivine elit. Conveille me. Donec
                mette odio sit.
              </p>
            </div>
            <div className="social-links-container">
              {socialLinks.map((platform) => (
                <a
                  key={platform}
                  href={`https://${platform}.com/edenstream`}
                  className={`social-link ${platform} ${selectedPlatform === platform ? "selected" : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSelect(platform)}
                >
                  <img loading="lazy" className="platform-img" src={socialIcons[platform]} alt={`${platform} icon`} />
                </a>
              ))}
            </div>
          </div>

          {/* Home Links Column */}
          <div className="footer-column">
            <h4 className="column-title">HOME</h4>
            <ul className="footer-links">
              {footerLinks.home.map((link) => (
                <li key={link}>
                  <Link className="footer-link" to={`/${link.toLowerCase().replace(" ", "-")}`}>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links Column */}
          <div className="footer-column">
            <h4 className="column-title">SUPPORT</h4>
            <ul className="footer-links">
              {footerLinks.support.map((link) => (
                <li key={link}>
                  <Link className="footer-link" to={`/${link.toLowerCase()}`}>{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscription Links Column */}
          <div className="footer-column">
            <h4 className="column-title">SUBSCRIPTION</h4>
            <ul className="footer-links">
              {footerLinks.subscription.map((link) => (
                <li key={link}>
                  <Link className="footer-link" to={`/${link.toLowerCase()}`}>{link}</Link>
                </li>
              ))}
            </ul>
          </div>
               
          {/* Download App Column */}
          <div className="footer-column download-column">
            <h4 className="column-title">DOWNLOAD OUR APP</h4>
            <div className="download-links-container">
              <a href="#" className="download-link">
                {/* <AppStore className="store-icon" /> */}
                <img loading="lazy" className="download-platform-img" src={appleDownload}/>
                <div className="download-text">
                  <span className="download-now">Download now</span>
                  <strong>App Store</strong>
                </div>
              </a>
              <a href="#" className="download-link">
              <img loading="lazy" className="download-platform-img" src={googlePlayDownload}/>
                {/* <PlayStore className="store-icon" /> */}
                <div className="download-text">
                  <span className="download-now">Download now</span>
                  <strong>Play Store</strong>
                </div>
              </a>
            </div>
          </div>
        </div>
        <button className="back-to-top">
          <img loading="lazy" className='back-to-top-arrow-vector' src={backToTop} />
          {/* <ArrowUp className="arrow-icon" /> */}
        </button>
      </div>
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="copyright">
          © 2025 - TvAnywhere. Designed by Davida Dzato. All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
