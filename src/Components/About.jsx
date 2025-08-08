import React from 'react';
import '../App.css';
import AboutArbitoBanner from './AboutArbitoBanner';
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
import SEO from './SEO';
const members = [
  {
    name: 'Divya M',
    college: 'Reva University',
    image: coremember1,
    field: 'Role',
    link: 'https://www.linkedin.com/in/divya-pradeep-21a538365?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
  },
  {
    name: 'riya-shaikh',
    college: 'Dayananda Sagar University',
    image: coremember2,
    field: ' Role',
    link: 'https://www.linkedin.com/in/riya-shaikh-a49771307'
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
    name: 'N Janani Yadav',
    college: ' Jain (Deemed-to-be University)',
    image: coremember11,
    field: 'Role',
    link: 'https://www.linkedin.com/in/jay4janani?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
  },
  {
    name: 'Harsha B',
    college: 'AMC engineering college',
    image: coremember12,
    field: 'Role',
    link: 'https://www.linkedin.com/in/harsha-b-b-975882310/'
  }
];

const About = () => {
  return (
    <>

    <SEO
        title="About Arbito - Our Vision and Mission"
        description="Learn more about Arbito's mission to empower students through collaboration, mentorship, and real-world experience."
        url="https://yourdomain.com/about"
      />




      <AboutArbitoBanner />
      <section className="about-section">
        <div className="about-header">
          <h2 className="about-title">
            Meet the <span className="about-highlight">Core Committee</span> Members
          </h2>
          <p className="about-subtitle">
            A collective of passionate innovators leading the change.
          </p>
        </div>

        <div className="about-team-grid">
          {members.map((member, index) => (
            <div className="about-card" key={index}>
            <div className="about-card-category">{member.field}</div>
            <img src={member.image} alt={member.name} className="about-card-img" />
            <h3 className="about-card-name">{member.name}</h3>
            <p className="about-card-college">{member.college}</p>
            <a href={member.link} target="_blank" rel="noopener noreferrer">
              <button className="about-card-btn">More details</button>
            </a>
          </div>
          ))}
        </div>
        
      </section>
    </>
  );
};

export default About;
