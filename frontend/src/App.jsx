import React from 'react';
import { useState } from "react";
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

// import NewNavbar from "./components/newNavbar";



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
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