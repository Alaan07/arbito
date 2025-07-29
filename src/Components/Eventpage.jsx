import React from 'react';
import '../Styles/Event.css';

const EventHero = () => {
  return (
    <section className="hero-section-events">
      <div className="hero-content-events">
        <h1 className="hero-title-events">
          Meet, chat, and study<br />
          with students from all<br />
          over the world 🌍
        </h1>
        <p className="hero-description-events">
          Join the largest global student community online and say goodbye to lack of motivation.
        </p>
        <a href="#register" className="cta-button-events">
          Study Together now
        </a>
      </div>
    </section>
  );
};

export default EventHero;
