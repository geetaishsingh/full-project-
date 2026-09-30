import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import FeaturesSection from "../components/FeaturesSection/FeaturesSection";
import TrendingSection from "../components/TrendingSection/TrendingSection";
import TestimonialsSection from "../components/TestimonialsSection/TestimonialsSection";
import Footer from "../components/Footer/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturesSection />
        <TrendingSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
