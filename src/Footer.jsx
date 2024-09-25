import ScrollToTopButton from "./ScrollToTopButton";
import './App.css';
const Footer = () => {
  return (
    <div >
      <footer className="footer">
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-button"
        >
          Contactar por WhatsApp
        </a>
      </footer>
      <ScrollToTopButton />
    </div>
    
  );
};

export default Footer;
