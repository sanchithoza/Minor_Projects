const express = require('express');
const router = express.Router();
const Resident = require('../models/resident');

// Create a new resident
router.post('/residents', async (req, res) => {
  try {
    const resident = new Resident(req.body);
    const savedResident = await resident.save();
    res.status(201).json(savedResident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all residents
router.get('/residents', async (req, res) => {
  try {
    const residents = await Resident.find();
    res.json(residents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific resident by ID
router.get('/residents/:id', async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);
    if (resident) {
      res.json(resident);
    } else {
      res.status(404).json({ message: 'Resident not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a resident
router.put('/residents/:id', async (req, res) => {
  try {
    const updatedResident = await Resident.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedResident) {
      res.json(updatedResident);
    } else {
      res.status(404).json({ message: 'Resident not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a resident
router.delete('/residents/:id', async (req, res) => {
  try {
    const deletedResident = await Resident.findByIdAndDelete(req.params.id);
    if (deletedResident) {
      res.json({ message: 'Resident deleted' });
    } else {
      res.status(404).json({ message: 'Resident not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;