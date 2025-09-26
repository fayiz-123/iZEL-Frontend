import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

// Connecting Service Worker File to app

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration) {
        const register = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker Registered:', register.scope);
      } else {
        console.log('Service Worker already registered:', registration.scope);
      }
    } catch (error) {
      console.error('Service Worker registration failed', error);
    }
  });
}
