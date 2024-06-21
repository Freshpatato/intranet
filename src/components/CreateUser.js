import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const { currentUser } = useUserContext();

  const handleCreateUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      const { data } = await axios.post('http://localhost:5000/api/auth/create', { username, password, role }, config);
      alert(`Utilisateur ${data.username} créé avec succès`);
    } catch (error) {
      alert(`Erreur lors de la création de l'utilisateur: ${error.response.data.message}`);
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '100px' }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Créer un utilisateur
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
        <Button variant="contained" color="primary" onClick={handleCreateUser}>
          Créer
        </Button>
      </Box>
    </Container>
  );
};

export default CreateUser;
