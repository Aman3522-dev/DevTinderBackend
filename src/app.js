const express = require('express');

const app = express();

app.use("/users", (req, res, next) => {
  console.log("Handling the routes");
  next();
  res.send("Responsible");
}, (req, res) => {
  console.log("Handling the routes 2");
  res.send("2nd Responsible");
});



app.listen(7777, () => {
  console.log("server runnig on local host 7777");
});