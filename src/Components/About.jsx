import React, { useRef, useEffect, useState } from "react";
import Slider from 'react-slick';
import '../Styles/about.css';
import AboutArbitoBanner from './AboutArbitoBanner';
import VisionBanner from './VisionBanner';
import coremember1 from '../assets/core_members_images/core_member_1.jpeg';
import coremember2 from '../assets/core_members_images/core_member_2.jpeg';
import coremember3 from '../assets/core_members_images/core_member_3.jpeg';
import coremember4 from '../assets/core_members_images/core_member_4.jpeg';
import coremember5 from '../assets/core_members_images/core_member_5.jpeg';
import coremember6 from '../assets/core_members_images/core_member_6.jpeg';
import coremember7 from '../assets/core_members_images/core_member_7.jpeg';
import coremember8 from '../assets/core_members_images/core_member_8.jpeg';
import coremember9 from '../assets/core_members_images/core_member_9.jpeg';
import coremember10 from '../assets/core_members_images/core_member_10.jpeg';
import coremember11 from '../assets/core_members_images/core_member_11.jpeg';
import coremember12 from '../assets/core_members_images/core_member_12.jpeg';
import coremember13 from '../assets/core_members_images/core_member_13.jpg';
import coremember14 from '../assets/core_members_images/core_member_14.jpg';
import coremember15 from '../assets/core_members_images/core_member_15.jpg';
import coremember16 from '../assets/core_members_images/core_member_16.jpg';
import coremember17 from '../assets/core_members_images/core_member_17.jpg';
import coremember18 from '../assets/core_members_images/core_member_18.jpg';
import coremember19 from '../assets/core_members_images/core_member_19.jpg';
import founderImage from '../assets/core_members_images/founder.jpeg';
import coFounder1 from '../assets/core_members_images/cofounder1.jpeg';
import coFounder2 from '../assets/core_members_images/cofounder2.jpeg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


const founder = [
  {
    name: 'Mohmmed Raiyan Khan',
    college: 'college',
    image: founderImage ,
    field: 'Role',
    link: 'https://www.linkedin.com/in/mohmmed-raiyan-khan-1340b9300?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
  },
];

const president = [
  {
    name: ' Riya Shaikh',
    college: 'Dayananda Sagar University',
    image: coFounder1,
    field: 'Role',
    link: 'https://www.linkedin.com/in/riya-shaikh-a49771307'
  },
];

const vicepresident = [
  {
    name: ' N Janani Yadav',
    college: 'Jain (Deemed-to-be University)',
    image: coFounder2,
    field: 'Role',
    link: 'https://www.linkedin.com/in/jay4janani?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
  },
];

