const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const Society = require("../models/society");
const User = require("../models/user");

// Create a new society
router.post("/", async (req, res) => {
  try {
    const existingUser = await User.findOne({ "username":req.body.username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    const ljSociety = {
      name: req.body.name,
      address: req.body.address,
      totalUnits: req.body.totalUnits,
      amenities: req.body.amenities,
    };
    const society = new Society(ljSociety);
    const savedSociety = await society.save();
    if (savedSociety) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const ljUser = {
        societyId: savedSociety._id,
        username: req.body.username,
        password: hashedPassword,
        role:"society",
      };
      const user = new User(ljUser);
      const savedUser = await user.save();
    }

    res.status(201).json(savedSociety);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all societies
router.get("/", async (req, res) => {
  try {
    const societies = await Society.find();
    res.json(societies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific society by ID
router.get("/:id", async (req, res) => {
  try {
    const society = await Society.findById(req.params.id);
    if (society) {
      res.json([society]);
    } else {
      res.status(404).json({ message: "Society not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a society
router.put("/:id", async (req, res) => {
  try {
    const updatedSociety = await Society.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedSociety) {
      res.json(updatedSociety);
    } else {
      res.status(404).json({ message: "Society not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a society
router.delete("/:id", async (req, res) => {
  try {
    const deletedSociety = await Society.findByIdAndDelete(req.params.id);
    if (deletedSociety) {
      res.json({ message: "Society deleted" });
    } else {
      res.status(404).json({ message: "Society not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
