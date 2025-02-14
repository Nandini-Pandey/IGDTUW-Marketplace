import React from "react";
import "./Services.css";
import image1 from '../../assets/Coding workshop-amico.png';
import image2 from '../../assets/Sign up-amico.png';
import image3 from '../../assets/Business deal-amico.png';

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
      image: image1,
    },
    {
      title: "User Authentication",
      description:
        "Ensures secure access by requiring users to sign up or log in before browsing product information, protecting sensitive data.",
      image: image2,
    },
    {
      title: "Barter System",
      description:
        "Facilitates direct exchange of goods and services, allowing users to trade items without monetary transactions.",
      image: image3,
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
  
