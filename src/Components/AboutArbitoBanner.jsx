import '../App.css';
import studentGroup from '../assets/student-group.webp'; 

const AboutArbitoBanner = () => {
  return (
    <section className="arbito-banner">
      <div className="student-image">
        <img src={studentGroup} alt="Student group" />
      </div>
      <div className="content">
        <h2 className="heading">About Arbito</h2>
        <p className="description">
          Arbito Student Community bridges the gap between academic learning and real-world tech skills through workshops, projects, and hands-on training. We aim to build a collaborative ecosystem where students inspire, mentor, and grow together with practical experiences.
        </p>
      </div>
    </section>
  );
};

export default AboutArbitoBanner;
