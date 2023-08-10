const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { response } = require("express");

const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const port = 7000;

mongoose.connect("mongodb://localhost:27017/studentprofiledb");
const User = mongoose.model("user", {
  name: String,
  email: String,
  phone: String,
  username: String,
  password: String,
});
const StudentProfile = mongoose.model("tbl_student_profile", {
  firstname: String,
  lastname: String,
  dob: String,
  email: String,
  gender: String,
  address: String,
  pincode: String,
  state: String,
  city: String,
  country: String,
  course: String,
});
/*----------User Endoints-----------*/
//API ENDPOINT to Get All Users
app.get("/getUsers", async (req, res) => {
  console.log("here");
  let response = await User.find();
  console.log(response);
  res.send(response);
});
//API ENDPOINT to Get user detail
app.get("/getUser/:id", (req, res) => {
  User.find(function (err, response) {
    if (err) return console.error(err);
    console.log(response);
    res.send(response);
  });
});
//API ENDPOINT to Add New User
app.post("/register", async (req, res) => {
  let data = await req.body;
  console.log(data);
  const user = new User(data);
  user.save(function (err, response) {
    if (err) return console.error(err);
    console.log(response);
    res.send(response);
  });
});
//API ENDPOINT ro LOGIN user
app.post("/login", async (req, res) => {
  try {
    let data = req.body;
    console.log("data", data);
    let reply = await User.findOne(data).exec();
    console.log("result", reply);
    res.send(reply);
  } catch (error) {
    res.send(err);
  }
});
/*----------StudentProfile Endoints-----------*/

//API ENDPOINT to Add New StudentProfile
app.post("/AddStudent", async (req, res) => {
  let data = await req.body;
  console.log(data);
  const Studentprofile = new StudentProfile(data);
  Studentprofile.save(function (err, response) {
    if (err) return console.error(err);
    console.log(response);
    res.send(response);
  });
});
//API ENDPOINT to Get All StudentProfile
app.get("/getStudentProfile", async (req, res) => {
  try {
    let response = await StudentProfile.find().exec();

    res.send(response);
  } catch (error) {
    console.log("error", error);
  }
});
//API ENDPOINT to Get filtered StudentProfile
app.post("/getStudentProfile", (req, res) => {
  let filter = req.body;
  StudentProfile.find({ filter }, function (err, response) {
    if (err) return console.error(err);
    console.log(response);
    res.send(response);
  });
});
//Api ENDPOINT to update record
app.patch("/updateStudentProfile/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    let response = await StudentProfile.findOneAndUpdate({ _id: id }, data);
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.delete("/deleteStudentProfile/:id", async (req, res) => {
  let id = req.params.id;
  StudentProfile.findOneAndDelete({ id }, function (err, response) {
    if (err) return console.error(err);
    console.log(response);
    res.send(response);
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
