import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './globals.css';

import Calendar from '../index.jsx';

function App() {
  const selectedDates = [
    { day: "2026-01-31", 
      href: "/journal/1234567" 
    },
    {
      day: "2026-02-01",
      href: "/journal/february"
    }
  ];
  return (
    <div>
      <Calendar selectedDates={selectedDates} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
