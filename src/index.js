import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ReactGA from 'react-ga4';

// 🔥 ЗАМЕНИТЕ НА СВОЙ ID!
ReactGA.initialize('G-VD91YLFB26');

// Отслеживаем переходы между страницами
ReactGA.send({ hitType: 'pageview', page: window.location.pathname });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


