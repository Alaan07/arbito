import React from 'react';
import '../App.css';
import student1 from '../assets/student1.webp';
import student2 from '../assets/student2.webp';
import student3 from '../assets/student3.webp';
import SEO from './SEO';

const ContactPage = () => {
  return (
    <div className="arbito-gallery">

    <SEO
        title="Contact Arbito - Get in Touch"
        description="Have questions or suggestions? Reach out to the Arbito team for collaboration, support, or inquiries."
        url="https://yourdomain.com/contact"
      />




      <h1 className="gallery-title">Contact Us</h1>
      <p className="gallery-subtext">Click an avatar or the label below to connect 👋</p>

      <div className="student-lineup">
        {/* Student 1 – Mail */}
        <div className="student-block">
          <a href="mailto:arbitostudentcommunity@gmail.com" target="_blank" rel="noopener noreferrer">
            <img src={student1} alt="Student 1" className="student-avatar active-hover" />
          </a>
          <a href="mailto:arbitostudentcommunity@gmail.com" target="_blank" rel="noopener noreferrer" className="avatar-link">
            Mail Us
          </a>
        </div>

        {/* Student 2 – Instagram */}
        <div className="student-block">
          <a href="https://www.instagram.com/arbito2025?igsh=N3Q3ZjQ2YjF5bW1n" target="_blank" rel="noopener noreferrer">
            <img src={student2} alt="Student 2" className="student-avatar active-hover" />
          </a>
          <a href="https://www.instagram.com/arbito2025?igsh=N3Q3ZjQ2YjF5bW1n" target="_blank" rel="noopener noreferrer" className="avatar-link">
            Instagram
          </a>
        </div>

        {/* Student 3 – LinkedIn */}
        <div className="student-block">
          <a href="https://www.linkedin.com/company/arbito-student-community/" target="_blank" rel="noopener noreferrer">
            <img src={student3} alt="Student 3" className="student-avatar active-hover" />
          </a>
          <a href="https://www.linkedin.com/company/arbito-student-community/" target="_blank" rel="noopener noreferrer" className="avatar-link">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
