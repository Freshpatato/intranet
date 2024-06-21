import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const EventList = ({ events }) => {
  return (
    <div>
      <Typography variant="h6">Événements à venir</Typography>
      <List>
        {events.map((event, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={event.title}
              secondary={`${event.date} - ${event.description}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default EventList;
