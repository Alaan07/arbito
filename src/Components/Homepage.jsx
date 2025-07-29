import React, { useEffect } from 'react';
import '../App.css';
import arbitoImage from '../assets/home-updated.png';
import Banner1 from './Banner1';
import Banner2 from './Banner2';
import FAQ from './FAQ';
import Join from './Join';
import SupportUs from './SupportUs';
import Tagline from './tagline';
import AboutArbitoBanner from './AboutArbitoBanner';




const Homepage = () => {
  useEffect(() => {
    const revealElements = () => {
      const elements = document.querySelectorAll('.scroll-element');
      const triggerPoint = window.innerHeight * 0.8;

      elements.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerPoint) el.classList.add('visible');
      });
    };

    window.addEventListener('scroll', revealElements);
    return () => window.removeEventListener('scroll', revealElements);
  }, []);

  return (
    <>
     
      
      <div className="homepage">
        <div className="homepage-image">
          <img src={arbitoImage} alt="Arbito Illustration" />
        </div>
        <div className="homepage-content">
          <h1>
            <span className="brand">Connect, Learn, Grow with </span>Arbito
          </h1>
          <p>
            Empowering students with real-world skills. Arbito Student Community connects learning with doing — through workshops, projects, and hands-on experiences. We believe in growing together, mentoring each other, and turning ideas into impact.
          </p>
        </div>
      </div>
      <Tagline/>
      <AboutArbitoBanner/>
<Banner1/>
<Join/> 
      
<Banner2/>
<SupportUs/>
<FAQ/>
    
    </>
  );
};

export default Homepage;
