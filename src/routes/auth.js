const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid){
      // create a JWT token
      const token = jwt.sign({ userId: user._id }, "DEV@Tinder111", { expiresIn: "1d" });

    
      res.cookie("token", token, {
        expires: new Date(Date.now() + 5 * 3600000),
      });
      res.send("Login successfull!!");
    }
    else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  } 
});

authRouter.post("/logout", async (req, res)  => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    })

    res.send("Logout successfully!!");
})


module.exports = authRouter;