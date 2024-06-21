import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';

const Teachers = () => {
  const { currentUser } = useUserContext();
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await axios.get('/teachers');
      setTeachers(response.data);
    };
    fetchTeachers();
  }, []);

  if (!currentUser || !currentUser.roles.includes('admin')) {
    return <Typography variant="h6">Accès refusé</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>Liste des Enseignants</Typography>
      <List>
        {teachers.map(teacher => (
          <ListItem key={teacher.cn}>
            <ListItemText primary={teacher.cn} secondary={teacher.mail} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Teachers;
