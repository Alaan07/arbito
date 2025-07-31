import React, { useState, useEffect } from 'react';
import '../App.css';
import arbitoLogo from '../assets/arbito_new_logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setScrollingUp(true); // Scrolling up
      } else {
        setScrollingUp(false); // Scrolling down
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrollingUp ? 'show' : 'hide'}`}>
      <Link to="/" className="logo-section">
  <img src={arbitoLogo} alt="Arbito Logo" className="logo-img" />
  <p className="logo-caption">Powered by Cynux Era</p>
</Link>



      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><a href="#">About</a></li>
        <li><Link to="/eventpage">Events</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/allblogs">Blogs</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
