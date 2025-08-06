import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AllBlogs from "./Components/AllBlogs.jsx";
import ContactPage from "./Components/ContactPage";
import Navbar from "./Components/Navbar";
import Homepage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Blogs from "./Components/Blog";
import Achievement from "./Components/Achievement";
import Event from "./Components/Event";
import AddBlog from "./Components/AddBlog";
import AddEvents from "./Components/AddEvents";
import AddAchievement from "./Components/AddAchievement";
import EditBlogs from "./Components/EditBlog";
import EditEvent from "./Components/EditEvent";
import EditAchievement from "./Components/EditAchievement";
import EditProfile from "./Components/EditProfile";
import Eventpage from "./Components/Eventpage";
import Footer from './Components/Footer';
import About from './Components/About';

function Layout() {
  const location = useLocation();

  // Pages where navbar should be hidden
  const hideNavbar = [
    "/dashbord",
    "/blogs",
    "/achievements",
    "/events",
    "/addblog",
    "/addevent",
    "/addachievement",
    "/editprofile"
  ].some(path => location.pathname === path) ||
     location.pathname.startsWith("/editblogs/") ||
     location.pathname.startsWith("/editevents/") ||
     location.pathname.startsWith("/editachievement/");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashbord" element={<Dashboard />} />
        <Route path="/allblogs" element={<AllBlogs />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/achievements" element={<Achievement />} />
        <Route path="/events" element={<Event />} />
        <Route path="/addblog" element={<AddBlog />} />
        <Route path="/about" element={<About />} />
        <Route path="/addevent" element={<AddEvents />} />
        <Route path="/addachievement" element={<AddAchievement />} />
        <Route path="/editblogs/:id" element={<EditBlogs />} />
        <Route path="/editevents/:id" element={<EditEvent />} />
        <Route path="/editachievement/:id" element={<EditAchievement />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/eventpage" element={<Eventpage />} />
      </Routes>

      {!hideNavbar && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
