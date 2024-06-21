import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch events', error);
    }
  };

  const addEvent = async (newEvent) => {
    try {
      const response = await axios.post('/api/events', newEvent);
      setEvents([...events, response.data]);
    } catch (error) {
      console.error('Failed to add event', error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`/api/events/${eventId}`);
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Failed to delete event', error);
    }
  };

  const updateEvent = async (updatedEvent) => {
    try {
      const response = await axios.put(`/api/events/${updatedEvent.id}`, updatedEvent);
      setEvents(events.map(event => (event.id === updatedEvent.id ? response.data : event)));
    } catch (error) {
      console.error('Failed to update event', error);
    }
  };

  return (
    <EventContext.Provider value={{ events, fetchEvents, addEvent, deleteEvent, updateEvent }}>
      {children}
    </EventContext.Provider>
  );
};
