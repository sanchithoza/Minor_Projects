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

mongoose.connect("mongodb://localhost:27017/ayurvedaopddb");
const User = mongoose.model("user", {
  name: String,
  email: String,
  phone: String,
  username: String,
  password: String,
});
const Transaction = mongoose.model("transaction", {
  casenumber: String,
  patientname: String,
  transactiondate: String,
  remark: String,
  registration: String,
  consultation: String,
  lab: String,
  medicine: String,
  other: String,
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
/*----------Transaction Endoints-----------*/

//API ENDPOINT to Add New Transaction
app.post("/addTransaction", async (req, res) => {
  let data = await req.body;
  console.log(data);
  const transaction = new Transaction(data);
  transaction.save(function (err, response) {
    if (err) return console.error(err);
    console.log(response);
    res.send(response);
  });
});
//API ENDPOINT to Get All Transaction
app.get("/getTransaction", async (req, res) => {
  try {
    let response = await Transaction.find().exec();

    let dbRes = response;
    let modifiedResponse = [];

    for (i = 0; i < dbRes.length; i++) {
      let obj = dbRes[i].toObject();
      let amt =
        parseInt(obj.registration) +
        parseInt(obj.consultation) +
        parseInt(obj.lab) +
        parseInt(obj.medicine) +
        parseInt(obj.other);
      console.log(amt);
      obj.amount = await amt;
      modifiedResponse.push(obj);
    }
    console.log(modifiedResponse);
    res.send(modifiedResponse);
  } catch (error) {
    console.log("error", error);
  }
});
//API ENDPOINT to Get filtered Transaction
app.post("/getTransaction", (req, res) => {
  let filter = req.body;
  Transaction.find({ filter }, function (err, response) {
    if (err) return console.error(err);
    console.log(response);
    res.send(response);
  });
});
//Api ENDPOINT to update record
app.patch("/updateTransaction/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    let response = await Transaction.findOneAndUpdate({ _id: id }, data);
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.delete("/deleteTransaction/:id", async (req, res) => {
  let id = req.params.id;
  Transaction.findOneAndDelete({ id }, function (err, response) {
    if (err) return console.error(err);
    console.log(response);
    res.send(response);
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
