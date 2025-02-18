import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase Sign In function
import LoginImg from "../../assets/loginimg.jpg";
import "./SignIn.css";

const SignIn = ({ setIsAuthenticated }) => {
  // State for form data and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Redirect after successful signin

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
      setIsAuthenticated(true); // Update navbar state
      navigate("/"); // Redirect to home page
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }

  };

  return (
    <div className="signin-container">
      {/* Left Section */}
      <div className="signin-left">
        <img src={LoginImg} alt="Marketplace Logo" />
      </div>

      {/* Right Section */}
      <div className="signin-right">
        <div className="signin-form-container">
          <h2>Welcome Back!</h2>
          <p>Sign In to continue!</p>
          <form onSubmit={handleSignIn}>
            <div className="form-group">
              <label htmlFor="email">College Email ID:</label>
              <input
                type="email"
                id="email"
                placeholder="College Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="signin-btn">
              Sign In
            </button>
          </form>
          {error && <p className="error-message">{error}</p>} {/* Show error message */}
          <div className="signin-redirect">
            <p>New User?</p> <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
