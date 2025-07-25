import React from 'react';
import '../App.css';
import arbitoImage from '../assets/home-updated.png';
import Navbar from './Navbar'; 

const Homepage = () => {
  return (
    <>
      <div className="homepage">
        <div className="homepage-image">
          <img src={arbitoImage} alt="Arbito Illustration" />
        </div>
        <div className="homepage-content">
          <h1>Welcome to <span className="brand">Arbito</span></h1>
          <p>
            Empowering creators, communities, and culture — Arbito is your launchpad to collaborate, showcase, and thrive in the digital space.
          </p>
        </div>
      </div>
    </>
  );
};

export default Homepage;
