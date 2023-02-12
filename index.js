// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true });

// Use body-parser and cors middleware
app.use(bodyParser.json());
app.use(cors());

// Define the schema for the database
const schema = new mongoose.Schema({
  name: String,
  email: String
});

// Create the model
const User = mongoose.model("Yogesh", schema);

// Define the route for adding a user
app.post("/add-user", async (req, res) => {
 
  const user = new User({
    name: req.body.name,
    email: req.body.email
  });

  try {
    await user.save();
    res.send({ message: "User added successfully" });
  } catch (error) {
    res.send({ error: error.message });
  }
});
app.get("/add-user", async (req, res) => {
    
    const data = await User.find()

  try {
   
    res.send({ message: "User added successfully" ,data});
  } catch (error) {
    res.send({ error: error.message });
  }
});


// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
