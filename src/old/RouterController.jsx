import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Catalogo from './Catalogo';
import Footer from './Footer';




import './App.css';

import ScrollToTopButton from './ScrollToTopButton';


const RouterController = () => {
  return (
    <Router>
     
    
      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/catalogo" element={<Catalogo />} />
        
      </Routes>
      
     <Footer />
     <ScrollToTopButton />
      
    </Router>
  );
};

export default RouterController;
