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

const Blog = () => {
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


  const [blogData, setBlogData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

        useEffect(() => {
          const fetchBlogs = async () => {
            try {
              const res = await axios.get("/api/blogs");
              setBlogData(res.data);
            } catch (error) {
              console.error("Failed to fetch blogs:", error);
            }
          };

          fetchBlogs();
        }, []);

  
        
      const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowConfirm(true);
      };

      const confirmDelete = async () => {
        try {
          await axios.delete(`/api/blogs/${deleteId}`);
          const updatedData = blogData.filter((blog) => blog._id !== deleteId);
          setBlogData(updatedData);
          setShowConfirm(false);
        } catch (error) {
          console.error("Failed to delete blog:", error);
        }
      };

  // const confirmDelete = () => {
  //   const updatedData = [...blogData];
  //   updatedData.splice(deleteIndex, 1);
  //   setBlogData(updatedData);
  //   setShowConfirm(false);
  // };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteIndex(null);
  };

  // **************************************************************************

  const [showProfile, setShowProfile] = useState(false);
  const [adminData, setAdminData] = useState({
    name: "Admin User",
    email: "admin@arbito.com",
    phone: "+91 9876543210",
    image: "/img/user-profile.jpg",
  });

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
              src={adminData.image}
              alt="Admin"
              className="adm-profile-pic"
              onClick={toggleProfile}
            />

            {showProfile && (
              <div className="adm-profile-dropdown">
                <div className="adm-profile-image">
                  <img src={adminData.image} alt="Admin Large" />
                </div>
                <div className="adm-profile-info">
                  <p>
                    <strong>Name:</strong> {adminData.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {adminData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {adminData.phone}
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
                <FaBlog className="adm-logo-left" />
                <span className="adm-text">Blogs</span>
              </div>
              <Link to="/addblog" className="adm-blog-add-btn">
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
                {/* ***********************************************************main */}
                  {blogData.map((blog, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{blog.title}</td>
                      <td>{blog.intoduction}</td>
                      <td>{Array.isArray(blog.category) ? blog.category.join(", ") : blog.category}</td>
                      <td>
                        <Link to="/editblogs" className="adm-blog-edit-btn">
                          Edit
                        </Link>
                        <button
                          className="adm-blog-delete-btn"
                          onClick={() => handleDeleteClick(blog._id)}
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

export default Blog;
