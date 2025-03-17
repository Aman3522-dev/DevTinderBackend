const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    // validation of data
  validateSignUpData(req);

  const { firstName, lastName, emailId, password }= req.body;

  // Encrypt the password
  const passwordHash = await bycrpt.hash(password, 10);
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if(!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid){
      res.send("Login successfull!!");
    }
    else {
      throw new Error("Invalid credentials");
    }

  } catch (err) {
    res.status(400).send("ERROR" + err.messsage);
  } 
});

// GET user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({emailId : userEmail});
    if(users.length === 0) {
      res.status(404).send("user not found");
    }
    res.send(users);
  }
  catch (err) {
    res.status(400).send("Something went wrong");
  }
})
// Feed API GET /Feed - Get all the Users from the database
app.get("/feed", async (req, res) => {
  
  try {
    const users = await User.find({});
    res.send(users);
  }
  catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Delete an user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    // const user = await User.findByIdAndDelete({_id: userId}); 
    const user = await User.findByIdAndDelete(userId);
    res.send("user Deleted successfully");
  }
  catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Update an user from the database
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "userId", "photoUrl", "about", "gender", "age", "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if(!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if(data?.skills.length > 10) {
      throw new Error("skills more than 10 is not allowed");
    }
    const user = await User.findByIdAndUpdate({_id:userId}, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("user data successfully updated");
  }
  catch (err) {
    res.status(400).send("Update failed" + err.message);
  }
})

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