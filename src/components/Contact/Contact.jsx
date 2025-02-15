import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID, 
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
      formData, 
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(
        (response) => {
          console.log("Email Sent Successfully:", response);
          setIsSent(true);
          setLoading(false);
          setFormData({ name: "", email: "", phone: "", message: "" }); 
        },
        (error) => {
          console.error("Email Send Error:", error);
          setLoading(false);
        }
      );
  };

  return (
    <div id="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-card">
        <h2 className="contact-title">IGDTUW MARKETPLACE</h2>
        <h3 className="contact-subtitle">Convey Your Ideas to Us</h3>
        <p className="contact-description">
          Contact us for questions, technical assistance, or collaboration opportunities.
        </p>
        {isSent ? (
          <p className="success-message"> Your message has been sent successfully!</p>

        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Mobile</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Sending..." : "Submit Now"}
            </button>
          </form>
        )}
        <div className="contact-info">
          <p><strong>Phone:</strong> +123-456-7890</p>
          <p><strong>Email:</strong> cbigdtuwmarketplace25@gmail.com</p>
          <p><strong>Address:</strong> KashMere Gate, Old Delhi, India </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
