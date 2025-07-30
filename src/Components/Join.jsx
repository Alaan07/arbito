import React, { useEffect, useRef, useState } from 'react';
import Roll1 from '../assets/Roll1.png';
import Roll2 from '../assets/Roll2.png';
import '../App.css';
import JoinButton from './JoinButton';

const Join = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`join-wrapper ${isVisible ? 'active' : ''}`} ref={sectionRef}>
      <div className="left-container">
        <img src={Roll2} alt="Student Roll 2" className={`student-img ${isVisible ? 'show' : ''}`} />
      </div>
      <div className="right-container">
        <img src={Roll1} alt="Student Roll 1" className={`student-img ${isVisible ? 'show' : ''}`} />
      </div>

      {/* 💬 Quote + Button */}
      {isVisible && (
        <div className="quote-section">
          <p className="join-quote">
            "Empower your potential—one bold step at a time."
          </p>
          <JoinButton><a
  href="https://forms.gle/fKL8ULVgL6CTQ8Cb7"
  target="_blank"
  rel="noopener noreferrer"
>
  Join Community
</a></JoinButton>
        </div>
      )}
    </div>
  );
};

export default Join;