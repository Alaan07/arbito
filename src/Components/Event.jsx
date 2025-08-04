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
import axios from "../api/axios.js";

const Event = () => {
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

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [blogData, setBlogData] = useState([
    {
      title: "React Basics",
      intro: "Intro to React library",
      category: "Front-end Development",
    },
    {
      title: "Node.js Basics",
      intro: "Intro to Node library",
      category: "Back-end Development",
    },
  ]);

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    const updatedData = [...blogData];
    updatedData.splice(deleteIndex, 1);
    setBlogData(updatedData);
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteIndex(null);
  };

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
              <Link to="/addevent" className="adm-blog-add-btn">
                <FaPlus className="adm-logo-add" />
                Add
              </Link>
            </div>

            <div className="adm-blog-table-container">
              <table className="adm-blog-table">
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>Title</th>
                    <th>Intro</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogData.map((blog, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{blog.title}</td>
                      <td>{blog.intro}</td>
                      <td>{blog.category}</td>
                      <td>
                        <Link to="/editevents" className="adm-blog-edit-btn">
                          Edit
                        </Link>
                        <button
                          className="adm-blog-delete-btn"
                          onClick={() => handleDeleteClick(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Confirmation Modal */}
            {showConfirm && (
              <div className="adm-modal-overlay">
                <div className="adm-modal">
                  <p>Are you sure you want to delete this content?</p>
                  <div className="adm-modal-buttons">
                    <button onClick={confirmDelete} className="adm-yes-btn">
                      Yes
                    </button>
                    <button onClick={cancelDelete} className="adm-no-btn">
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Event;
