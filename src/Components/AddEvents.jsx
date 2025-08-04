import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaBlog,
  FaTrophy,
  FaCalendar,
  FaArrowAltCircleRight,
  FaPlus,
} from "react-icons/fa";
import { IoMdLogOut, IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import "../Styles/dashboard.css";
import "../Styles/Tablecontent.css";
import "../Styles/addformevents.css";
import axios from '../api/axios.js'

const AddBlog = () => {
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

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleSidebar = () => setIsSidebarClosed(!isSidebarClosed);

  const [showProfile, setShowProfile] = useState(false);
  const [formData, setFormData] = useState({
      _id: "",
      name: "",
      email: "",
      phone: "",
      password: "",
    });


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
          } catch (err) {
            console.error("Failed to fetch user data:", err);
          }
        };
        fetchUserData();
      }, []);

  const toggleProfile = () => setShowProfile(!showProfile);


    const handlelogoutToHome = () => {
    sessionStorage.setItem("homeRedirectOnce", "true");
    window.location.href = "/";
  };


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
                <FaCalendar className="adm-logo-left" />
                <span className="adm-text">Event</span>
              </div>
            </div>

            <div className="adm-blog-add-form">
              <form className="adm-blog-form">
                <div className="adm-form-group">
                  <label htmlFor="eventTitle">Title</label>
                  <input
                    type="text"
                    id="eventTitle"
                    name="title"
                    placeholder="Enter event title"
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label htmlFor="eventDescription">Description</label>
                  <textarea
                    id="eventDescription"
                    name="description"
                    placeholder="Enter event description"
                    rows="4"
                    required
                  />
                </div>

                <div className="adm-form-row">
                  <div className="adm-form-group">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      required
                    />
                  </div>

                  <div className="adm-form-group">
                    <label htmlFor="endDate">End Date</label>
                    <input type="date" id="endDate" name="endDate" required />
                  </div>
                </div>

                <div className="adm-form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Enter event location"
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label htmlFor="eventImage">
                    Event Image (JPG, Max: 20MB)
                  </label>
                  <input
                    type="file"
                    id="eventImage"
                    name="image"
                    accept=".jpg"
                    required
                  />
                </div>

                <button type="submit" className="adm-blog-submit-btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddBlog;
