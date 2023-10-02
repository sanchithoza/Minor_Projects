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

mongoose.connect("mongodb://127.0.0.1:27017/HostelManagementDB");
const User = mongoose.model("tbl_user_master", {
  name: String,
  email: String,
  phone: String,
  username: String,
  password: String,
});
const RoomMaster = mongoose.model("tbl_room_master", {
  roomNumber: String,
  capacity: String,
  status: String
});
const BookingMaster  = mongoose.model("tbl_booking_master",{
  user: String,
  room: String,
  checkInDate: String,
  checkOutDate: String
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
// Create a new room
app.post('/rooms', async (req, res) => {
  try {
    const room = new RoomMaster(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ error: 'Could not create room' });
  }
});

// Read all rooms
app.get('/rooms', async (req, res) => {
  try {
    const rooms = await RoomMaster.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ error: 'Could not fetch rooms' });
  }
});

// Read all rooms
app.get('/vacantrooms', async (req, res) => {
  try {
    const rooms = await RoomMaster.find({"status":"Vacant"});
    console.log(rooms);
    res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Could not fetch rooms' });
  }
});

// Read a single room by ID
app.get('/rooms/:id', async (req, res) => {
  try {
    const room = await RoomMaster.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: 'Could not fetch room' });
  }
});

// Update a room by ID
app.patch('/rooms/:id', async (req, res) => {
  try {
    console.log(req.body,req.params.id);
    const room = await RoomMaster.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Could not update room' });
  }
});

// Delete a room by ID
app.delete('/rooms/:id', async (req, res) => {
  try {
    const room = await RoomMaster.findByIdAndRemove(req.params.id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: 'Could not delete room' });
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
