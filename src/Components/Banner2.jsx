import React, { useRef, useEffect } from 'react';
import '../App.css';
import studentImage from '../assets/student-banner.png';
import beeImage from '../assets/honeybee.png';
import hibiscusImage from '../assets/hibiscus.png'; 
const Banner2 = () => {
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
          <h1 className="quote">From Preparation to Perfection</h1>
          <p className="subquote">Unlock your future with quality education.</p>
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

export default Banner2;