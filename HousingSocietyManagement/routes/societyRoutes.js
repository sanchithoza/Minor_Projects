const express = require('express');
const router = express.Router();
const Society = require('../models/society');

// Create a new society
router.post('/', async (req, res) => {
  try {
    const society = new Society(req.body);
    const savedSociety = await society.save();
    res.status(201).json(savedSociety);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all societies
router.get('/', async (req, res) => {
  try {
    const societies = await Society.find();
    res.json(societies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific society by ID
router.get('/:id', async (req, res) => {
  try {
    const society = await Society.findById(req.params.id);
    if (society) {
      res.json(society);
    } else {
      res.status(404).json({ message: 'Society not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a society
router.put('/:id', async (req, res) => {
  try {
    const updatedSociety = await Society.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedSociety) {
      res.json(updatedSociety);
    } else {
      res.status(404).json({ message: 'Society not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a society
router.delete('/:id', async (req, res) => {
  try {
    const deletedSociety = await Society.findByIdAndDelete(req.params.id);
    if (deletedSociety) {
      res.json({ message: 'Society deleted' });
    } else {
      res.status(404).json({ message: 'Society not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
