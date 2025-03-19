const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    // validation of data
  validateSignUpData(req);

  const { firstName, lastName, emailId, password }= req.body;

  // Encrypt the password
  const passwordHash = await bcrypt.hash(password, 10);
  console.log(passwordHash);
  //creating a new instance of User model
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
  });

  await user.save();
  res.send("user added successfully");
  } catch (err) {
    res.status(400).send("ERROR: " +  err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if(!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);

    if(isPasswordValid){
      // create a JWT token
      const token = await user.getJWT();

      // Add the token to the cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 5 * 3600000)
      });
      res.send("Login successfull!!");
    }
    else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR" + err.messsage);
  } 
});






module.exports = authRouter;