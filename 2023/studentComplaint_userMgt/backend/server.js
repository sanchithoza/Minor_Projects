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

mongoose.connect("mongodb://127.0.0.1:27017/studentcomplaindb");
const User = mongoose.model("user", {
  name: String,
  email: String,
  phone: String,
  username: String,
  password: String,
});
const Studentcomplain = mongoose.model("tbl_student_complain", {
  title: String,
  date: String,
  detail: String,
  priority: String,
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
  try {
    const result =  User.find();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});
//API ENDPOINT to Add New User
app.post("/register", async (req, res) => {
  try {
    let data = await req.body;
    console.log(data);
    const user = new User(data);
    const result = await user.save();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
  let data = await req.body;
  console.log(data);
  const user = new User(data);
  user.save();
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
/*----------Studentcomplain Endoints-----------*/
app.post("/uploadcomplain", async (req, res) => {
  const newpath = __dirname + "/files/";
  console.log(req.files.file);
  const file = req.files.file;
  const filename = file.name;
  console.log(file.name);
  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      res.status(500).send({ message: "File upload failed", code: 200 });
    }

    res.status(200).send({ message: "File Uploaded", code: 200 });
  });
});
//API ENDPOINT to Add New Studentcomplain
app.post("/AddStudentcomplain", async (req, res) => {
  try {
    let data = await req.body;
    console.log(data);
    const complain = new Studentcomplain(data);
      const result = await complain.save();
      res.send(result);  
  } catch (error) {
    res.send(error);
  }
  
});
//API ENDPOINT to Get All Studentcomplain
app.get("/getStudentcomplain", async (req, res) => {
  try {
    let response = await Studentcomplain.find().exec();
    res.send(response);
  } catch (error) {
    console.log("error", error);
  }
});
//API ENDPOINT to Get filtered Studentcomplain
app.post("/getStudentcomplain", async(req, res) => {
  try {
    let filter = req.body;
    const result = await Studentcomplain.find({ filter });
      res.send(result);  
  } catch (error) {
    res.send(error);
  }
 
});
app.post("/getStudentcomplain/:id", async(req, res) => {
  try {
    let id = req.params.id;
    const result = await Studentcomplain.findById(id).exec();
      res.send(result);  
  } catch (error) {
    res.send(error);
  }
 
});
//Api ENDPOINT to update record
app.patch("/updateStudentcomplain/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    let response = await Studentcomplain.findOneAndUpdate({ _id: id }, data);
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.delete("/deleteStudentcomplain/:id", async (req, res) => {
  
  try {
    let id = req.params.id;
    const result = await Studentcomplain.findByIdAndDelete(id);
      res.send(result);  
  } catch (error) {
    res.send(error);
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
