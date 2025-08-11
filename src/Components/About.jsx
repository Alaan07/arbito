import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "../Styles/about.css";
import AboutArbitoBanner from "./AboutArbitoBanner";
import VisionBanner from "./VisionBanner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "../api/axios.js";

const About = () => {
  const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [members, setMembers] = useState([]);

  // Fetch members from API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get("/api/aboutmembersshow");
        setMembers(res.data || []);
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };
    fetchMembers();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    draggable: true,
    swipeToSlide: true,
    arrows: false,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          arrows: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          arrows: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "20px"
        }
      }
    ]
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sliderRef.current?.slickPause();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    sliderRef.current?.slickPlay();
  };

  const handleKeyDown = (e) => {
    if (!sliderRef.current) return;
    if (e.key === "ArrowLeft") {
      sliderRef.current.slickPrev();
    } else if (e.key === "ArrowRight") {
      sliderRef.current.slickNext();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered member groups
  const founder = members.find(m => m.role?.toLowerCase() === "founder");
  const president = members.find(m => m.role?.toLowerCase() === "president");
  const vicePresident = members.find(m => m.role?.toLowerCase() === "vice president");
  const coreMembers = members.filter(m => m.role?.toLowerCase() === "core-member");

  return (
    <>
      <AboutArbitoBanner />

      <section className="founders-horizontal">
        <h2 className="founder-section-heading">
          The <span>Founders</span>
        </h2>

        {/* Founder */}
        {founder && (
          <div className="founder-horizontal-card main-founder" key={founder._id}>
            <img src={founder.thumbnail} alt="Founder" className="founder-img" />
            <div className="founder-info">
              <h3 className="slider-name">{founder.name}</h3>
              <p>{founder.role} & Visionary</p>
              <p>
                {founder.discription}
              </p>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="founder-more-details-btn"
              >
                More Details
              </a>
            </div>
          </div>
        )}

        {/* Co-founders */}
        <div className="founders-row">
          {president && (
            <div className="cofounder-card" key={president._id}>
              <img
                src={president.thumbnail}
                alt="President"
                className="cofounder-img"
              />
              <div className="cofounder-info">
                <h3 className="slider-name">{president.name}</h3>
                <p>{president.role}</p>
                <p className="slider-description">
                  {president.discription}
                </p>
                <a
                  href={president.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cofounder-more-details-btn"
                >
                  More Details
                </a>
              </div>
            </div>
          )}

          {vicePresident && (
            <div className="cofounder-card" key={vicePresident._id}>
              <img
                src={vicePresident.thumbnail}
                alt="Vice President"
                className="cofounder-img"
              />
              <div className="cofounder-info">
                <h3 className="slider-name">{vicePresident.name}</h3>
                <p>{vicePresident.role}</p>
                <p className="slider-description">
                 {vicePresident.discription}
                </p>
                <a
                  href={vicePresident.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cofounder-more-details-btn"
                >
                  More Details
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <VisionBanner />

      {/* Core Members Slider */}
      <section className="slider-section">
        <h2 className="slider-heading">
          Meet Our <span>Core Members</span>
        </h2>

        <div
          className="slider-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className="arrow-button left"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <FaArrowLeft />
          </button>

          <Slider ref={sliderRef} {...settings}>
            {coreMembers.map((member) => (
              <div className="slider-card" key={member._id}>
                <div className="image-wrapper">
                  <img
                    src={member.thumbnail}
                    alt={member.name}
                    className="slider-img"
                  />
                </div>
                <h3 className="slider-name">{member.name}</h3>
                <p className="slider-role">{member.role}</p>
                <p className="slider-college">{member.university}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="more-details-btn"
                >
                  More Details
                </a>
              </div>
            ))}
          </Slider>

          <button
            className="arrow-button right"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <FaArrowRight />
          </button>
        </div>
      </section>
    </>
  );
};

export default About;
