import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  return (
    <div id="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-card">
        <h2 className="contact-title">IGDTUW MARKETPLACE</h2>
        <h3 className="contact-subtitle">Convey Your Ideas to Us</h3>
        <p className="contact-description">
          Contact us for questions, technical assistance, or collaboration opportunities via the contact information provided.
        </p>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Mobile</label>
            <input type="tel" id="phone" placeholder="Enter your phone number" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="4" placeholder="Type your message here"></textarea>
          </div>
          <button type="submit" className="submit-button">Submit Now</button>
        </form>
        <div className="contact-info">
          <p><strong>Phone:</strong> +123-456-7890</p>
          <p><strong>Email:</strong> hello@igdtuw.ac.in</p>
          <p><strong>Address:</strong> KashMere Gate, Old Delhi, India </p>
        </div>
      </div>
    </div>
  );
};
export default Contact;

