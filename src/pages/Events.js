import React, { useEffect } from 'react';
import { useEventContext } from '../context/EventContext';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const Events = () => {
  const { events, fetchEvents } = useEventContext();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Événements à venir</Typography>
      <List>
        {events.length > 0 ? events.map(event => (
          <ListItem key={event.id}>
            <ListItemText primary={event.title} secondary={event.date} />
          </ListItem>
        )) : (
          <Typography variant="body1">Aucun événement à venir.</Typography>
        )}
      </List>
    </div>
  );
};

export default Events;
