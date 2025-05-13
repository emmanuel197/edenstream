import React, {useState} from "react";
import Button from "./buttons/Button";
import "../../GLOBAL/components/styles/newsletter-subscription-section.scss"
const NewsletterSubscriptionSection = ({marginTop, marginBottom}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your subscription logic here
    console.log("Subscribed email:", email);
    setEmail("");
  };
  return (
    <>
      <section className="newsletter-subscription-section" style={{marginTop: marginTop, marginBottom: marginBottom}}>
        <div className="newsletter-subscription-section-header-wrapper">
          <div className="newsletter-subscription-section-header-container">
            <h2 className="newsletter-subscription-section-header">
              Stay Updated!
            </h2>
            <p className="newsletter-subscription-section-paragraph">
              Subscribe to Receive the Latest News and Content Directly to Your
              Inbox
            </p>
          </div>
          <form onSubmit={handleSubmit} className="subscription-form">
          <div className="subscription-form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email-input-form-control"
            />
            <Button  
            label="Submit" 
            page="/home"
            className="ask-a-question" />
          </div>
        </form>
        </div>
      </section>
    </>
  );
};
export default NewsletterSubscriptionSection;
