import React, { useRef, useEffect, useState } from "react";
import { FaHome, FaBlog, FaTrophy, FaCalendar, FaUser} from "react-icons/fa";

import { IoMdLogOut, IoMdMenu } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/dashboard.css";
import "../Styles/Tablecontent.css";
import "../Styles/addformevents.css";
import axios from "../api/axios.js";

const AddBlog = () => {
  const navigate = useNavigate();

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

  const handlelogoutToHome = async () => {
    try {
      const res = await axios.get("/api/logout");
      if (res.status === 200) {
        alert("Logout successful");
      } else {
        alert("Logout failed, please try again");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("An error occurred while logging out. Please try again.");
    }
    sessionStorage.setItem("homeRedirectOnce", "true");
    window.location.href = "/";
  };

  // *****************backend ********************add*************

  const [BlogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState([]);
  const [blogintro, setblogintro] = useState("");
  const [blogdesc, setblogdesc] = useState("");
  const [blogThumb, setblogThumb] = useState("");

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    setBlogCategory((prev) => {
      if (checked) {
        return prev.includes(value) ? prev : [...prev, value];
      } else {
        return prev.filter((cat) => cat !== value);
      }
    });
  };

  const handleaddblogclick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("uploadType", "blogs");
    formData.append("BlogTitle", BlogTitle);
    formData.append("blogintro", blogintro);
    formData.append("blogdesc", blogdesc);
    formData.append("blogCategory", blogCategory);
    formData.append("blogThumb", blogThumb);

    try {
      const res = await axios.post("/api/addblogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Success:", res.data);
      if (res.data.blogcreated) {
        alert("blogcreated");
      }
      navigate("/blogs");
    } catch (err) {
      console.error("Error uploading blog:", err);
    }
  };

  // *****************backend ********************add*************

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
            <li>
              <Link to="/aboutdashboard">
                <FaUser className="adm-logo" />
                <span className="adm-link-name">About</span>
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

        {/* *********************************************************main form file */}
        <div className="adm-dash-content">
          <div className="overview">
            <div className="adm-title">
              <div className="adm-title-left">
                <FaBlog className="adm-logo-left" />
                <span className="adm-text">Blogs</span>
              </div>
            </div>

            <div className="adm-blog-add-form">
              <form
                className="adm-blog-form"
                onSubmit={handleaddblogclick}
                encType="multipart/form-data"
              >
                <div className="adm-form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Enter blog title"
                    onChange={(e) => setBlogTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label>Category</label>
                  <div className="adm-radio-options">
                    <label>
                      <input
                        type="checkbox"
                        name="category"
                        value="IT"
                        onChange={handleCategoryChange}
                      />
                      IT
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="category"
                        value="Computer Applications"
                        onChange={handleCategoryChange}
                      />
                      Computer Applications
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="category"
                        value="Tech"
                        onChange={handleCategoryChange}
                      />
                      Tech
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="category"
                        value="AI/ML"
                        onChange={handleCategoryChange}
                      />
                      AI/ML
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="category"
                        value="Cyber Security"
                        onChange={handleCategoryChange}
                      />
                      Cyber Security
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="category"
                        value="Cloud Computing"
                        onChange={handleCategoryChange}
                      />
                      Cloud Computing
                    </label>
                  </div>
                </div>

                <div className="adm-form-group">
                  <label htmlFor="intro">Intro</label>
                  <input
                    type="text"
                    id="intro"
                    placeholder="Short introduction"
                    required
                    onChange={(e) => setblogintro(e.target.value)}
                  />
                </div>

                <div className="adm-form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    rows="5"
                    placeholder="Detailed description"
                    required
                    onChange={(e) => setblogdesc(e.target.value)}
                  />
                </div>

                <div className="adm-form-group">
                  <label htmlFor="image">Image (.jpg, .jpeg, .png .webp, max 20MB)</label>
                  <input
                    type="file"
                    id="image"
                    accept=".jpg, .jpeg, .png .webp"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file && file.size <= 20 * 1024 * 1024) {
                        setblogThumb(file);
                      } else {
                        alert("File size must be less than 20MB");
                        e.target.value = "";
                      }
                    }}
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <button type="submit" className="adm-blog-submit-btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddBlog;
