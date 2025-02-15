import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useState, useEffect } from "react";
import marketplaceLogo from "../../assets/retailer.png";

const Navbar = () => {
  const [isActiveOpen, setIsActiveOpen] = useState(false);
  const location = useLocation(); // Get current route

  const toggleHamburger = () => {
    setIsActiveOpen(!isActiveOpen);
  };

  // Close navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isActiveOpen) {
        setIsActiveOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isActiveOpen]);

  // Function to handle scrolling for sections when on Home page
  const handleScrollToSection = (sectionId) => {
    if (location.pathname === "/") {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100); // Give time for rendering
    }
  };

  return (
    <header>
      <nav className="navbar old-navbar">
        <div className="logo">
          <img src={marketplaceLogo} alt="Marketplace logo" />
          <h1>IGDTUW MARKETPLACE</h1>
        </div>
        <ul id="navbar" className={`${isActiveOpen ? "active" : ""}`} onClick={toggleHamburger}>
          <li>
            <Link className="a" to="/" onClick={() => handleScrollToSection("hero-section")}>
              Home
            </Link>
          </li>
          <li>
            <Link className="a" to="/" onClick={() => handleScrollToSection("faq")}>
              FAQ
            </Link>
          </li>
          <li>
            <Link className="a" to="/" onClick={() => handleScrollToSection("contact-container")}>
              Contact us
            </Link>
          </li>
          <li>
            <button className="logout">
              <Link className="signing" to="/signin">Sign In</Link>
            </button>
          </li>
          <li>
            <button className="logout">
              <Link className="signing" to="/signup">Sign Up</Link>
            </button>
          </li>
        </ul>

        <div className={`hamburger ${isActiveOpen ? "active" : ""}`} onClick={toggleHamburger}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
