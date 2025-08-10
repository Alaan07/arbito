import '../Styles/about.css';
import Vision from '../assets/vision_image.png'; // Ensure your image is named accordingly

const VisionBanner = () => {
  return (
    <section className="vision-banner ">
      <div className="vision-image">
        <img src={Vision} alt="vision" />
      </div>
      <div className="vision-content">
        <h2 className="vision-heading"> Our Vision</h2>
        <p className="vision-description">
          To build a student-powered ecosystem where learning turns into action, and passion leads to purpose.
          Arbito envisions a future where every student becomes a leader of change.
        </p>
      </div>
    </section>
  );
};

export default VisionBanner;
