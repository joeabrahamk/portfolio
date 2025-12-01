import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// AOS (Animate On Scroll) - initialize once for the entire app
import AOS from 'aos';
import 'aos/dist/aos.css';

// initialize AOS once with `once: true` so animations run only once per element
AOS.init({ once: true, duration: 600 });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

