import React from 'react';
import '../Styles/Event.css';

const EventHero = () => {
  const EventCard = ({ title, image, startDate, endDate, location }) => (
    <div className="event-card-events">
      <img src={image} alt={title} className="event-image-events" />
      <div className="event-details-events">
        <h3 className="event-title-events">{title}</h3>
        <p className="event-date-events">
          <strong>Date:</strong> {startDate} - {endDate}
        </p>
        <p className="event-location-events">
          <strong>Location:</strong> {location}
        </p>
      </div>
    </div>
  );

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

      <div className="event-card section">
        <EventCard
          title="AI & Cloud Workshop"
          image="/img/event-img.jpg"
          startDate="August 5, 2025"
          endDate="August 6, 2025"
          location="St. Xavier's College Auditorium"
        />

        <EventCard
          title="AI & Cloud Workshop"
          image="/img/event-img.jpg"
          startDate="August 5, 2025"
          endDate="August 6, 2025"
          location="St. Xavier's College Auditorium"
        />
        <EventCard
          title="AI & Cloud Workshop"
          image="/img/event-img.jpg"
          startDate="August 5, 2025"
          endDate="August 6, 2025"
          location="St. Xavier's College Auditorium"
        />
        <EventCard
          title="AI & Cloud Workshop"
          image="/img/event-img.jpg"
          startDate="August 5, 2025"
          endDate="August 6, 2025"
          location="St. Xavier's College Auditorium"
        />
      </div>
    </div>
  );
};

export default EventHero;
