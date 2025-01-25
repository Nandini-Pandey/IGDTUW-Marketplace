import React from "react";
import { Link } from "react-router-dom";
import LoginImg from "../assets/loginimg.jpg";
import "./SignIn.css";

const SignIn = () => {
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
               <form>
                 <div className="form-group">
                   <label htmlFor="email">College Email ID:</label>
                   <input type="email" id="email" placeholder="College Email ID" />
                 </div>
                 <div className="form-group">
                   <label htmlFor="password">Password:</label>
                   <input type="password" id="password" placeholder="Password" />
                 </div>
                 <button type="submit" className="signin-btn">
                   Sign In
                 </button>
               </form>
               <div className="signin-redirect">
                 <p>New User?</p> <a href="/signup">Sign Up</a>
               </div>
             </div>
           </div>
         </div>
  );
};

export default SignIn;
