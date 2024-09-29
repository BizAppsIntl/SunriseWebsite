import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';

import { HashRouter, BrowserRouter } from 'react-router-dom';
// {/* HashRouter is used for ElectronApp */}


import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
    
    <App />
    
    </BrowserRouter>
  </React.StrictMode>
);

