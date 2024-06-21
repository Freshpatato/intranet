import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Container, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const Forum = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const response = await axios.get('http://localhost:5000/api/forum/topics');
      setTopics(response.data);
    };

    fetchTopics();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
        <Typography variant="h4">Forum</Typography>
        <Button variant="contained" color="primary" component={Link} to="/forum/new">
          Nouveau Sujet
        </Button>
      </Box>
      <List>
        {topics.map((topic) => (
          <ListItem key={topic._id} button component={Link} to={`/forum/topics/${topic._id}`}>
            <ListItemText primary={topic.title} secondary={`Posté par ${topic.author}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Forum;
