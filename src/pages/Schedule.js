import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';
import { Box, Typography } from '@mui/material';

const localizer = momentLocalizer(moment);

const Schedule = () => {
  const { currentUser } = useUserContext();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (currentUser) {
      axios.get('/api/ldap/schedule', {
        params: {
          roles: currentUser.roles
        }
      })
      .then(response => {
        // Convertir l'emploi du temps en format compatible avec react-big-calendar
        const schedule = response.data.map(item => ({
          title: item.subject,
          start: new Date(`2023-05-01T${item.time.split(' - ')[0]}:00`),
          end: new Date(`2023-05-01T${item.time.split(' - ')[1]}:00`),
          allDay: false,
          resource: item
        }));
        setEvents(schedule);
      })
      .catch(error => {
        console.error('Error fetching schedule:', error);
      });
    }
  }, [currentUser]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Emploi du Temps</Typography>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        defaultView="week"
        views={['week', 'day']}
        step={30}
        timeslots={2}
        min={new Date(2023, 5, 1, 8, 0)} // Début de la journée à 8h00
        max={new Date(2023, 5, 1, 19, 0)} // Fin de la journée à 19h00
      />
    </Box>
  );
};

export default Schedule;
