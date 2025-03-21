const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      throw new Error("No token provided");
    }

    console.log("Received Token:", token);

    const decodedObj = await jwt.verify(token, "MySecret123");  
    console.log("Decoded JWT:", decodedObj);

    // Extract correct userId instead of _id
    const { userId } = decodedObj;

    if (!userId) {
      throw new Error("Token does not contain a valid userId");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found in the database");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = { userAuth };
