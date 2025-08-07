import React, { useEffect, useState } from "react";
import axios from "../api/axios.js";
import "../Styles/Event.css";

const EventHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [achievements, setAchievements] = useState([]);

  // Fetch events and achievements
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventRes = await axios.get("/api/eventspage");
        const achievementRes = await axios.get("/api/achivementspage");
        setEvents(eventRes.data);
        setAchievements(achievementRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // Rotate achievements for highlight
  useEffect(() => {
    if (achievements.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % achievements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [achievements]);

  const EventCard = ({
    title,
    image,
    startDate,
    endDate,
    location,
    time,
    speakers,
    description,
  }) => (
    <div className="event-card-events">
      <img src={image} alt={title} className="event-image-events" />
      <div className="event-details-events">
        <h3 className="event-title-events">{title}</h3>
        <p>
          <strong>Date:</strong> {startDate} - {endDate}
        </p>
        <p>
          <strong>Location:</strong> {location}
        </p>
        <button
          className="event-see-more-btn"
          onClick={() => {
            setSelectedEvent({
              title,
              image,
              startDate,
              endDate,
              location,
              time,
              speakers,
              description,
            });
            setShowModal(true);
          }}
        >
          See More
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* Hero Banner */}
      <section className="hero-section-events">
        <div className="hero-content-events">
          <h1 className="hero-title-events">
            Engaging activities fostering learning,
            <br />
            innovation, collaboration,
            <br />
            and community growth.🌍
          </h1>
          <p className="hero-description-events">
            Join the largest global student community online and explore
            opportunities beyond the classroom.
          </p>
          <a
            href="https://forms.gle/fKL8ULVgL6CTQ8Cb7"
            className="cta-button-events"
            target="_blank"
            rel="noopener noreferrer"
          >
            Study Together Now
          </a>
        </div>
      </section>

      {/* Events Section */}
      <div className="section-heading">Upcoming Events</div>
      <div className="event-card section">
        {events.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            image={event.thumbnail}
            startDate={event.startdate}
            endDate={event.enddate}
            location={event.location}
            time={event.time}
            speakers={event.Speaker}
            description={event.content}
          />
        ))}
      </div>

      {/* Achievements Section */}
      {achievements.length > 0 && (
        <>
          <div className="section-heading">Recent Achievements</div>

          {/* Highlighted Achievement (rotating) */}
          <div className="achievement-section big-achievement">
            <img
              src={achievements[currentIndex].thumbnail}
              alt={achievements[currentIndex].title}
              className="achievement-image-large"
            />
            <div className="achievement-content-large">
              <h3>{achievements[currentIndex].title}</h3>
              <p>{achievements[currentIndex].content}</p>
            </div>
          </div>

          {/* Achievement 1 - Reverse */}
          {achievements[1] && (
            <div className="achievement-section reverse-achievement">
              <div className="achievement-content">
                <h3>{achievements[1].title}</h3>
                <p>{achievements[1].content}</p>
              </div>
              <img
                src={achievements[1].thumbnail}
                alt={achievements[1].title}
                className="achievement-image"
              />
            </div>
          )}

          {/* Achievement 2 - Normal */}
          {achievements[2] && (
            <div className="achievement-section">
              <img
                src={achievements[2].thumbnail}
                alt={achievements[2].title}
                className="achievement-image"
              />
              <div className="achievement-content">
                <h3>{achievements[2].title}</h3>
                <p>{achievements[2].content}</p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {showModal && selectedEvent && (
        <div
          className="event-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="event-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="event-modal-image"
            />
            <div className="event-modal-content">
              <h2>{selectedEvent.title}</h2>
              <p>
                <strong>Date:</strong> {selectedEvent.startDate} -{" "}
                {selectedEvent.endDate}
              </p>
              <p>
                <strong>Time:</strong> {selectedEvent.time}
              </p>
              <p>
                <strong>Location:</strong> {selectedEvent.location}
              </p>
              <p>
                <strong>Speakers:</strong> {selectedEvent.speakers}
              </p>
              <p>
                <strong>Description:</strong> {selectedEvent.description}
              </p>
              <button
                className="event-modal-close"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventHero;
