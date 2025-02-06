import React from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Footer from './components/Footer';
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Faq from "./components/faq";
import Contact from "./components/Contact";
import CompleteProfile from './components/completeProfile';

import NewNavbar from "./components/newNavbar";
import { auth } from "./firebaseConfig"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth"; // Listen to auth state changes


function App() {
  // Check user authentication state on app load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set true if user exists, false otherwise
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);


  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <Router>
        {isAuthenticated ? <NewNavbar setIsAuthenticated={setIsAuthenticated} /> : <Navbar />}
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Services />
              <Faq />
              <Contact />
              <Footer />
            </>
          } />
          <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;