import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>🏡 Welcome to HomeQuest</h1>
          <p>
            Your one-stop solution for renting, listing, and managing properties with ease.
          </p>
          <Link to="/properties" className="explore-btn">
            Explore Properties
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Search</h3>
            <p>Find properties that match your budget and location preferences.</p>
          </div>
          <div className="step">
            <h3>2. Connect</h3>
            <p>Contact owners directly and send rental requests with ease.</p>
          </div>
          <div className="step">
            <h3>3. Rent</h3>
            <p>Finalize deals, move in, and enjoy your new home hassle-free.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose HomeQuest?</h2>
        <div className="reasons">
          <div className="reason">
            <h3>For Tenants</h3>
            <p>Browse verified listings and find homes that truly match your lifestyle.</p>
          </div>
          <div className="reason">
            <h3>For Owners</h3>
            <p>Easily list properties, manage requests, and track rentals in one place.</p>
          </div>
          <div className="reason">
            <h3>Trusted Platform</h3>
            <p>Secure, reliable, and trusted by hundreds of owners and tenants.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
