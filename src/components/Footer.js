import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      sx={{
        width: '100%',
        bgcolor: '#FFC107',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        position: 'fixed',
        bottom: 0,
      }}
    >
      <Typography variant="body1" color="textPrimary">
        bee-nary.fr
      </Typography>
      <Typography variant="body1" color="textPrimary">
        Email: contact@bee-nary.fr
      </Typography>
    </Box>
  );
};

export default Footer;
