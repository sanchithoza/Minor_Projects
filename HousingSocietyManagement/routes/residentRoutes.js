const express = require("express");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const router = express.Router();
const Resident = require("../models/resident");
const Society = require("../models/society");
const User = require("../models/user");

// Create a new resident
router.post("/", async (req, res) => {
  try {
    const existingUser = await User.findOne({
      username: req.body.contactNumber,
    });
    if (existingUser) {
      return res
        .status(400)
        .json({
          message: "Username with similar contact number already exits",
        });
    }
    const resident = new Resident(req.body);
    console.log(resident);
    const savedResident = await resident.save();
    if (savedResident) {
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(req.body.contactNumber, 10);
      const ljUser = {
        residentId: savedResident._id,
        username: req.body.contactNumber,
        societyId: new ObjectId(req.body.societyId),
        password: hashedPassword,
        role: "resident",
      };
      const user = new User(ljUser);
      console.log(ljUser);
      const savedUser = await user.save();
    }
    res.status(201).json(savedResident);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
});

// Get all residents
router.get("/", async (req, res) => {
  try {
    let residents = await Resident.find().populate({
      path: "societyId",
      select: "name",
    });
    console.log(residents);
    res.json(residents);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
});

// Get a specific resident by ID
router.get("/:id", async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);
    if (resident) {
      res.json(resident);
    } else {
      res.status(404).json({ message: "Resident not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get Residents by society id
router.get("/society/:societyid", async (req, res) => {
  try {
    const resident = await Resident.find({"societyId":req.params.societyid}).populate({
      path: "societyId",
      select: "name",
    });;
    if (resident) {
      res.json(resident);
    } else {
      res.status(404).json({ message: "Resident not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a resident
router.put("/:id", async (req, res) => {
  try {
    const updatedResident = await Resident.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedResident) {
      res.json(updatedResident);
    } else {
      res.status(404).json({ message: "Resident not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a resident
router.delete("/:id", async (req, res) => {
  try {

    const deletedResident = await Resident.findByIdAndDelete(req.params.id);
    if (deletedResident) {
     const deleteUser = await User.deleteOne({"residentId":deletedResident._id});
      if(!deleteUser){
        console.log("Unable to Delete from user table");
      }
      res.json({ message: "Resident deleted" });
    } else {
      res.status(404).json({ message: "Resident not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get resident details based on society ID
router.get("/society/:societyId", async (req, res) => {
  try {
    const residents = await Resident.find({ societyId: req.params.societyId });
    res.json(residents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
