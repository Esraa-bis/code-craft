import React from "react";

import "../assets/css/HeroSection.css";
//
import heroSectionPhoto from "../assets/images/hero-section.jpg";

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-section-text">
        <h1 className="text">Start Your Coding Journey Today</h1>
        <p>Unleash your creativity</p>
      </div>
      <img
        src={heroSectionPhoto}
        alt="for e-learning "
        className="hero-section-photo"
      />
    </section>
  );
}
export default HeroSection;
