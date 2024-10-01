import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Catalogo from './Catalogo';
import Footer from './Footer';




import './App.css';
import Header from './Header';
import ScrollToTopButton from './ScrollToTopButton';

const RouterController = () => {
  return (
    <Router>
     <div className='contenedor'>
     <Header />
      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/catalogo" element={<Catalogo />} />
      
      </Routes>
      <ScrollToTopButton />
     <Footer />
     </div>
      
    </Router>
  );
};

export default RouterController;
