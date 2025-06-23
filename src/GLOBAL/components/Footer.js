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

  // Include paths directly in the footerLinks data structure
  const footerLinks = {
    home: [
      { label: "Featured", path: "/" },
      { label: "Movies", path: "/movies" },
      // { label: "Word", path: "/word" },
      // { label: "Music", path: "/music" },
      { label: "Live TV", path: "/livetv" },
      // { label: "Live Radio", path: "/liveradio" }
    ],
    support: [
      { label: "FAQs", path: "/faqs" }
    ],
    subscription: [
      { label: "Plans", path: "/subscription" },
      { label: "Features", path: "/features" } // Assuming a path for Features
    ]
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling
    });
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
              {/* Use label and path from the object */}
              {footerLinks.home.map(({ label, path }) => (
                <li key={label}>
                  <Link className="footer-link" to={path}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links Column */}
          <div className="footer-column">
            <h4 className="column-title">SUPPORT</h4>
            <ul className="footer-links">
              {/* Use label and path from the object */}
              {footerLinks.support.map(({ label, path }) => (
                <li key={label}>
                  <Link className="footer-link" to={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscription Links Column */}
          <div className="footer-column">
            <h4 className="column-title">SUBSCRIPTION</h4>
            <ul className="footer-links">
              {/* Use label and path from the object */}
              {footerLinks.subscription.map(({ label, path }) => (
                <li key={label}>
                  <Link className="footer-link" to={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Download App Column */}
          <div className="footer-column download-column">
            <h4 className="column-title">DOWNLOAD OUR APP</h4>
            <div className="download-links-container">
              <a href="https://apps.apple.com/us/app/edenstream/id6744041468" className="download-link">
                {/* <AppStore className="store-icon" /> */}
                <img loading="lazy" className="download-platform-img" src={appleDownload}/>
                <div className="download-text">
                  <span className="download-now">Download now</span>
                  <strong>App Store</strong>
                </div>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.tvanywhereafrica.edenstream
" className="download-link">
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
        {/* Add onClick handler to the button */}
        <button className="back-to-top" onClick={scrollToTop}>
          <img loading="lazy" className='back-to-top-arrow-vector' src={backToTop} />
          {/* <ArrowUp className="arrow-icon" /> */}
        </button>
      </div>
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="copyright">
          © 2025 - TvAnywhere. Developed by Emmanuel Amokuandoh. All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
