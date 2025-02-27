import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initEmailJS } from './lib/emailjs.ts';

// Initialize EmailJS with your user ID
// Replace 'user_yourPublicKey' with your actual EmailJS user ID
initEmailJS('user_yourPublicKey');

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);