const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://amanpal3546:SSS786ggUdL9mxT6@namastenodejs.mk1yb.mongodb.net/devTinder");
};

module.exports = connectDB;

connectDB()
  .then(() => {
    console.log("Database connection is established");
  })
  .catch((err) => {
    console.log("Database cannnot be connected");
  }) 