import React, {useRef, useEffect, useState } from "react";
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




   const [eventData, seteventData] = useState([]);


  const [deleteId, setDeleteId] = useState(null);


  useEffect(() => {
            const fetchAchivements = async () => {
              try {
                const res = await axios.get("/api/eventsdashboard");
                seteventData(res.data);
              } catch (error) {
                console.error("Failed to fetch Achivements:", error);
              }
            };
  
            fetchAchivements();
          }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
        try {
          await axios.delete(`/api/eventsdelete/${deleteId}`);
          const updatedData = eventData.filter((event) => event._id !== deleteId);
          seteventData(updatedData);
          setShowConfirm(false);
        } catch (error) {
          console.error("Failed to delete event:", error);
        }
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
                    <th>Star-Date</th>
                    <th>Star-Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {eventData.map((event, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{event.title}</td>
                      <td>{event.startdate}</td>
                      <td>{event.enddate}</td>
                      <td>
                        <Link to={`/editevents/${event._id}`} className="adm-blog-edit-btn">
                          Edit
                        </Link>
                        <button
                          className="adm-blog-delete-btn"
                          onClick={() => handleDeleteClick(event._id)}
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
