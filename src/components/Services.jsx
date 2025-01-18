import React from "react";
import "./Services.css";
const Feature = ({ title, description, image }) => {
  return (
    <div className="feature">
      <img src={image} alt="feature" className="feature-icon" />
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
};
const FeaturesSection = () => {
  const features = [
    {
      title: " Courses Buy and Sell",
      description:
        "Easily buy and sell educational courses. Explore diverse topics or list your own courses to share knowledge and earn.",
      image: "src/assets/Coding workshop-amico.png",
    },
    {
      title: "User Authentication",
      description:
        "Ensures secure access by requiring users to sign up or log in before browsing product information, protecting sensitive data.",
      image: "src/assets/Sign up-amico.png",
    },
    {
      title: "Barter System",
      description:
        "Facilitates direct exchange of goods and services, allowing users to trade items without monetary transactions.",
      image: "src/assets/Business deal-amico.png",
    },
  ];

  return (
    <section className="features">
      <div className="container">
        <div className="introduction">
          <h1>Explore Our Core Features</h1>
          <p>
            More than just a marketplace, our platform brings you a variety of
            features to make your college life easier and more exciting. Check
            out what's available to elevate your experience!
          </p>
        </div>
        <div className="features-container">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              image={feature.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;