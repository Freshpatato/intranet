import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const { register } = useUserContext();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(username, password, role);
      navigate('/login');
    } catch (error) {
      alert('Erreur lors de l\'inscription');
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '100px' }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Inscription
        </Typography>
        <TextField
          label="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rôle"
          select
          SelectProps={{ native: true }}
          value={role}
          onChange={(e) => setRole(e.target.value)}
          fullWidth
          margin="normal"
        >
          <option value="student">Élève</option>
          <option value="teacher">Professeur</option>
          <option value="admin">Administrateur</option>
        </TextField>
        <Button variant="contained" color="primary" onClick={handleRegister}>
          S'inscrire
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
