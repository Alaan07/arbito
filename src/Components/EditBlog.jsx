import React, {useRef, useEffect, useState } from "react";
import {
  FaHome,
  FaBlog,
  FaTrophy,
  FaCalendar,
} from "react-icons/fa";
import { IoMdLogOut, IoMdMenu } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/dashboard.css";
import "../Styles/Tablecontent.css";
import "../Styles/addformevents.css";
import { useParams } from "react-router-dom";
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

  const { id } = useParams();

  const [formData, setFormData] = useState({
  title: '',
  category: [],
  intoduction: '',
  content: '',
  thumbnail: '',
});

const [oldThumbnailName, setOldThumbnailName] = useState("");

useEffect(() => {
  axios.get(`/api/geteditblog/${id}`)
    .then(res => {
      const blog = res.data.blog;
      setFormData({
              title: blog.title || "",
              category: blog.category || [],
              intoduction: blog.intoduction || "",
              content: blog.content || "",
              thumbnail: "",
            });


      if (blog.thumbnail) {
        const fileName = blog.thumbnail.split("-").pop();
        setOldThumbnailName(fileName);
      }
    })
    .catch(err => console.error(err));
}, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();
  data.append("title", formData.title);
  data.append("category", JSON.stringify(formData.category));
  data.append("intoduction", formData.intoduction);
  data.append("content", formData.content);
  data.append("uploadType", "blogs"); // ✅ this is required

  if (formData.thumbnail) {
    data.append("thumbnail", formData.thumbnail);
  }

  try {
    await axios.put(`/api/updateblog/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Blog updated!");
    navigate('/blogs');

  } catch (err) {
    console.error(err);
    alert("Failed to update blog");
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
              onClick={toggleProfile}/>

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

        <div className="adm-dash-content">
          <div className="overview">
            <div className="adm-title">
              <div className="adm-title-left">
                <FaBlog className="adm-logo-left" />
                <span className="adm-text">Blogs</span>
              </div>
            </div>

            <div className="adm-blog-add-form">
              <form className="adm-blog-form" onSubmit={handleSubmit}>
                <div className="adm-form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label>Category</label>
                  <div className="adm-radio-options">
                    {[
                      "IT",
                      "Computer Applications",
                      "Tech",
                      "AI/ML",
                      "Cyber Security",
                      "Cloud Computing",
                    ].map((cat) => (
                      <label key={cat}>
                        <input
                          type="checkbox"
                          name="category"
                          value={cat}
                          checked={formData.category.includes(cat)}
                          onChange={(e) => {
                            const value = e.target.value;
                            const checked = e.target.checked;
                            setFormData((prev) => ({
                              ...prev,
                              category: checked
                                ? [...prev.category, value]
                                : prev.category.filter((c) => c !== value),
                            }));
                          }}
                        />
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="adm-form-group">
                  <label htmlFor="intro">Intro</label>
                  <input
                    type="text"
                    id="intro"
                    name="intro"
                    value={formData.intoduction}
                    onChange={(e) =>
                      setFormData({ ...formData, intoduction: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label htmlFor="image">
                    Blog Image (JPG, max 20MB)
                    {formData.thumbnail instanceof File
                      ? ` / ${formData.thumbnail.name}`
                      : oldThumbnailName && ` / ${oldThumbnailName}`}
                  </label>

                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept=".jpg"
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


                <button type="submit" className="adm-blog-submit-btn">
                  Update Blog
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
