import React, { useState, useEffect } from "react";
import PhoneNumberInput from "./formInputs/phoneNumberInput";
import TextInput from "./formInputs/textInput";
import TextAreaInput from "./formInputs/textAreaInput";
import "../components/styles/contact-form.scss"
import Button from "./buttons/Button";
import Checkbox from '../components/formInputs/checkbox'
const ContactForm = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // dispatch(setInputStarted(value.length > 0));
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  return (
    <>
      <section id="contactForm">
      <div className="form-row">
      <TextInput
            label="First Name"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            type="text"
            placeholder="Enter First Name"
            className="contact-form-textinput-size"
            // styles={{width: "100%", maxWidth: "730.5px"}}
          />
      
          <TextInput
            label="Last Name"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            type="text"
            placeholder="Enter Last Name"
            className="contact-form-textinput-size"
            // styles={{width: "100%", maxWidth: "730.5px"}}
          />
        </div>
        <div className="form-row">
          <TextInput
            label="Email"
            name="emailAddress"
            value={formValues.email}
            onChange={handleChange}
            type="email"
            placeholder="Enter your Email"
            className="contact-form-textinput-size"
          />
          <PhoneNumberInput 
          label="Phone Number" 
          name="phoneNumber" 
          value={formValues.phoneNumber}
          onChange={handleChange}
          className="contact-form-phoneinput-size"/>
         
        </div>
        <div className="form-row">
            <TextAreaInput 
            label="Message"
            name="message"
            value={formValues.message}
            onChange={handleChange}
            placeholder="Enter your Message"
            className="contact-form-textarea-size"
            />
          </div>
          <div className="form-row checkbox-sendmsg-wrapper">
            <Checkbox label="I agree with Terms of Use and Privacy Policy" className="contactus-checkbox"/>
            <Button className="sendmsg-btn" label="Send Message" page="/"/>
            </div>
      </section>
    </>
  );
};

export default ContactForm;
