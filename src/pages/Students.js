import React, { useEffect, useState } from 'react';

import { List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/students');  // Vérifiez bien cette URL
        console.log('Fetched students:', response.data);
        setStudents(response.data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Liste des Élèves</Typography>
      <List>
        {students.length > 0 ? students.map(student => (
          <ListItem key={student.cn}>
            <ListItemText primary={student.cn} secondary={student.mail} />
          </ListItem>
        )) : (
          <Typography variant="body1">Aucun élève trouvé.</Typography>
        )}
      </List>
    </div>
  );
};

export default Students;
