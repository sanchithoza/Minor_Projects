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

mongoose.connect("mongodb://127.0.0.1:27017/productdb");
const User = mongoose.model("user", {
  name: String,
  email: String,
  phone: String,
  username: String,
  password: String,
});
const Product = mongoose.model("tbl_product", {
  name: String,
  company: String,
  category: String,
  retail: String,
  wholesale: String,
  cost: String,
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
/*----------product Endoints-----------*/
app.post("/uploadfees", async (req, res) => {
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
//API ENDPOINT to Add New product
app.post("/Addproduct", async (req, res) => {
  let data = await req.body;
  console.log(data);
  const product = new Product(data);

  product.save(function (err, response) {
    if (err) return console.error(err);
    console.log(response);
    res.send(response);
  });
});
//API ENDPOINT to Get All product
app.get("/getproduct", async (req, res) => {
  try {
    let response = await Product.find().exec();

    res.send(response);
  } catch (error) {
    console.log("error", error);
  }
});
//API ENDPOINT to Get filtered product
app.post("/getproduct", (req, res) => {
  let filter = req.body;
  Product.find({ filter }, function (err, response) {
    if (err) return console.error(err);
    console.log(response);
    res.send(response);
  });
});
//Api ENDPOINT to update record
app.patch("/updateproduct/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    let response = await product.findOneAndUpdate({ _id: id }, data);
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.delete("/deleteproduct/:id", async (req, res) => {
  let id = req.params.id;
  product.findOneAndDelete({ id }, function (err, response) {
    if (err) return console.error(err);
    console.log(response);
    res.send(response);
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
