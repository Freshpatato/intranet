import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container, TextField } from '@mui/material';
import { useUserContext } from '../context/UserContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser } = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/ldap/login', { username, password })
      .then(response => {
        setMessage(response.data.message);
        setCurrentUser({ name: username, roles: response.data.roles || [] });
        navigate('/');
      })
      .catch(error => {
        setMessage(error.response ? error.response.data.message : 'Authentication failed');
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          {message && (
            <Typography variant="body2" color="error">
              {message}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
