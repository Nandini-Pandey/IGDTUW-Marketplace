import React from "react";
import { Link } from "react-router-dom";
import LoginImg from "../assets/loginimg.jpg";
import "./SignUp.css";

const SignUp = () => {
    return (
      <div className="signup-container">
        {/* Left Section */}
        <div className="signup-left">
          <img src={LoginImg} alt="Marketplace Logo" />
        </div>
  
        {/* Right Section */}
        <div className="signup-right">
          <div className="signup-form-container">
            <h2>Welcome to IGDTUW Marketplace!</h2>
            <p>Register Yourself!</p>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" placeholder="Name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">College Email ID:</label>
                <input type="email" id="email" placeholder="College Email ID" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Password" />
              </div>
              <button type="submit" className="signup-btn-form">
                Sign Up
              </button>
            </form>
            <div className="signup-redirect">
              <p>Already have an account?</p> <a href="/signin">Sign In</a>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SignUp;