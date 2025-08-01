import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import About from "./Components/About.jsx";

import { BrowserRouter as Router } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/dashbord";

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
        <Route path="/about" element={<About />} />
        <Route path="/addblog" element={<AddBlog />} />
        <Route path="/addevent" element={<AddEvents />} />
        <Route path="/addachievement" element={<AddAchievement />} />
        <Route path="/editblogs/:id" element={<EditBlogs />} />
        <Route path="/editevents" element={<EditEvent />} />
        <Route path="/editachievement" element={<EditAchievement />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/eventpage" element={<Eventpage />} />
      </Routes>
      <Footer />
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