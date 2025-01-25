import React from "react";
import { Link } from "react-router-dom"; 
import logoImage from "../assets/logo.jpg";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logoImage} alt="logo" />
        <Link to="/">IGDTUW MARKETPLACE</Link>
      </div>
      
      <div className="navbar-links">
        <Link to="/" className="nav-btns">Home</Link>
        <Link to="/faq" className="nav-btns">FAQ</Link>
        <Link to="/contact" className="nav-btns">Contact Us</Link>
        <Link to="/signin" className="signup-btn">Sign In</Link>
        <Link to="/signup" className="signup-btn">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
