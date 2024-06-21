import React, { useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import { Avatar, Box, Typography } from '@mui/material';

const UserProfile = () => {
  const { currentUser } = useUserContext();

  useEffect(() => {
    console.log('UserProfile currentUser:', currentUser);
  }, [currentUser]);

  if (!currentUser) {
    return null; // Ou affichez un message de chargement
  }

  return (
    <Box display="flex" alignItems="center">
      <Avatar>
        {currentUser.name && currentUser.name.charAt(0)}
      </Avatar>
      <Typography variant="h6" component="h1" style={{ marginLeft: 10 }}>
        {currentUser.name}
      </Typography>
    </Box>
  );
};

export default UserProfile;
