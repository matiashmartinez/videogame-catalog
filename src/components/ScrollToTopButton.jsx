import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-green-500 to-blue-600 text-white p-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 border border-white/20 backdrop-blur-sm"
      aria-label="Subir al inicio"
    >
      <FaArrowUp size={22} />
    </button>
  );
};

export default ScrollToTopButton;
