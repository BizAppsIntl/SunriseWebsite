import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import './App.css';
import App from './App';
import { CtxMainProvider } from './CtxMain';

import { HashRouter, BrowserRouter } from 'react-router-dom';
// {/* HashRouter is used for ElectronApp */}
//     BrowserRouter for React App

import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>   {/*or HashRouter is used for ElectronApp */}
    <CtxMainProvider> 

    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />    
    <App />

    </CtxMainProvider>    
    </BrowserRouter>
  </React.StrictMode>
);

