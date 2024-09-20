import React, { useEffect, useState } from 'react';
import './app.css'; // Asegúrate de que los estilos estén incluidos

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="scroll-to-top" 
      onClick={scrollToTop} 
      style={{ display: visible ? 'block' : 'none' }}
    >
      &#9650; {/* Flecha hacia arriba */}
    </div>
  );
};

export default ScrollToTopButton;
