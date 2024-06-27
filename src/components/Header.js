import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar } from '@mui/material';
import { useUserContext } from '../context/UserContext';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const { currentUser, logout } = useUserContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#FFC107' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <img src="/logo.png" alt="logo" style={{ width: 60, height: 60 }} />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Intranet École Primaire
        </Typography>
        {currentUser && currentUser.name && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar>{currentUser.name.charAt(0)}</Avatar>
            <Typography variant="body1" style={{ marginLeft: 10, marginRight: 20 }}>
              {currentUser.name}
            </Typography>
            <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
              Déconnexion
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
