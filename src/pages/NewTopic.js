import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';

const NewTopic = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { currentUser } = useUserContext();
  const navigate = useNavigate();

  const handleCreateTopic = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      await axios.post('http://localhost:5000/api/forum/topics', { title, content }, config);
      navigate('/forum');
    } catch (error) {
      alert('Erreur lors de la création du sujet');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Nouveau Sujet
        </Typography>
        <TextField
          label="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contenu"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button variant="contained" color="primary" onClick={handleCreateTopic}>
          Créer
        </Button>
      </Box>
    </Container>
  );
};

export default NewTopic;
