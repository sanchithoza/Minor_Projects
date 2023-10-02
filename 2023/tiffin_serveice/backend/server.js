const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { response } = require("express");

const app = express();
app.use(cors());

app.use(express.static("files"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const port = 7000;

mongoose.connect("mongodb://127.0.0.1:27017/tiffinManagementDB");
const User = mongoose.model("tbl_user_master", {
  name: String,
  email: String,
  phone: String,
  username: String,
  password: String,
});
const tiffinMaster = mongoose.model("tbl_tiffin_master", {
  tiffinType: String,
  price: String,
  details: String
});
const BookingMaster  = mongoose.model("tbl_booking_master",{
  user: String,
  tiffin: String,
  qty: String,
  location: String
})
/*----------User Endoints-----------*/
//API ENDPOINT to Get All Users
app.get("/getUsers", async (req, res) => {
  try {
    console.log("here");
    let response = await User.find();
    // console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
//API ENDPOINT to Get user detail
app.get("/getUser/:id", async (req, res) => {
  try {
    let response = await User.find({ _id: req.params.id });
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
//API ENDPOINT to Add New User
app.post("/register", async (req, res) => {
  try {
    let data = await req.body;
    // console.log(data);
    const user = new User(data);
    let response = await user.save();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
//API ENDPOINT ro LOGIN user
app.post("/login", async (req, res) => {
  try {
    let data = req.body;
    // console.log("data", data);
    let reply = await User.findOne(data).exec();
    // console.log("result", reply);
    res.send(reply);
  } catch (error) {
    res.send(error);
  }
});
// Create a new tiffin
app.post('/tiffins', async (req, res) => {
  try {
    console.log(req.body);
    const tiffin = new tiffinMaster(req.body);
    await tiffin.save();
    res.status(201).json(tiffin);
  } catch (error) {
    res.status(400).json({ error: 'Could not create tiffin' });
  }
});

// Read all tiffins
app.get('/tiffins', async (req, res) => {
  try {
    const tiffins = await tiffinMaster.find();
    res.status(200).json(tiffins);
  } catch (error) {
    res.status(400).json({ error: 'Could not fetch tiffins' });
  }
});

// Read all tiffins
app.get('/vacanttiffins', async (req, res) => {
  try {
    const tiffins = await tiffinMaster.find({"status":"Vacant"});
    console.log(tiffins);
    res.status(200).json(tiffins);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Could not fetch tiffins' });
  }
});

// Read a single tiffin by ID
app.get('/tiffins/:id', async (req, res) => {
  try {
    const tiffin = await tiffinMaster.findById(req.params.id);
    if (!tiffin) {
      return res.status(404).json({ error: 'tiffin not found' });
    }
    res.status(200).json(tiffin);
  } catch (error) {
    res.status(400).json({ error: 'Could not fetch tiffin' });
  }
});

// Update a tiffin by ID
app.patch('/tiffins/:id', async (req, res) => {
  try {
    console.log(req.body,req.params.id);
    const tiffin = await tiffinMaster.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!tiffin) {
      return res.status(404).json({ error: 'tiffin not found' });
    }
    res.status(200).json(tiffin);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Could not update tiffin' });
  }
});

// Delete a tiffin by ID
app.delete('/tiffins/:id', async (req, res) => {
  try {
    const tiffin = await tiffinMaster.findByIdAndRemove(req.params.id);
    if (!tiffin) {
      return res.status(404).json({ error: 'tiffin not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: 'Could not delete tiffin' });
  }
});

/////////////////////////////////////////////////////
////////Booking Routes//////////////////////////////
///////////////////////////////////////////////////

// Create a new booking
app.post('/bookings', async (req, res) => {
  try {
    const booking = new BookingMaster(req.body);
    const result = await booking.save();
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Could not create booking' });
  }
});

// Read all bookings
app.get('/bookings', async (req, res) => {
  try {
    const bookings = await BookingMaster.find();
    console.log(bookings);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: 'Could not fetch bookings' });
  }
});

// Read a single booking by ID
app.get('/bookings/:id', async (req, res) => {
  try {
    const booking = await BookingMaster.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: 'Could not fetch booking' });
  }
});

// Update a booking by ID
app.put('/bookings/:id', async (req, res) => {
  try {
    const booking = await BookingMaster.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: 'Could not update booking' });
  }
});

// Delete a booking by ID
app.delete('/bookings/:id', async (req, res) => {
  try {
    const booking = await BookingMaster.findByIdAndRemove(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: 'Could not delete booking' });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
