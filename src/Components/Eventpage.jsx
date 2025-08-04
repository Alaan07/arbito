import React, { useEffect, useState } from "react";
import "../Styles/Event.css";

const EventHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null); // ⬅️ For modal
  const [showModal, setShowModal] = useState(false);

  const EventCard = ({ title, image, startDate, endDate, location, time, speakers, description }) => (
    <div className="event-card-events">
      <img src={image} alt={title} className="event-image-events" />
      <div className="event-details-events">
        <h3 className="event-title-events">{title}</h3>
        <p><strong>Date:</strong> {startDate} - {endDate}</p>
        <p><strong>Location:</strong> {location}</p>
        <button
          className="event-see-more-btn"
          onClick={() => {
            setSelectedEvent({ title, image, startDate, endDate, location, time, speakers, description });
            setShowModal(true);
          }}
        >
          See More
        </button>
      </div>
    </div>
  );

  const achievements = [
    {
      title: "Code Clash Champion",
      description: "Won first place in a national-level coding competition with 300+ participants.",
      image: "/img/Bg.jpg"
    },
    {
      title: "Poster Presentation Winner",
      description: "Recognized for creative poster design on AI and Ethics at a tech fest.",
      image: "/img/Eventbg.jpg"
    },
    {
      title: "Hackathon Finalist",
      description: "Reached finals in a prestigious 24-hour hackathon challenge.",
      image: "/img/braindemo.png"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % achievements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [achievements.length]);

  const { title, description, image } = achievements[currentIndex];

  return (
    <div>
      <section className="hero-section-events">
        <div className="hero-content-events">
          <h1 className="hero-title-events">
            Engaging activities fostering learning,<br />
            innovation, collaboration,<br />
            and community growth.🌍
          </h1>
          <p className="hero-description-events">
            Join the largest global student community online and Explore opportunities beyond the classroom.
          </p>
          <a href="#register" className="cta-button-events">
            Study Together now
          </a>
        </div>
      </section>

      <div className="section-heading">Upcoming Events</div>
      <div className="event-card section">
        <EventCard
          title="AI & Cloud Workshop"
          image="/img/event-img.jpg"
          startDate="August 5, 2025"
          endDate="August 6, 2025"
          location="St. Xavier's College Auditorium"
          time="11:00 AM - 1:00 PM"
          speakers="Dr. Rao, Mr. Gulati"
          description="Hands-on sessions and talks by experts on AI and Cloud Technologies."
        />
        {/* Duplicate or map more EventCards here */}
      </div>

      <div className="section-heading">Recent Achievements</div>
      <div className="achievement-slider-section">
        <div className="achievement-slide">
          <img src={image} alt={title} className="achievement-slide-image" />
          <div className="achievement-slide-content">
            <h3 className="achievement-slide-title">{title}</h3>
            <p className="achievement-slide-description">{description}</p>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && selectedEvent && (
        <div className="event-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="event-modal-card" onClick={(e) => e.stopPropagation()}>
            <img src={selectedEvent.image} alt={selectedEvent.title} className="event-modal-image" />
            <div className="event-modal-content">
              <h2>{selectedEvent.title}</h2>
              <p><strong>Date:</strong> {selectedEvent.startDate} - {selectedEvent.endDate}</p>
              <p><strong>Time:</strong> {selectedEvent.time}</p>
              <p><strong>Location:</strong> {selectedEvent.location}</p>
              <p><strong>Speakers:</strong> {selectedEvent.speakers}</p>
              <p><strong>Description:</strong> {selectedEvent.description}</p>
              <button className="event-modal-close" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventHero;
