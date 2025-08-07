import React, { useEffect } from 'react';
import '../App.css';
import arbitoImage from '../assets/home-updated.png';
import BroaderAI from '../assets/BroaderAI.png';
import Roarstar from '../assets/Roarstar.png';
import CynuxEra from '../assets/cynux_era round and white.png';   
import Insights from '../assets/Insights.jpeg';               
import Banner1 from './Banner1';
import Banner2 from './Banner2';
import FAQ from './FAQ';
import Join from './Join';
import SupportUs from './SupportUs';
import Tagline from './tagline';
import AboutArbitoBanner from './AboutArbitoBanner';

const Homepage = () => {

  useEffect(() => {
  const redirected = sessionStorage.getItem("homeRedirectOnce");
  if (redirected) {
    sessionStorage.removeItem("homeRedirectOnce");
    window.location.reload();
  }
}, []);

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
          <div style={{ height: '3.5rem' }} />
          <h3 className="trusted-by">Supported by</h3>
    <div className="trusted-logos">
      <img src={CynuxEra} alt="Partner Logo 3" />    
      <img src={BroaderAI} alt="Partner Logo 1" />
      <img src={Roarstar} alt="Partner Logo 2" />
      <img src={Insights} alt="Partner Logo 4" />
    </div>
        </div>
      </div>
                <div style={{ height: '4.5rem' }} />
      <Tagline/>
      <div style={{ height: '4.5rem' }} />
      <Banner1/>
      <div style={{ height: '4.5rem' }} />

      <AboutArbitoBanner/>
            <div style={{ height: '4.5rem' }} />
<Join/> 
      <div style={{ height: '4.5rem' }} />
<Banner2/>
      <div style={{ height: '4.5rem' }} />

<SupportUs/>
      <div style={{ height: '4.5rem' }} />

<FAQ/>
      <div style={{ height: '4.5rem' }} />
    </>
  );
};

export default Homepage;
