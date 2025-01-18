import React from 'react';
import logoImage from '../assets/logo.jpg'; 
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logoImage} alt="logo" />
        <a href="/">IGDTUW MARKETPLACE</a>
      </div>
      <div className="navbar-links">
        <a href="/"  className="nav-btns">Home</a>
        <a href="/faq" className="nav-btns">FAQ</a>
        <a href="/contact" className="nav-btns">Contact Us</a>
        <a href="/signin" className="signup-btn">Sign In</a>
        <a href="/signup" className="signup-btn">Sign Up</a>
      </div>
    </nav>
  );
};

export default Navbar;
