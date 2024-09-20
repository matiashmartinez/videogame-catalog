// src/Routes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import App from './App';
import Catalogo from './Catalogo';
import ScrollToTopButton from './ScrollToTopButton';
import './App.css';

const RoutesComponent = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/catalogo">Catálogo</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/catalogo" element={<Catalogo />} />
      </Routes>
      <ScrollToTopButton />
    </Router>
  );
};

export default RoutesComponent;
