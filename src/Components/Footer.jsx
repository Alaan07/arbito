import '../App.css';
import doodleImg from '../assets/StudentDoodle.webp';
import arbitoLogo from '../assets/arbito_new_logo.webp';
import { Link} from 'react-router-dom';

const Footer = () => {

  const handleBackToHome = () => {
    sessionStorage.setItem("homeRedirectOnce", "true");
    window.location.href = "/"; // Force full reload + redirect to home
  };

  return (
    <>
      <div className="footer-spacer"></div>
      <div className="doodle-wrapper">
        <img src={doodleImg} alt="Student Doodle" className="student-doodle" />
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <Link to="/" className="logo-section">
              <img src={arbitoLogo} alt="Arbito Logo" className="logo-img" />
              <p className="logo-caption">Powered by Cynux Era</p>
            </Link>
          </div>

          <div className="footer-right">
            <div className="footer-section">
              <h3>Company</h3>
              <Link to="/about">About</Link>
              <Link to="/allblogs">Blog</Link>
              <Link to="/eventpage">Event</Link>
            </div>
            <div className="footer-section">
              <h3>Support</h3>
              <a href="/contact" className="footer-link">Contact</a>
              <a href="mailto:arbitostudentcommunity@gmail.com">Mail us</a>
            </div>
            <div className="footer-section">
              <h3>Socials</h3>
              <a href="https://www.linkedin.com/company/arbito-student-community/posts/?feedView=all">LinkedIn</a>
              <a href="https://www.instagram.com/arbito2025?igsh=N3Q3ZjQ2YjF5bW1n">Instagram</a>
            </div>
          </div>
        </div>

        <div className="footer-copy">
          <span>© 2025 Arbito. All rights reserved.</span>
          <div className="footer-links">
            <a href="/login" className="footer-link">Admin</a>
            <span onClick={handleBackToHome} className="footer-link" style={{ cursor: "pointer" }}>
              Back to Home
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
