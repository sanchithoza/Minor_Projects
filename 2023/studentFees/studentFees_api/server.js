const express = require("express");
const fileupload = require("express-fileupload");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { response } = require("express");

const app = express();
app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const port = 7000;

mongoose.connect("mongodb://127.0.0.1:27017/StudentFeesDetailsdb");
const User = mongoose.model("user", {
  name: String,
  email: String,
  phone: String,
  username: String,
  password: String,
});
const StudentFeesDetails = mongoose.model("tbl_student_FeesDetails", {
  studentname: String,
  year: String,
  dateofsubmission: String,
  upload: String,
  remark: String,
  course: String,
});
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
    res.send(err);
  }
});
/*----------StudentFeesDetails Endoints-----------*/
app.post("/uploadFeesDetails", async (req, res) => {
  const newpath = __dirname + "/files/";
  // console.log(req.files.file);
  const file = req.files.file;
  const filename = file.name;
  // console.log(file.name);
  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      res.status(500).send({ message: "File upload failed", code: 200 });
    }

    res.status(200).send({ message: "File Uploaded", code: 200 });
  });
});
//API ENDPOINT to Add New StudentFeesDetails
app.post("/AddStudentFeesDetails", async (req, res) => {
  try {
    let data = await req.body;
    // console.log(data);
    const FeesDetails = new StudentFeesDetails(data);
    const savedFeesDetails = await FeesDetails.save();
    res.status(201).json(savedFeesDetails);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//API ENDPOINT to Get All StudentFeesDetails
app.get("/getStudentFeesDetails", async (req, res) => {
  try {
    let response = await StudentFeesDetails.find().exec();
    res.send(response);
  } catch (error) {
    console.log("error", error);
  }
});
//API ENDPOINT to Get filtered StudentFeesDetails
app.post("/getStudentFeesDetails", async (req, res) => {
  try {
    // console.log(req.body);
    let response = await StudentFeesDetails.findById(req.body._id);
    res.send(response);
  } catch (error) {
    console.log("error", error);
  }
});
//Api ENDPOINT to update record
app.patch("/updateStudentFeesDetails/:id", async (req, res) => {
  try {
    let id = await req.params.id;
    let data = await req.body;
    let response = await StudentFeesDetails.findOneAndUpdate({ _id: id }, data);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.delete("/deleteStudentFeesDetails/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let response = await StudentFeesDetails.findOneAndDelete({ "_id":id });
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
