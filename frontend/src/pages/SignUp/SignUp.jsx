import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig"; // Import your firebaseConfig
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth"; // Using onAuthStateChanged
import LoginImg from "../../assets/loginimg.jpg";
import "./SignUp.css";

const SignUp = ({ setIsAuthenticated }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Redirect after successful signup

  // Handle Google Sign-In with @igdtuw.ac.in restriction
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the email is from the @igdtuw.ac.in domain
      if (!user.email.endsWith("@igdtuw.ac.in")) {
        setError("Please sign in using your college email (@igdtuw.ac.in)");
        await auth.signOut(); // Sign out the user if email is invalid
        return;
      }

      // Now check if the user is authenticated
      onAuthStateChanged(auth, (currentUser) => {
        localStorage.setItem("userId", user.email);
        if (currentUser) {
          // If the user is authenticated, check if it's a new or existing user
          if (currentUser.metadata.creationTime === currentUser.metadata.lastSignInTime) {
            // New user, navigate to complete profile page
            console.log("New user. Navigating to complete profile.");
            setIsAuthenticated(true);
            navigate("/complete-profile");
          } else {
            // Existing user, navigate to home page
            console.log("Existing user. Navigating to landing page.");
            setIsAuthenticated(true);
            navigate("/"); // Redirect to home page
          }
        } else {
          setError("Authentication failed.");
        }
      });
    } catch (err) {
      setError("Google Sign-In failed: " + err.message);
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

          {error && <p className="error-message">{error}</p>}

          {/* Google Sign-In Button */}
          <div className="google-signin-container">
            <button className="google-signin-btn" onClick={handleGoogleSignIn}>
              Sign Up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
