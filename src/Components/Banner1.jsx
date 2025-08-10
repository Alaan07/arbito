import React, { useRef, useEffect } from 'react';
import '../App.css';
import studentImage from '../assets/student-image.webp';
import beeImage from '../assets/honeybee.webp';
import hibiscusImage from '../assets/hibiscus.webp'; 
const Banner1 = () => {
  const bannerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        bannerRef.current.classList.add('animate');
      }
    });

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  return (
    <section className="banner1" ref={bannerRef}>
      <div className="banner-content">
        <div className="text-box">
          <img src={hibiscusImage} alt="Hibiscus" className="hibiscus hibiscus-left" />
          <h1 className="quote">Your journey to Knowledge</h1>
          <p className="subquote">Let ideas bloom with every stride.</p>
        </div>

        <img src={studentImage} alt="Student" className="banner-img" />
        <div className="buzz-container">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              src={beeImage}
              alt="Flying Bee"
              className={`flying-buzz buzz-${i}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner1;