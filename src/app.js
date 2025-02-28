const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // creating a new instance of a User model
  const user = new User ({
    firstName: "Rohit",
    lastName: "sharma",
    emailId: "Rohit@123.com",
    Password: "Rohitbhai"
  });
  try {
  await user.save();
  res.send("user added successfully");
  } catch(err){
    res.status(410).send("Error saving the error: ", err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection is established");
  })
  .catch((err) => {
    console.log("Database cannnot be connected");
  }) 

app.listen(7777, () => {
  console.log("server runnig on local host 7777");
});