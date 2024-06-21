import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';

const TopicDetails = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [newComment, setNewComment] = useState('');
  const { currentUser } = useUserContext();

  useEffect(() => {
    const fetchTopic = async () => {
      const response = await axios.get(`http://localhost:5000/api/forum/topics/${id}`);
      setTopic(response.data);
    };

    fetchTopic();
  }, [id]);

  const handleAddComment = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      const response = await axios.post(`http://localhost:5000/api/forum/topics/${id}/comments`, { content: newComment }, config);
      setTopic({ ...topic, comments: [...topic.comments, response.data] });
      setNewComment('');
    } catch (error) {
      alert('Erreur lors de l\'ajout du commentaire');
    }
  };

  if (!topic) {
    return <Typography>Chargement...</Typography>;
  }

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>{topic.title}</Typography>
        <Typography variant="body1" gutterBottom>{topic.content}</Typography>
        <Typography variant="caption" display="block" gutterBottom>Posté par {topic.author}</Typography>
        <List>
          {topic.comments.map((comment) => (
            <ListItem key={comment._id}>
              <ListItemText primary={comment.content} secondary={`Posté par ${comment.author}`} />
            </ListItem>
          ))}
        </List>
        {currentUser && (
          <Box mt={2}>
            <TextField
              label="Nouveau Commentaire"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={2}
            />
            <Button variant="contained" color="primary" onClick={handleAddComment}>
              Ajouter Commentaire
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default TopicDetails;
