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
  <Link to="/">Home</Link>  {/* ✅ Use Link instead of a */}
</li>
<li>
  <Link to="/faq">FAQ</Link>
</li>
<li>
  <Link to="/contact">Contact us</Link>
</li>
<li>
  <button className="logout">
    <Link to="/signin">Sign In</Link>
  </button>
</li>
<li>
  <button className="logout">
    <Link to="/signup">Sign Up</Link>
  </button>
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
