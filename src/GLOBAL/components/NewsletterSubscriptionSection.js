import React, {useState} from "react";
import Button from "./buttons/Button";
import "../../GLOBAL/components/styles/newsletter-subscription-section.scss"
import { addNewsletterEmail } from "../redux/account"; // Adjust the import path as necessary
import {TOAST} from '../../utils/constants'; // Adjust the import path as necessary
const NewsletterSubscriptionSection = ({marginTop, marginBottom}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Basic email validation
    if (!email) {
      TOAST.error("Please enter a valid email address.");
      return;
    }  else if (!/\S+@\S+\.\S+/.test(email)) {
      TOAST.error("Please enter a valid email address.");
      return;
    }

    try {
      // Await the API call
      await addNewsletterEmail(email);
      console.log("Subscribed email:", email);
      setEmail(""); // Clear the input field on successful submission
    } catch (error) {
      // Error handling is done within addNewsletterEmail (via toasts),
      // but you could add more specific handling here if needed.
      console.error("Subscription failed:", error);
    }
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
          <div className="subscription-form">
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
                type="button" // Changed type to button as it's not a form submit
                className="ask-a-question"
                action={handleSubmit} // Assign handleSubmit to the action prop
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsletterSubscriptionSection;
