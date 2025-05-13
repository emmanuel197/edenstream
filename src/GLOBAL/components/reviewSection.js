import React from "react";
import "../components/styles/review-section.scss";
import Button from "./buttons/Button";
import { addYourReview } from "../../utils/assets";
const ReviewSection = ({marginTop, marginBottom}) => {
    const reviewerData = [
        {id: 1, name: "Aniket Roy", country:"India", paragraph: "This sermon completely changed my perspective on faith! Pastor John’s message was so powerful."},
        {id: 2, name: "Swaraj", country: "India", paragraph: "I experienced a breakthrough after watching this. Highly recommend!"}
    ]
    return (
        <section className="review-section" style={{marginTop: marginTop, marginBottom: marginBottom}}>
            <div className="reviews-header-wrapper">
                <h2 className="reviews-header">Reviews</h2>
                <Button icon={addYourReview} label="Add Your Review" page="/" className="add-your-review-btn"/>
            </div>
            <div className="reviews-container">
                {reviewerData.map((reviewer) => {
                    return (
                        <div className="review-wrapper">
                        <div className="reviewer-name-country-wrapper">
                            <h4 className="reviewer-name">{reviewer.name}</h4>
                            <p className="reviewer-country">From {reviewer.country}</p>
                        </div>
                        <p className="review-text">{reviewer.paragraph}</p>
                        </div>
                    )
                })}
               
            </div>
        </section>
    )
}

export default ReviewSection;