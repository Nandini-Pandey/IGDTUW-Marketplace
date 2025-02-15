import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import LoginImg from "../../assets/loginimg.jpg";
import "./SignUp.css";

const SignUp = ({ setIsAuthenticated }) => {
  // State for form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Redirect after successful signup

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent form reload

    // Check if email is a college email
    if (!email.endsWith("@igdtuw.ac.in")) {
      setError("Please use your college email (@igdtuw.ac.in)");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful!");
      setIsAuthenticated(true); // Update navbar state
      navigate("/complete-profile"); // Redirect to Sign In page after signup
    } catch (err) {
      setError(err.message);
    }
  };

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
          <form onSubmit={handleSignUp}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">College Email ID:</label>
              <input type="email" id="email" placeholder="College Email ID" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="signup-btn-form">
              Sign Up
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
          <div className="signup-redirect">
            <p>Already have an account?</p> <Link to="/signin">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
