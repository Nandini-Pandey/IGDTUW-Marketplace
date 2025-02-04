import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import marketplaceLogo from "../assets/retailer.png";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleHamburger = () => {
    setIsActive(!isActive);
  };

  // Close navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isActive) {
        setIsActive(false); // Close the navbar when scrolling
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isActive]);

  return (
    <header>
      <nav className="navbar old-navbar">
        <div className="logo">
          <img src={marketplaceLogo} alt="Marketplace logo" />
          <h1>IGDTUW MARKETPLACE</h1>
        </div>
        <ul id="navbar" className={`${isActive ? "active" : ""}`} onClick={toggleHamburger}>
          <li>
            <a
              className="a"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("hero-section").scrollIntoView({ behavior: "smooth" });
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="a"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("faq").scrollIntoView({ behavior: "smooth" });
              }}
            >
              FAQ
            </a>
          </li>
          <li>
            <Link className="a" to="/contact">Contact us</Link>
          </li>
          <li>
            <button className="logout"><Link className="signing" to="/signin">Sign In</Link></button>
          </li>
          <li>
            <button className="logout"><Link className="signing" to="/signup">Sign Up</Link></button>
          </li>

        </ul>




        <div className={`hamburger ${isActive ? "active" : ""}`} onClick={toggleHamburger}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
