import React, { useState } from 'react';
import { Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField, Container } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);

  const handleAddAssignment = (assignment) => {
    if (currentAssignment) {
      setAssignments(assignments.map(a => a === currentAssignment ? assignment : a));
      setCurrentAssignment(null);
    } else {
      setAssignments([...assignments, { ...assignment, id: Date.now() }]);
    }
    setOpen(false);
  };

  const handleEditAssignment = (assignment) => {
    setCurrentAssignment(assignment);
    setOpen(true);
  };

  const handleDeleteAssignment = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  return (
    <Container>
      <Typography variant="h4">Gestion des Devoirs et Assignations</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Ajouter une assignation
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{currentAssignment ? "Modifier l'assignation" : "Ajouter une nouvelle assignation"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Titre"
            fullWidth
            margin="normal"
            defaultValue={currentAssignment ? currentAssignment.title : ''}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            defaultValue={currentAssignment ? currentAssignment.description : ''}
          />
          <TextField
            label="Date d'échéance"
            type="date"
            fullWidth
            margin="normal"
            defaultValue={currentAssignment ? currentAssignment.dueDate : ''}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={() => {
            const newAssignment = {
              title: document.querySelector('input[label="Titre"]').value,
              description: document.querySelector('input[label="Description"]').value,
              dueDate: document.querySelector('input[type="date"]').value,
              id: currentAssignment ? currentAssignment.id : Date.now(),
            };
            handleAddAssignment(newAssignment);
          }} color="primary">
            {currentAssignment ? "Modifier" : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>
      <List>
        {assignments.map((assignment) => (
          <ListItem key={assignment.id}>
            <ListItemText
              primary={assignment.title}
              secondary={`${assignment.dueDate} - ${assignment.description}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleEditAssignment(assignment)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDeleteAssignment(assignment.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Assignments;
