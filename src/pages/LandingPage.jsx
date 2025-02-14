import React from "react";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import Faq from "../components/faq/faq";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;
