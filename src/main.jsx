import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { WhatsappProvider } from './context/WhatsappContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <WhatsappProvider>
        <App />
      </WhatsappProvider>
    </BrowserRouter>
  </React.StrictMode>
);
