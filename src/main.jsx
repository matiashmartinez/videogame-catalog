import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { WhatsappProvider } from './context/WhatsappContext';
import { AdminProvider } from './context/AdminContext';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminProvider>
        <WhatsappProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              className: '',
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </WhatsappProvider>
      </AdminProvider>
    </BrowserRouter>
  </React.StrictMode>
);
