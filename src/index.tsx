import React from 'react';
import ReactDOM from 'react-dom/client';
import Popup from './components/popup/Popup';

const root = ReactDOM.createRoot(document.getElementById('react-root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
