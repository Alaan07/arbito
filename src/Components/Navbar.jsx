import React, { useState } from "react";
import "../App.css";
import arbitoLogo from "../assets/arbito_new_logo.png";
import LoginPage from "./LoginPage";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLoginClick = () => setShowLoginPage(true);

  if (location.pathname === "/dashbord") return null;

  return (
    <>
      <nav className="navbar">
        <img src={arbitoLogo} alt="Arbito Logo" className="logo-img" />

        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Events</a>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/allblogs">Blogs</Link>
          </li>

          <li>
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          </li>
        </ul>
      </nav>

      {showLoginPage && <LoginPage />}
    </>
  );
};

export default Navbar;
