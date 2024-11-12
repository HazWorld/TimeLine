import React, { useState } from 'react';
import './App.css';
import EventForm from './components/EventForm';
import Timeline from './components/Timeline';

function App() {
  const [events, setEvents] = useState([]);

  const addEvent = (text, date) => {
    setEvents([...events, { text, date }]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Timeline App</h1>
        <EventForm addEvent={addEvent} />
        <Timeline events={events} />
      </header>
    </div>
  );
}

export default App;