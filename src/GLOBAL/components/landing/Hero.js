import Button from "../buttons/Button";
import "../../components/styles/hero.scss"
const Hero = () => {
  return (
    <>
      <section className="hero-section">
        <h1 className="hero-section-header">
          Nourish Your Spirit. Anytime, Anywhere.
        </h1>
        <p className="hero-section-paragraph">
          Dive into a sanctuary of inspiring Christian Movies, Live Christian
          Channels, Powerful Sermons, uplifting Gospel Music, and so much more
          on EdenStream — where the Word of God flows ceaselessly.
        </p>
        <Button className="get-started-btn" label="Get Started" page="/signup" />
      </section>
    </>
  );
};

export default Hero;
