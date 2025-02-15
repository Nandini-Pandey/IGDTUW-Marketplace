import React from 'react';
import './Hero.css';
import heroImage from '../../assets/Thesis-amico.png';
import Typewriter from "typewriter-effect";

const Hero = () => {
  return (
    <section id="hero-section">
      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-title">
            <p>Welcome to</p>
            <span>
              <Typewriter
                options={{
                  loop: true,  // Enables infinite looping
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString("IGDTUW Marketplace")
                    .pauseFor(1500)
                    .deleteAll()
                    .start();
                }}
              />
            </span>
          </div>
          <br />
          <p className="hero-description">
            IGDTUW Marketplace is a dedicated platform designed to connect students for seamless exchange, borrowing, and buying of essential items. Whether you need gadgets, books, project supplies, or daily necessities, this marketplace ensures quick and easy access to resources.
            <br /><br />
            🚀 <b>Why IGDTUW Marketplace?</b>
            <br />✔ Instant Support - Never feel stuck in an emergency!
            <br />✔ Smart Sharing - Borrow or lend items effortlessly.
            <br />✔ Connected Campus - Find what you need, when you need it.
            <br /><br />
            From borrowing a calculator for exams to finding a laptop charger in a pinch, our platform bridges the gap and fosters a spirit of trust, collaboration, and community support.
            <br /><br />
            🔗 Join us in making campus life more connected, convenient, and hassle-free!<br /><br />

            <b>✨ Because sometimes, all you need is a helping hand from your community.</b>
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
