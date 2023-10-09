const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// Create an Express application
const app = express();
// Middleware
app.use(bodyParser.json()); // parse req from client into JSON
app.use(cors()); // Enable CORS for all routes
// MongoDB Connection -- Change mydatabase with Your DB name
mongoose.connect('mongodb://127.0.0.1:27017/collegeComplaint');
const db = mongoose.connection;
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
db.once('open', () => {
    console.log('Connected to MongoDB');
});
// Define a sample Mongoose model
// If your application has more then one collections(tables)
// create one model for one collection(table)
// following the example given bellow
// replace Item with your collection(table) name
const student_reg = mongoose.model('student_reg', {

    FirstName: String,
    LastName: String,
    Email: String,
    ContactNumber: String,
    Username: String,
    Password: String,
    ConfirmPassword: String,
    Age: String,
    Gender: String,
    Year: String,
    // you have add all fields(column name) in this format
    // fieldName : DataType,
});
// CRUD endpoints
// all this endpoints are for one collection(table) called Item
// you have to repeat all this endpoints
// for each of your collections(tables)
//API ENDPOINT to Add New item

//API ENDPOINT ro Register user
app.post("/registration", async (req, res) => {
    try {
        let data = req.body;
        const newstudent = new student_reg(data);
        const result = await newstudent.save();
        console.log("result", result);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
app.get("/users", async(req,res)=>{
    try{
        let result = await student_reg.find();
        console.log(result);
        res.send(result) 
    }catch(error){
        res.send(error);
    }
})
app.delete('/users/:id', async (req, res) => {
    try {
      const user = await student_reg.findByIdAndRemove(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'not found' });
      }
      res.status(204).json();
    } catch (error) {
        console.log(error);
      res.status(400).json({ error: 'Could not delete' });
    }
  });
//API ENDPOINT ro Complaint user
const student_complain = mongoose.model('student_complain', {

    FirstName: String,
    LastName: String,
    Course: String,
    Year: String,
    Address: String,
    Email: String,
    Phone: String,
    Complain: String,

    // you have add all fields(column name) in this format
    // fieldName : DataType,
});
app.post("/_complain", async (req, res) => {
    try {
        let data = req.body;
        const student_com = new student_complain(data);
        const result = await student_com.save();
        console.log("result", result);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
app.get("/_complain", async(req,res)=>{
    try{
        let result = await student_complain.find();
        console.log(result);
        res.send(result) 
    }catch(error){
        res.send(error);
    }
})
app.delete('/_complain/:id', async (req, res) => {
    try {
      const tiffin = await student_complain.findByIdAndRemove(req.params.id);
      if (!tiffin) {
        return res.status(404).json({ error: 'not found' });
      }
      res.status(204).json();
    } catch (error) {
        console.log(error);
      res.status(400).json({ error: 'Could not delete' });
    }
  });
  app.get('/_complain/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const complain = await student_complain.findById(id);
      console.log(complain);
      if (!complain) {
        return res.status(404).json({ error: 'Complain not found' });
      }
  
      res.status(200).json(complain);
    } catch (error) {
      res.status(400).json({ error: 'Could not fetch complain' });
    }
  });

  app.put('/_complain/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { FirstName, LastName, Course, Year, Address, Email, Phone, Complain } = req.body;
        
      console.log(id,req.body);
      
      const updatedComplain = await student_complain.findByIdAndUpdate(
        id,
        {
          FirstName,
          LastName,
          Course,
          Year,
          Address,
          Email,
          Phone,
          Complain,
        },
        { new: true }
      );
      if (!updatedComplain) {
        return res.status(404).json({ error: 'Complain not found' });
      }
  
      res.status(200).json(updatedComplain);
    } catch (error) {
        console.log(error);
      res.status(400).json({ error: 'Could not update complain' });
    }
  });
  
//API ENDPOINT ro ContactUs user
const student_contactUs = mongoose.model('student_contactUs', {

    FirstName: String,
    LastName: String,

    Email: String,
    Phone: String,
    Message: String,

    // you have add all fields(column name) in this format
    // fieldName : DataType,
});
app.post("/_contactus", async (req, res) => {
    try {
        let data = req.body;
        const student_cont = new student_contactUs(data);
        const result = await student_cont.save();
        console.log("result", result);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


//API ENDPOINT ro LOGIN user
app.post("/login", async (req, res) => {
    try {
        let data = req.body;
         console.log("data", data);
        let reply = await student_reg.findOne(data);
         console.log("result", reply);
        res.send(reply);
    } catch (error) {
        res.send(error);
    }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});