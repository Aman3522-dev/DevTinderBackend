const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("MONGO_URI");
};

module.exports = connectDB;

connectDB()
  .then(() => {
    console.log("Database connection is established");
  })
  .catch((err) => {
    console.log("Database cannnot be connected");
  }) 
