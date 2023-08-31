const express = require('express');
const router = express.Router();
const Maintenance = require('../models/maintenance');

// Create a new maintenance transaction entry
router.post('/', async (req, res) => {
  try {
    const maintenanceTransaction = new Maintenance(req.body);
    const savedMaintenance = await maintenanceTransaction.save();
    res.json(savedMaintenance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all maintenance transactions for a resident
router.get('/resident/:residentId', async (req, res) => {
  try {
    const maintenanceTransactions = await Maintenance.find({ residentId: req.params.residentId });
    res.json(maintenanceTransactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get all maintenance transactions for a society
router.get('/society/:societyId', async (req, res) => {
    try {
      const maintenanceTransactions = await Maintenance.find({ societyId: req.params.residentId });
      res.json(maintenanceTransactions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Get all maintenance transactions for all societies and residents
router.get('/', async (req, res) => {
    try {
      const maintenanceTransactions = await Maintenance.find();
      res.json(maintenanceTransactions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Other routes for updating and deleting maintenance transactions
// Update a maintenance transaction
router.put('/:id', async (req, res) => {
    try {
      const updatedMaintenance = await Maintenance.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedMaintenance);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
// Delete a maintenance transaction
router.delete('/:id', async (req, res) => {
    try {
      const deletedMaintenance = await Maintenance.findByIdAndDelete(req.params.id);
      if (!deletedMaintenance) {
        return res.status(404).json({ message: 'Maintenance transaction not found' });
      }
      res.json({ message: 'Maintenance transaction deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
    
module.exports = router;
