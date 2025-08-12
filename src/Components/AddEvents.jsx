import React, { useRef, useEffect, useState } from "react";
import { FaHome, FaBlog, FaTrophy, FaCalendar, FaUser } from "react-icons/fa";
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

  const toggleProfile = () => setShowProfile(!showProfile);

  const handleTimeChange = (e) => {
    const time24 = e.target.value;
    let [hours, minutes] = time24.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const time12 = `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
    console.log(time12);
    settime(time12);
  };
  // *************************************backend*********************************
  const [EventTitle, setEventTitle] = useState("");
  const [eventdesc, seteventdesc] = useState("");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [time, settime] = useState("");
  const [location, setlocation] = useState("");
  const [speaker, setspeaker] = useState("");
  const [eventThumb, seteventThumb] = useState("");
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const handleaddblogclick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("EventTitle", EventTitle);
    formData.append("eventdesc", eventdesc);
    formData.append("startdate", formatDate(startdate));
    formData.append("enddate", formatDate(enddate));
    formData.append("time", time);
    formData.append("location", location);
    formData.append("speaker", speaker);
    formData.append("eventThumb", eventThumb);
    try {
      const res = await axios.post(
        "/api/addevents?uploadType=event",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Success:", res.data);
      if (res.data.eventcreated) {
        alert("eventcreated");
      }
      navigate("/events");
    } catch (err) {
      console.error("Error uploading event:", err);
    }
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
            <div className="adm-title">
              <div className="adm-title-left">
                <FaCalendar className="adm-logo-left" />
                <span className="adm-text">Event</span>
              </div>
            </div>
            <div className="adm-blog-add-form">
              <form className="adm-blog-form" onSubmit={handleaddblogclick}>
                <div className="adm-form-group">
                  <label htmlFor="eventTitle">Title</label>
                  <input
                    type="text"
                    id="eventTitle"
                    name="title"
                    placeholder="Enter event title"
                    onChange={(e) => setEventTitle(e.target.value)}
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
                    onChange={(e) => seteventdesc(e.target.value)}
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
                      onChange={(e) => setstartdate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="adm-form-group">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      onChange={(e) => setenddate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="adm-form-group">
                  <label htmlFor="location">Time</label>
                  <input
                    type="time"
                    id="location"
                    name="location"
                    placeholder="Enter event location"
                    onChange={handleTimeChange}
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Enter event location"
                    onChange={(e) => setlocation(e.target.value)}
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label htmlFor="Speakers:">Speakers:</label>
                  <input
                    type="text"
                    id="Speakers"
                    name="Speakers"
                    placeholder="Enter event speakers, comma-separated"
                    onChange={(e) => setspeaker(e.target.value)}
                    required
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
                        seteventThumb(file);
                      } else {
                        alert("File size must be less than 20MB");
                        e.target.value = "";
                      }
                    }}
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