const About = () => {

  const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const sliderMembers = [
  {
    name: 'Divya M',
    college: 'Reva University',
    image: coremember1,
    field: 'Role',
    link: 'https://www.linkedin.com/in/divya-pradeep-21a538365?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
  },
  {
    name: 'Soundarya R',
    college: ' The Oxford College of Engineering ',
    image: coremember2,
    field: ' Role',
    link: 'https://www.linkedin.com/in/soundarya-r-487954263/'
  },
  {
    name: 'Prerna Bagade',
    college: ' Medi-Caps University',
    image: coremember3,
    field: 'Role',
    link: 'https://www.linkedin.com/in/prerna-bagade'
  },
  {
    name: 'D C Yashaswini',
    college: ' brindavan group of institutions',
    image: coremember4,
    field: 'Role',
     link: 'https://www.linkedin.com/in/d-c-yashaswini-aswini-74a68032a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
  },
  {
    name: 'Rahul Raghava Ambil',
    college: 'Jain (Deemed-to-be University)',
    image: coremember5,
    field: 'Role',
    link: 'https://www.linkedin.com/in/rahul-raghava-ambil-2b82262a3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
  },
  {
    name: 'Abdul Kalam',
    college: 'Attended ICEAS',
    image: coremember6,
    field: 'Role',
    link: 'https://www.linkedin.com/in/abdulkalam7880?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
  },
  {
    name: 'Gelli Sri Satya Manikanta',
    college: 'working professional',
    image: coremember7,
    field: 'Role',
    link: 'https://www.linkedin.com/in/sri-satya-manikanta-gelli-a4b395276?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
  },
  {
    name: 'Vinayaka Reddy N V',
    college: 'S-VYASA',
    image: coremember8,
    field: 'Role',
    link: 'https://www.linkedin.com/in/vinayaka-reddy-40891123b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
  },
    {
    name: 'Pooviaha B P',
    college: 'Akash Institute of Engineering ',
    image: coremember9,
    field: 'Role',
    link: 'https://www.linkedin.com/in/pooviaha-b-p-b59226365?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
  },
  {
    name: 'Vanya kumari',
    college: 'Dayananda Sagar University',
    image: coremember10,
    field: ' Role',
    link: 'https://www.linkedin.com/in/vanya-kumari-ab079621b/'
  },
  {
    name: 'Pratibha G',
    college: ' The Oxford College of Engineering',
    image: coremember11,
    field: 'Role',
    link: 'https://www.linkedin.com/in/prathiba-g-7a2581216/'
  },
  {
    name: 'Harsha B',
    college: 'AMC engineering college',
    image: coremember12,
    field: 'Role',
    link: 'https://www.linkedin.com/in/harsha-b-b-975882310/'
  },
  //12 done
  {
    name: 'S S Keerthanya',
    college: 'Dayananda Sagar University',
    image: coremember13,
    field: 'Role',
    link: 'https://www.linkedin.com/in/keerthanya-s-s-390099360/'
  },
  {
    name: 'Prahalya anandan',
    college: 'Vijaya vittala institution of technology',
    image: coremember14,
    field: 'Role',
    link: 'https://www.linkedin.com/in/prahalya-anandan-77883b332/'
  },
  {
    name: 'Vyshnavi M V',
    college: 'Dayananad sagar University',
    image: coremember15,
    field: 'Role',
    link: 'https://www.linkedin.com/in/vyshnavi-reddy-22705a335/'
  },
  {
    name: 'Rui Norrish Dsouza',
    college: 'Jain (deemed-to-be University)',
    image: coremember16,
    field: 'Role',
    link: 'https://www.linkedin.com/in/rui-dsouza/'
  },
  {
    name: 'Ashwini Bisanalli',
    college:'Jain University',
    image: coremember17,
    field: 'Role',
    link: 'https://www.linkedin.com/in/ashwini-bisanalli-07466627a/'
  },
  {
    name:'Shreeraksha Upadhyaya',
    college:'Dayananda sagar University',
    image: coremember18,
    field:'Role',
    link:'https://www.linkedin.com/in/shreeraksha-upadhyaya-920023334/'
  },
  {
    name:'M Mansa',
    college:'Dayananda sagar University',
    image: coremember19,
    field:'Role',
    link:'https://www.linkedin.com/in/m-mansa-53b022360/'
  },
];
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
        centerPadding: '20px'
      }
    }
  ]
};

 
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (sliderRef.current) {
      sliderRef.current.slickPause();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (sliderRef.current) {
      sliderRef.current.slickPlay();
    }
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

  return (
    <>
    <AboutArbitoBanner/>
    <section className="founders-horizontal">
  <h2 className="founder-section-heading">The <span>Founders</span></h2>

  {/* Founder */}
  {sliderMembers
    .filter(member => member.image === founderImage)
    .map((founder, index) => (
      <div className="founder-horizontal-card main-founder" key={`founder-${index}`}>
        <img src={founder.image} alt="Founder" className="founder-img" />
        <div className="founder-info">
          <h3 className="slider-name">{founder.name}</h3>
          <p>Founder & Visionary</p>
          <p>I founded Arbito with a vision to build a student-led platform where learning meets real-world tech. With the support and guidance of Cynux Era, we transformed a small idea into a thriving community. Today, Arbito empowers students through hands-on workshops, innovation, and peer-driven growth. Together, we’re shaping the next generation of tech leaders.</p>
          <a
            href={founder.link}
            target="_blank"
            rel="noopener noreferrer"
            className="founder-more-details-btn"
          >
            More Details
          </a>
        </div>
      </div>
  ))}


   <div className="founders-row">
  {(() => {
    const cofounder1 = sliderMembers.find(member => member.image === coFounder1);
    return (
      cofounder1 && (
        <div className="cofounder-card" key="cofounder1">
          <img src={cofounder1.image} alt="Co-Founder 1" className="cofounder-img" />
          <div className="cofounder-info">
            <h3 className="slider-name">{cofounder1.name}</h3>
            <p>President</p>
            {/* <p className="slider-college">{cofounder1.college}</p> */}
            <p className="slider-description">
              Lead the Arbito Student Committee in empowering students through mentorship, free courses, and project support. Oversee events and initiatives to ensure smooth execution and meaningful impact.
            </p>
              <a
              href={cofounder1.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cofounder-more-details-btn"
            >
              More Details
            </a>
          </div>
        </div>
      )
    );
  })()}


  {(() => {
    const cofounder2 = sliderMembers.find(member => member.image === coFounder2);
    return (
      cofounder2 && (
        <div className="cofounder-card" key="cofounder2">
          <img src={cofounder2.image} alt="Co-Founder 2" className="cofounder-img" />
          <div className="cofounder-info">
            <h3 className="slider-name">{cofounder2.name}</h3>
            <p>Vice president</p>
            {/* <p className="slider-college">{cofounder2.college}</p> */}

            <p className="slider-description">
             As Vice President of the Arbito Student Community, I support and lead student-driven initiatives, foster collaboration, and help create impactful learning experiences that empower our tech community.
            </p>

            <a
              href={cofounder2.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cofounder-more-details-btn"
            >
              More Details
            </a>
          </div>
        </div>
      )
    );
  })()}
</div>

</section>

<VisionBanner/>
    <section className="slider-section">
      <h2 className="slider-heading">Meet Our <span>Core Members</span></h2>

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
          {sliderMembers.map((member, index) => (
            <div className="slider-card" key={index}>
              <div class="image-wrapper">
              <img src={member.image} alt={member.name} className="slider-img" />
              </div>
              <h3 className="slider-name">{member.name}</h3>
              <p className="slider-role">{member.field}</p>
              <p className="slider-college">{member.college}</p>
              <a
                href={member.link}
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
