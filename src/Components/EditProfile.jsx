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
import "../App.css";
import "../Styles/addformblogs.css";
import axios from "../api/axios.js";

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

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  });




  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.put('/api/updateuserpro', formData);
    alert("Profile updated successfully!");
    console.log(res.data);
  } catch (err) {
    console.error("Update failed:", err);
    alert("Error updating profile.");
  }
  };

  const [showProfile, setShowProfile] = useState(false);
  const [adminData, setAdminData] = useState([]);


    useEffect(() => {
      const fetchuserdata = async () => {
        try {
          const res = await axios.get('/api/getuserpro');
          setFormData({
            name: res.data.name || "",
            email: res.data.email || "",
            phone: res.data.phone || "",
          });
        } catch (err) {
          console.log(err);
        }
      };
      fetchuserdata();
    }, []);



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
            <li>
              <Link to="/">
                <IoMdLogOut className="adm-logo" />
                <span className="adm-link-name">Logout</span>
              </Link>
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
                    <strong>Phone:</strong> {formData.contact}
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
                <span className="adm-text">Events</span>
              </div>
            </div>

            <div className="adm-blog-add-form">
              <form className="adm-blog-form" onSubmit={handleSubmit}>
                <div className="adm-form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                </div>

                <button type="submit" className="adm-blog-submit-btn">
                  Update Profile
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
