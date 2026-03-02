// src/pages/Home.jsx
import React from "react";
import Navbar from "../../components/home/Navbar";
import HeroSection from "../../components/home/HeroSection";
import AboutSection from "../../components/home/AboutSection";
import PromoSection from "../../components/home/PromoSection";
import FaqSection from "../../components/home/FaqSection";
import Footer from "../../components/home/Footer";
import ProductsSection from "../../components/home/ProductsSection";
import TestimonialSection from "../../components/home/TestimonialSection";
import ContactSection from "../../components/home/ContactSection";
import WavesProductsSection  from "../../components/home/WavesProductsSection";
import InteractivePromo  from "../../components/home/InteractivePromo";
import PromoFeaturesSection  from "../../components/home/PromoFeaturesSection";
import PromoProductSection   from "../../components/home/PromoProductSection";
import MobileAccessoriesSection   from "../../components/home/MobileAccessoriesSection";

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <MobileAccessoriesSection />
      <AboutSection />
      <ProductsSection />
      <PromoSection />
      <WavesProductsSection />
      <InteractivePromo />
      <FaqSection />
      <PromoProductSection />
      <PromoFeaturesSection />
      <ContactSection />
      <TestimonialSection />
      <Footer />
      {/* You can add more sections here */}
    </div>
  );
}

export default Home;