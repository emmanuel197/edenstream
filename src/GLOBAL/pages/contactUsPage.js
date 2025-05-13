import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Faq from "../components/landing/Faq";
import ContactForm from "../components/contactForm";
import "../components/styles/contact-us-page.scss";
import { contactPageImg } from "../../utils/assets";

const ContactUsPage = () => {

    return (
        <>
        <main>
        <Header />
        <div className="inner-sections-wrapper">
        <div className="contactus-page-img-wrapper">
            <img loading="lazy" src={contactPageImg} alt="contact-page-img" className="contactus-page-img"/>
        </div>
        <ContactForm/>   
        <Faq marginTop="6.5rem"/>
        </div>
        
        <Footer marginTop="6.9375rem"/>
        </main>
        </>
    )
}

export default ContactUsPage;