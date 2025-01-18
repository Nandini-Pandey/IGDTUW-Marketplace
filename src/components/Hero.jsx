import React from 'react';
import './Hero.css';
import heroImage from '../assets/Thesis-amico.png';
import Typewriter from "typewriter-effect";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-left">
          <h1 className="hero-title">
            <p>Welcome to</p> 
            <b>
            <Typewriter
                onInit={(typewriter) => {
                    typewriter
                        .typeString("IGDTUW Marketplace")
                        .pauseFor(3000)
                        .deleteAll()
                        .typeString("IGDTUW Marketplace")
                        .start();
                }}
            />
            </b>
          </h1>
          <br/>
          <p className="hero-description">
          IGDTUW Marketplace is a dedicated platform designed to meet the needs of our vibrant university community. It provides students with a seamless way to exchange, borrow, or buy essential items during emergencies or regular campus life. From electronic gadgets and course books to project supplies and everyday necessities, our marketplace connects students to resources they might need on short notice.<br/><br/>

This platform fosters a culture of sharing and support, ensuring that no student feels stuck when faced with unexpected challenges. Whether you're looking to borrow a calculator for exams, sell your old textbooks, or find a laptop charger in a pinch, the IGDTUW Marketplace is here to bridge that gap.<br/><br/>

Our marketplace is built on trust, collaboration, and the spirit of giving back to the community. With easy-to-use features and a strong sense of security, students can confidently list, explore, and connect. Join us in making campus life easier, more connected, and truly supportive.<br/><br/>

<b><i>✨ Because sometimes, all you need is a helping hand from your community.</i></b>
          </p>
          <div className="cta-buttons">
            <a href="/explore" className="btn">Explore Now</a>
          </div>
        </div>
        <div className="hero-right">
          <img src={heroImage} alt="Marketplace" className="hero-img" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
