import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import NewNavbar from "./components/newNavbar/newNavbar";
import SignUp from "./pages/SignUp/SignUp";
import Faq from "./components/faq/faq";
import Contact from "./components/Contact/Contact";
import CompleteProfile from './pages/CompleteProfile/completeProfile';
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ProductDetail from './pages/ProductDetail/ProductDetail';
import UserDashboard from './pages/UserDashboard/userDashboard';
import ProductUpload from './pages/ProductUpload/productUpload';
import { auth } from "./firebaseConfig"; 
import { onAuthStateChanged } from "firebase/auth"; 

import LandingPage from "./pages/LandingPage"; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <Router>
        {isAuthenticated ? <NewNavbar setIsAuthenticated={setIsAuthenticated} /> : <Navbar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
         <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} /> 
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/product-upload" element={<ProductUpload />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
