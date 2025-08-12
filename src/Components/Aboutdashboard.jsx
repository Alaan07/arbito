import React, { useEffect, useState, useRef} from "react";
import {
  FaHome,
  FaBlog,
  FaTrophy,
  FaCalendar,
  FaPlus,
  FaUser,
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
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [founders, setFounders] = useState([]);
  const [members, setMembers] = useState([]);

  // New states for confirmation modal
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ type: "", id: "" });

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

              if (localStorage.getItem("islogin") !== "true" || !res.data.islogin) {
                alert("unauthorized access.");
                window.location.href = "/login";
              }

      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
    localStorage.setItem("mode", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const nav = document.querySelector("nav");
    nav.classList.toggle("close", isSidebarClosed);
    localStorage.setItem("status", isSidebarClosed ? "close" : "open");
  }, [isSidebarClosed]);

  const toggleSidebar = () => setIsSidebarClosed(!isSidebarClosed);
  const [showProfile, setShowProfile] = useState(false);
  const toggleProfile = () => setShowProfile(!showProfile);

  const handlelogoutToHome = async() => {
     try{
      const res = await axios.get("/api/logout");
      if (res.status === 200) {
        alert("Logout successful");
        localStorage.removeItem("islogin");
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

  // Fetch and split members by role
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resMembers = await axios.get("/api/getdashbordmembers");

        if (Array.isArray(resMembers.data)) {
          const foundersList = resMembers.data.filter(
            (member) => member.role?.toLowerCase() !== "core-member"
          );
          const coreMembersList = resMembers.data.filter(
            (member) => member.role?.toLowerCase() === "core-member"
          );

          setFounders(foundersList);
          setMembers(coreMembersList);
        } else {
          console.error("Unexpected members data format:", resMembers.data);
          setFounders([]);
          setMembers([]);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setFounders([
          {
            _id: "1",
            name: "Default Founder",
            role: "Lead",
            university: "Jain",
          },
        ]);
        setMembers([
          {
            _id: "2",
            name: "Default Member",
            role: "core-member",
            university: "Jain",
          },
        ]);
      }
    };
    fetchData();
  }, []);

  const handleDeleteFounder = async (id) => {
    try {
      await axios.delete(`/api/dashmembers/${id}`);
      setFounders((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Error deleting founder:", err);
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      await axios.delete(`/api/dashmembers/${id}`);
      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Error deleting member:", err);
    }
  };

  // Trigger confirmation popup
  const requestDelete = (type, id) => {
    setDeleteTarget({ type, id });
    setShowConfirm(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (deleteTarget.type === "founder") {
      handleDeleteFounder(deleteTarget.id);
    } else if (deleteTarget.type === "member") {
      handleDeleteMember(deleteTarget.id);
    }
    setShowConfirm(false);
  };

  // Cancel delete
  const cancelDelete = () => {
    setDeleteTarget({ type: "", id: "" });
    setShowConfirm(false);
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

        <div className="adm-dash-content">
          <div className="overview">
            {/* Founders */}
            <div className="adm-title">
              <div className="adm-title-left">
                <FaUser className="adm-logo-left" />
                <span className="adm-text">Founders</span>
              </div>
              <Link to="/addaboutcore" className="adm-blog-add-btn">
                <FaPlus className="adm-logo-add" /> Add
              </Link>
            </div>
            <div className="adm-blog-table-container">
              <table className="adm-blog-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>University</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {founders.length > 0 ? (
                    founders.map((f) => (
                      <tr key={f._id}>
                        <td>{f.name}</td>
                        <td>{f.role}</td>
                        <td>{f.university}</td>
                        <td>
                          <Link to={`/editcore/${f._id}`} className="adm-blog-edit-btn">
                            Edit
                          </Link>
                          <button
                            className="adm-blog-delete-btn"
                            onClick={() => requestDelete("founder", f._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No founders found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Members */}
            <div className="adm-title" style={{ marginTop: "30px" }}>
              <div className="adm-title-left">
                <FaUser className="adm-logo-left" />
                <span className="adm-text">Community Members</span>
              </div>
              <Link to="/addaboutcommunity" className="adm-blog-add-btn">
                <FaPlus className="adm-logo-add" /> Add
              </Link>
            </div>
            <div className="adm-blog-table-container">
              <table className="adm-blog-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>University</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.length > 0 ? (
                    members.map((m) => (
                      <tr key={m._id}>
                        <td>{m.name}</td>
                        <td>{m.role}</td>
                        <td>{m.university}</td>
                        <td>
                          <Link
                            to={`/editcommunity/${m._id}`}
                            className="adm-blog-edit-btn"
                          >
                            Edit
                          </Link>
                          <button
                            className="adm-blog-delete-btn"
                            onClick={() => requestDelete("member", m._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No members found</td>
                    </tr>
                  )}
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
