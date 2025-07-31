import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import arbitoLogo from '../assets/arbito_new_logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1024);

  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          setScrollingUp(currentScrollY < lastScrollY);
          lastScrollY = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobileView(mobile);
      if (!mobile) closeMenu();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`body-wrapper ${isOpen ? 'menu-open' : ''}`}>
      <nav className={`navbar ${scrollingUp ? 'show' : 'hide'}`}>
        <Link to="/" className="logo-section" onClick={closeMenu}>
          <img src={arbitoLogo} alt="Arbito Logo" className="logo-img" />
          <p className="logo-caption">Powered by Cynux Era</p>
        </Link>

        {isMobileView ? (
          <div className="hamburger" ref={hamburgerRef} onClick={toggleMenu}>
            ☰
          </div>
        ) : (
          <ul className="nav-links desktop">
            <li><Link to="/">Home</Link></li>
            <li><a href="#about">About</a></li>
            <li><a href="#events">Events</a></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/allblogs">Blogs</Link></li>
          </ul>
        )}
      </nav>

<<<<<<< HEAD
      {isMobileView && isOpen && (
        <ul className="nav-links mobile" ref={menuRef}>
          <li className="close-btn" onClick={closeMenu}>×</li>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><a href="#about" onClick={closeMenu}>About</a></li>
          <li><a href="#events" onClick={closeMenu}>Events</a></li>
          <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
          <li><Link to="/allblogs" onClick={closeMenu}>Blogs</Link></li>
        </ul>
      )}
    </div>
=======

      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><a href="#">Events</a></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/allblogs">Blogs</Link></li>
      </ul>
    </nav>
>>>>>>> dbce7b4ea2b34068a097dfee1abed3643e9eb412
  );
};

export default Navbar;