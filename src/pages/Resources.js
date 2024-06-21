import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const resources = [
  { id: 1, name: 'Manuel de Mathématiques', link: '#' },
  { id: 2, name: 'Guide de Français', link: '#' },
  // Ajoutez plus de ressources ici
];

const Resources = () => {
  return (
    <div>
      <Typography variant="h4">Ressources</Typography>
      <List>
        {resources.map((resource) => (
          <ListItem key={resource.id} button component="a" href={resource.link}>
            <ListItemText primary={resource.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Resources;
