import '../App.css';
import JoinButton from './JoinButton';

const SupportUs = () => {
  return (
    <section className="support-section">
      <h2 className="support-title">Contact Us</h2>
      <form
        className="support-form"
        action="https://formspree.io/f/mwpqbabd" 
        method="POST"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Your Query"
          required
        />
        <JoinButton>Send Message</JoinButton>
      </form>
    </section>
  );
};

export default SupportUs;
