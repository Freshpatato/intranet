const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

// Créer un nouvel emploi du temps
router.post('/', async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtenir tous les emplois du temps
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.findAll();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mettre à jour un emploi du temps
router.put('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);
    if (schedule) {
      await schedule.update(req.body);
      res.json(schedule);
    } else {
      res.status(404).json({ error: 'Schedule not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer un emploi du temps
router.delete('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);
    if (schedule) {
      await schedule.destroy();
      res.json({ message: 'Schedule deleted' });
    } else {
      res.status(404).json({ error: 'Schedule not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
