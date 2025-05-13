import React, { useState } from "react";
import Button from "../buttons/Button";
import "../styles/Faq.scss"; // Make sure to create/update the SCSS

const Faq = ({marginTop, marginBottom}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      id: "01",
      question: "What is EdenStream?",
      answer: "EdenStream is a Christian voice-streaming app offering access to live TV channels, movies, documentaries, gospel music videos, and more, all curated to uplift your spirit and strengthen your faith."
    },
    {
      id: "02",
      question: "Can I watch live church services on EdenStream?",
      answer: "Yes, EdenStream provides live streaming of church services from various denominations. Check our schedule for upcoming live events."
    },
    {
      id: "03",
      question: "How often is new content added?",
      answer: "We add new content weekly, including fresh sermons, worship sessions, and inspirational movies."
    },
    {
      id: "04",
      question: "How do I cancel my subscription?",
      answer: "You can cancel anytime through your account settings. No cancellation fees apply."
    },
    {
      id: "05",
      question: "What kind of content is available on EdenStream?",
      answer: "We offer worship music, Bible teachings, Christian movies, live church services, and faith-based documentaries."
    },
    {
      id: "06",
      question: "How do I subscribe to EdenStream?",
      answer: "Choose your plan on our website or mobile app and follow the payment instructions."
    },
    {
      id: "07",
      question: "How do I contact support?",
      answer: "Reach us 24/7 through in-app chat or support@edenstream.com."
    },
    {
      id: "08",
      question: "What are the StreamVibe payment methods?",
      answer: "We accept all major credit cards, mobile money, and PayPal."
    }
  ];

  // Split FAQs into two columns
  const column1 = faqItems.slice(0, 4);
  const column2 = faqItems.slice(4);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" style={{marginTop: marginTop, marginBottom: marginBottom}}>
      <div className="faq-section-header-wrapper">
        <div className="faq-section-header-container">
          <h2 className="faq-section-header">Frequently Asked Questions</h2>
          <p className="faq-section-paragraph">
            Got questions? We've got answers! Check out our FAQ section to find
            answers to the most common questions about StreamVibe.
          </p>
        </div>
        <Button
          className="ask-a-question-btn"
          label="Ask a question"
          page="/home"
        />
      </div>

      <div className="faq-items-wrapper">
        <div className="faq-items-row">
          {/* Column 1 */}
          <div className="faq-items-col">
            {column1.map((item, index) => (
              <div 
                key={item.id}
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-item-question-answer-wrapper">
                  <span className="faq-index">{item.id}</span>
                  <div className="question-answer-container">
                  <h3 className="faq-question">{item.question}</h3>
                  {activeIndex === index && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
                  </div>
                 
                  <span className="faq-toggle">
                    {activeIndex === index ? '-' : '+'}
                  </span>
                </div>
               <div className='faq-border-bottom'></div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="faq-items-col">
            {column2.map((item, index) => (
              <div 
                key={item.id}
                className={`faq-item ${activeIndex === index + 4 ? 'active' : ''}`}
                onClick={() => toggleFAQ(index + 4)}
              >
                <div className="faq-item-question-answer-wrapper">
                  <span className="faq-index">{item.id}</span>
                  <div className="question-answer-container">
                  <h3 className="faq-question">{item.question}</h3>
                  {activeIndex === index + 4 && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
                  </div>
                 
                  <span className="faq-toggle">
                    {activeIndex === index + 4 ? '-' : '+'}
                  </span>
                </div>
                <div className='faq-border-bottom'></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
