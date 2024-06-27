import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const AdminSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    class: '',
    date: null,
    subject: '',
    time: ''
  });
  const [editing, setEditing] = useState(null);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('/api/schedules');
      setSchedules(response.data);
    } catch (err) {
      console.error('Error fetching schedules:', err);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleChange = (e) => {
    setNewSchedule({
      ...newSchedule,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date) => {
    setNewSchedule({
      ...newSchedule,
      date
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const scheduleData = {
        ...newSchedule,
        date: newSchedule.date ? newSchedule.date.toISOString().split('T')[0] : null
      };

      if (editing) {
        await axios.put(`/api/schedules/${editing.id}`, scheduleData);
      } else {
        await axios.post('/api/schedules', scheduleData);
      }
      setNewSchedule({ class: '', date: null, subject: '', time: '' });
      setEditing(null);
      fetchSchedules();
    } catch (err) {
      console.error('Error saving schedule:', err);
    }
  };

  const handleEdit = (schedule) => {
    setNewSchedule({
      class: schedule.class,
      date: new Date(schedule.date),
      subject: schedule.subject,
      time: schedule.time
    });
    setEditing(schedule);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/schedules/${id}`);
      fetchSchedules();
    } catch (err) {
      console.error('Error deleting schedule:', err);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Gérer l'Emploi du Temps</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Classe</InputLabel>
              <Select
                label="Classe"
                name="class"
                value={newSchedule.class}
                onChange={handleChange}
                required
              >
                <MenuItem value="CM1">CM1</MenuItem>
                <MenuItem value="CM2">CM2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={newSchedule.date}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Sujet"
              name="subject"
              value={newSchedule.subject}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Heure"
              name="time"
              value={newSchedule.time}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {editing ? 'Mettre à Jour' : 'Ajouter'}
            </Button>
          </Grid>
        </Grid>
      </form>
      <List>
        {schedules.map((schedule) => (
          <ListItem key={schedule.id} divider>
            <ListItemText
              primary={`${schedule.class} - ${new Date(schedule.date).toLocaleDateString()} - ${schedule.subject} (${schedule.time})`}
            />
            <IconButton onClick={() => handleEdit(schedule)}><Edit /></IconButton>
            <IconButton onClick={() => handleDelete(schedule.id)}><Delete /></IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdminSchedule;
