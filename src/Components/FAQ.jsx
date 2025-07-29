import React, { useState } from 'react';
import '../App.css';

const faqs = [
  {
    question: 'What is this platform about?',
    answer: 'A community-driven initiative offering free education to all, championing equal access to quality learning.',
  },
  {
    question: ' Who can join this community?',
    answer: 'Any student or learner who is eager to learn and grow is welcome to join. We do not have any age, location, or academic restrictions.',
  },
  {
    question: 'How do I stay updated about upcoming sessions?',
    answer: 'Stay updated by following us on social media and joining our WhatsApp community.',
  },
  {
    question: 'Who do I contact for support?',
    answer: 'Reach out via the contact page or email.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-grid">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item" onClick={() => toggle(index)}>
            <h3 className="faq-question">{faq.question}</h3>
            {activeIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;