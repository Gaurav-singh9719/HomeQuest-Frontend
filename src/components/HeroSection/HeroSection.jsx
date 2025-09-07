import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Find Your Perfect Rental Home</h1>
        <p>Browse properties from trusted owners and connect with ease.</p>
        <Link to="/properties" className="hero-btn">Browse Properties</Link>
      </div>
    </section>
  );
};

export default HeroSection;
