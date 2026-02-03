import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './globals.css';

import Calendar from '../index.jsx';

function App() {
  return (
    <div>
      <Calendar />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
