import { useEffect } from "react";
import '../styles/faqs.scss';
const FAQs = ({ active }) => {
  // const isAuthenticated = JSON.parse(window.localStorage.getItem("isAuthenticated"));
  // const user_info = COOKIES.get("user_info");
  // useEffect(() => {
  // isAuthenticated &&
  //    fetchWatchlist(dispatch)
  // console.log(isAuthenticated)
  // }, [dispatch])

  if (active === "faqs")
    return (
      <div className="faqs">
        <h2 className="faqs-header">FAQs</h2>
        <section className="faq-section">
          <h3 className="faq-section-header">WHAT IS AFRIPLAY?</h3>
          <div className="faq-section-body">
            <p className="faq-section-body-text">
              Afriplay is a video streaming entertainment service offering
              unlimited access to TV shows, movies, live TV channels, and more.
            </p>
            <p className="faq-section-body-text">
              Stream and watch on a wide range of devices, just the way you
              would like to. No commitments, no hassles, and an all-pass to
              enjoyable satisfying content.
            </p>
            <p className="faq-section-body-text">
              Afriplay
              <b>
                {" "}
                Daily Live, Daily Cinema, Daily Max, 3-Day Binge, Weekly Wonder,
                Monthly Magic.
              </b>
            </p>
          </div>
        </section>
        <section className="faq-section">
          <h3 className="faq-section-header">HOW MUCH DOES IT COST?</h3>
          <div className="faq-section-body">
            <p className="faq-section-body-text">
              <b>Daily Live</b>: One-day access to enjoy selected live Channels
              for only GHS2.0
            </p>
            <p className="faq-section-body-text">
              <b>Daily Cinema:</b>: One-day access to enjoy selected movies, TV
              shows and live Channels for only GHS2.5
            </p>
            <p className="faq-section-body-text">
              <b>Daily Max</b>: One (1)-day access to enjoy selected movies, TV
              shows and premium live Channels for only GHS5.0
            </p>
            <p className="faq-section-body-text">
              <b>3-Day Binge</b>: Three (3)-day access to enjoy premium movies,
              TV shows and live Channels for only GHS12.5
            </p>
            <p className="faq-section-body-text">
              <b>Weekly Wonder</b>: Seven (7)-day access to enjoy premium
              movies, TV shows and live Channels for only GHS25.0
            </p>
            <p className="faq-section-body-text">
              <b>Monthly Magic</b>: Thirty (30)-day access to enjoy premium
              movies, TV shows and live Channels for only GHS75.0
            </p>
            <p className="faq-section-body-text">
              Note: Prices may change due to promotional offers, special packs
              or price revisions
            </p>
            <p className="faq-section-body-text">
              You will be presented with all the options upon successful
              sign-up.
            </p>
          </div>
        </section>
        <section className="faq-section">
          <h3 className="faq-section-header">WHERE CAN I WATCH?</h3>
          <div className="faq-section-body">
            <p className="faq-section-body-text">
              To start watching, visit{" "}
              <a href="/" target="blank">
                {" "}
                www.afriplay.com{" "}
              </a>{" "}
              or go to the app store on your device, search ‘Afriplay’, select
              and download.
            </p>
            <p className="faq-section-body-text">
              Whichever plan you choose, you have the option to choose which
              device you’d best enjoy your streaming on. You can modify your
              plan at any time and watch any smart device of your choice:
              smartphones, tablets, computers, smart TVs, and media boxes.
            </p>
            <p className="faq-section-body-text">
              Whichever devices you choose, be assured of a great user
              experience.
            </p>
          </div>
        </section>
        <section className="faq-section">
          <h3 className="faq-section-header">WHAT CAN I WATCH?</h3>
          <div className="faq-section-body">
            <p className="faq-section-body-text">
              Movies, Series, TV Shows, Live TV Channels, Live Concerts, etc.
            </p>
            <p className="faq-section-body-text">
              To start watching, sign up at{" "}
              <a href="/" target="blank">
                {" "}
                www.afriplay.com{" "}
              </a>{" "}
              and follow the easy steps. Once you’re signed in, select one from
              the available plans. Once you’re a subscriber, you can watch the
              available content under the plan you’re subscribed to.
            </p>
          </div>
        </section>
        <section className="faq-section">
          <h3 className="faq-section-header">
            CAN I WATCH WITHOUT DATA OR WIFI?
          </h3>
          <div className="faq-section-body">
            <p className="faq-section-body-text">
              You will need reliable internet connectivity to enjoy AFRIPlay.
              You may use Wi-Fi and/or data. You can also manage how much data
              consumption you would like to have as you watch. Simply go to
              Settings -&gt; Video Quality -&gt; choose from any of the options
              outlined.
            </p>
           
          </div>
        </section>
        <section className="faq-section">
          <h3 className="faq-section-header">
          CAN I CATCH UP OR RECORD TV PROGRAMS?
          </h3>
          <div className="faq-section-body">
            <p className="faq-section-body-text">
            Yes. For Catch up, simply click on the channel of choice -&gt; scroll upwards to choose a previously ran
program on the Electronic Programming Guide (EPG) -&gt; click on the program of choice -&gt; Click Yes
button to the pop-up prompt -&gt; Enjoy your program Catch Up.
            </p>
            <p className="faq-section-body-text">
            To Record, simply click on the channel of choice -&gt; scroll downwards to choose a yet to run program
on the Electronic Programming Guide (EPG) -&gt; click on the program of choice -&gt; Click Yes button to
the pop-up prompt -&gt; When the program is running, the recording will begin.
            </p>
          </div>
        </section>
      </div>
    );
  return <></>;
};

export default FAQs;
