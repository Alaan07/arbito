import React, { useRef, useEffect, useState } from "react";
import { FaHome, FaBlog, FaTrophy, FaCalendar, FaUser} from "react-icons/fa";

import { IoMdLogOut, IoMdMenu } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const [proformData, setproFormData] = useState({
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
        setproFormData({
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


  
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        linkedin: "",
        role: "",
        discription: "",
        university: "",
        thumbnail: "",
      });
    
      const [oldThumbnailName, setOldThumbnailName] = useState("");
  
  
      useEffect(() => {
        axios
          .get(`/api/geteditmember/${id}`)
          .then((res) => {
            const member = res.data?.members;
    
            if (!member) {
              console.warn("member not found or invalid response");
              return;
            }
            setFormData({
              name: member.name || "",
              role: member.role || "",
              linkedin: member.linkedin || "",
              discription: member.discription || "",
              university: member.university || "",
              thumbnail: "",
            });
    
            if (member.thumbnail) {
              const fileName = member.thumbnail.split("-").pop();
              setOldThumbnailName(fileName);
            }
          })
          .catch((err) => console.error(err));
      }, [id]);
  
   const handleSubmit = async (e) => {
      e.preventDefault();
  
      const data = new FormData();
      data.append("uploadType", "members");
      data.append("name", formData.name);
      data.append("role", formData.role);
      data.append("linkedin", formData.linkedin);
      data.append("university", formData.university);
      data.append("discription", formData.discription);
  
      if (formData.thumbnail) {
        data.append("thumbnail", formData.thumbnail);
      }
  
      try {
        await axios.put(`/api/updatecoremembers/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("core member updated!");
        navigate("/aboutdashboard");
      } catch (err) {
        console.error(err);
        alert("Failed to update achivements");
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
                    <strong>Name:</strong> {proformData.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {proformData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {proformData.phone}
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
                <FaUser className="adm-logo-left" />
                <span className="adm-text">About</span>
              </div>
            </div>

            <div className="adm-blog-add-form">
              <form
                className="adm-blog-form"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="adm-form-group">
                  <label htmlFor="title">Name</label>
                  <input
                    type="text"
                    id="title"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label htmlFor="title">Role</label>
                  <select id="role" onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required>

                    <option value={formData.role}>{formData.role}</option>
                    <option value={"Founder"}>Founder</option>
                    <option value={"President"}>President</option>
                    <option value={"Vice President"}>Vice President</option>

                  </select>
                </div>

                <div className="adm-form-group">
                  <label htmlFor="title">University</label>
                  <input
                    type="text"
                    id="title"
                    value={formData.university}
                    onChange={(e) =>
                      setFormData({ ...formData, university: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label>Description</label>
                  <textarea
                    id="description"
                    rows="5"
                    required
                    value={formData.discription}
                    onChange={(e) =>
                      setFormData({ ...formData, discription: e.target.value })
                    }
                  />
                </div>

                <div className="adm-form-group">
                  <label htmlFor="intro">LinkedIn</label>
                  <input
                    type="text"
                    id="intro"
                    value={formData.linkedin}
                    onChange={(e) =>
                      setFormData({ ...formData, linkedin: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label htmlFor="image">
                    Member Image (.jpg, .jpeg, .png .webp, max 20MB)
                    {formData.thumbnail instanceof File
                      ? ` / ${formData.thumbnail.name}`
                      : oldThumbnailName && ` / ${oldThumbnailName}`}
                  </label>

                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept=".jpg, .jpeg, .png .webp"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file && file.size > 20 * 1024 * 1024) {
                        alert("File size must be less than 20MB");
                        return;
                      }
                      setFormData({ ...formData, thumbnail: file });
                    }}
                  />
                </div>

                <div className="adm-form-group">
                  <button type="submit" className="adm-blog-submit-btn">
                    Updated Founders
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
