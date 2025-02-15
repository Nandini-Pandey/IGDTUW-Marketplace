import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./faq.css";
import faqimage from "../../assets/FAQs-pana.png";

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Store questions and answers in an array
  const faqs = [
    {
      question: "What is IGDTUW Marketplace?",
      answer:
        "The IGDTUW Marketplace is a campus-exclusive platform designed to facilitate buying, selling, and exchanging goods and services among students and staff. Whether you need textbooks, gadgets, event tickets, or dorm essentials, the Marketplace provides a secure, user-friendly interface for hassle-free transactions.",
    },
    {
      question: "How do I sign up?",
      answer:
        "To sign up, simply visit the IGDTUW Marketplace website and follow the registration instructions. Use your university email for authentication.",
    },
    {
      question: "Is the platform secure?",
      answer:
        "Yes, we use the latest encryption methods to ensure secure transactions and protect user data.",
    },
    {
      question: "How do I buy an item?",
      answer:
        "To buy an item, simply click on the listing and follow the prompts to complete the purchase. You can contact the seller directly for more information or to negotiate the price.",
    },
    {
      question: "Can I buy or sell items without completing my profile?",
      answer:
        "No, you must complete your profile before you can buy or sell items on the platform. This helps us ensure a safe and secure environment for all users.",
    },
    {
      question: "Can I browse categories and items without signing up?",
      answer:
        "No, to maintain the privacy and security of our users, browsing categories and items is only available to registered members. Signing up is quick and easy and grants you access to all the features of our platform.",
    },
    {
      question: "What happens if I try to browse without signing up?",
      answer:
        "Access to categories is exclusive to signed-in users. If you're not signed in, the categories option won't appear in the navbar. Simply sign up or log in to unlock the full browsing experience and explore all available items seamlessly.",
    },
    // Add more FAQs as needed
  ];

  // Toggle the active answer index
  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq">
      <div className="faq-container">
        <div className="faq-introduction">
          <h1>Frequently Asked Questions</h1>
          <p>
            Got a question? Chances are we've already answered it! Dive into our
            FAQ treasure trove and uncover the answers you seek.
          </p>
        </div>
        <div className="faq-content">
          <img src={faqimage} alt="faq" />
          <ul id="questions">
            {faqs.map((faq, index) => (
              <li className="item" key={index}>
                <div
                  className={`question ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onClick={() => toggleAnswer(index)}
                >
                  <span>{faq.question}</span>
                </div>
                <div
                  className="answer"
                  style={{
                    display: activeIndex === index ? "block" : "none",
                  }}
                >
                  {faq.answer}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default FaqSection;
