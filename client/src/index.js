/**
 * Application Entry Point
 * 
 * Main entry file that initializes the React application.
 * Sets up the React DOM root, Router context, and global styles.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import 'react-toastify/dist/ReactToastify.css';

// Module Imports
import './index.css';
import App from './App';

// Create React root and render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);
