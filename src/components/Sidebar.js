import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ForumIcon from '@mui/icons-material/Forum';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Sidebar = ({ isAdmin }) => {
  return (
    <div style={{ width: 250, backgroundColor: '#f0f0f0', height: '100vh', position: 'relative' }}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/students">
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary="Etudiants" />
        </ListItem>
        <ListItem button component={Link} to="/teachers">
          <ListItemIcon><SchoolIcon /></ListItemIcon>
          <ListItemText primary="Enseignents" />
        </ListItem>
        <ListItem button component={Link} to="/events">
          <ListItemIcon><EventIcon /></ListItemIcon>
          <ListItemText primary="Evenements" />
        </ListItem>
        <ListItem button component={Link} to="/resources">
          <ListItemIcon><AssignmentIcon /></ListItemIcon>
          <ListItemText primary="Resources" />
        </ListItem>
        <ListItem button component={Link} to="/forum">
          <ListItemIcon><ForumIcon /></ListItemIcon>
          <ListItemText primary="Forum" />
        </ListItem>
        {isAdmin && (
          <ListItem button component={Link} to="/admin">
            <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon>
            <ListItemText primary="Admin Dashboard" />
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default Sidebar;
