import React, {useRef, useEffect, useState } from "react";
import {
  FaHome,
  FaBlog,
  FaTrophy,
  FaCalendar,
  FaArrowAltCircleRight,
} from "react-icons/fa";
import { IoMdLogOut, IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import "../Styles/dashboard.css";
import "../Styles/Tablecontent.css";
import "../Styles/addformevents.css";
import "../Styles/profile.css";
import axios from "../api/axios.js";

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("mode") === "dark"
  );
  const [isSidebarClosed, setIsSidebarClosed] = useState(
    localStorage.getItem("status") === "close"
  );

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
    localStorage.setItem("mode", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const nav = document.querySelector("nav");
    nav.classList.toggle("close", isSidebarClosed);
    localStorage.setItem("status", isSidebarClosed ? "close" : "open");
  }, [isSidebarClosed]);



  useEffect(() => {
  const redirected = sessionStorage.getItem("redirectedOnce");
  if (redirected) {
    sessionStorage.removeItem("redirectedOnce");
    window.location.reload();
  }
  }, []);

  



  const toggleSidebar = () => setIsSidebarClosed(!isSidebarClosed);

  const [showProfile, setShowProfile] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    password: "",
  });




  const ranOnce = useRef(false);


  useEffect(() => {
      const fetchUserData = async () => {
        try {
            const res = await axios.get("/api/getuserpro");
            setFormData({
              _id: res.data._id,
              name: res.data.username || "",
              email: res.data.email || res.data.emai || "",
              phone: res.data.contact || "",
              password: "",
            }); 
            if (ranOnce.current) return;
              ranOnce.current = true;

              if (!res.data.islogin) {
                alert("unauthorized access.");
                window.location.href = "/login";
              }
        } catch (err) {
          console.error("Failed to fetch user data:", err);
        }
      };
      fetchUserData();
    }, []);

    const handlelogoutToHome = async() => {
     try{
      const res = await axios.get("/api/logout");
      if (res.status === 200) {
        alert("Logout successful");
      } else {
        alert("Logout failed, please try again");
      }
     }catch(err){
      console.error("Logout error:", err);
      alert("An error occurred while logging out. Please try again.");
     }
    sessionStorage.setItem("homeRedirectOnce", "true");
    window.location.href = "/";
  };




  const toggleProfile = () => setShowProfile(!showProfile);

  return (
    <>
      <nav className={isSidebarClosed ? "close" : ""}>
        <div className="adm-logo-name">
          <div className="adm-logo-image">
            <img src="/img/arbito-logo-only.png" alt="Logo" />
          </div>
          <span className="adm-logo_name">Arbito</span>
        </div>

        <div className="adm-menu-items">
          <ul className="adm-nav-links">
            <li>
              <Link to="/dashbord">
                <FaHome className="adm-logo" />
                <span className="adm-link-name">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/blogs">
                <FaBlog className="adm-logo" />
                <span className="adm-link-name">Blogs</span>
              </Link>
            </li>
            <li>
              <Link to="/achievements">
                <FaTrophy className="adm-logo" />
                <span className="adm-link-name">Achievements</span>
              </Link>
            </li>
            <li>
              <Link to="/events">
                <FaCalendar className="adm-logo" />
                <span className="adm-link-name">Events</span>
              </Link>
            </li>
          </ul>

          <ul className="adm-logout-mode">
          <li onClick={handlelogoutToHome} style={{ cursor: "pointer" }}>
            <IoMdLogOut className="adm-logo" />
            <span className="adm-link-name">Logout</span>
          </li>

          </ul>
        </div>
      </nav>

      <section className="adm-dashboard">
        <div className="adm-top">
          <IoMdMenu className="adm-sidebar-toggle" onClick={toggleSidebar} />
          <div className="adm-profile-container">
            <img
              src="/public/img/user-profile.jpg"
              alt="Admin"
              className="adm-profile-pic"
              onClick={toggleProfile}
            />

            {showProfile && (
                <div className="adm-profile-dropdown">
                <div className="adm-profile-image">
                     <img src="/public/img/user-profile.jpg" alt="Admin Large" />
                 </div>
                 <div className="adm-profile-info">
                   <p>
                   <strong>Name:</strong> {formData.name}
                   </p>
                     <p>
                    <strong>Email:</strong> {formData.email}
                    </p>
                     <p>
                    <strong>Phone:</strong> {formData.phone}
                    </p>
                    <Link to="/editprofile" className="adm-edit-btn">
                    Edit Profile
                    </Link>
                  </div>
              </div>
            )}
          </div>
        </div>

        <div className="adm-dash-content">
          <div className="overview">
            <div className="adm-title">
              <div className="adm-title-left">
                <FaHome className="adm-logo-left" />
                <span className="adm-text">Dashboard</span>
              </div>
            </div>

            <div className="adm-boxes">
              <div className="adm-box adm-box1">
                <span className="adm-text">Total Students</span>
                <span className="number">50,120</span>
              </div>
              <div className="adm-box adm-box2">
                <span className="adm-text">Total Blogs</span>
                <span className="number">20,120</span>
              </div>
              <div className="adm-box adm-box3">
                <i className="uil uil-share"></i>
                <span className="adm-text">Total Events</span>
                <span className="number">10,120</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
