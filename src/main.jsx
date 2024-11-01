import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Import the file
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Mount the root of the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer/>
  </StrictMode>,
);

// Register the service worker for PWA
serviceWorkerRegistration.register();
