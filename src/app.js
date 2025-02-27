const express = require('express');

const app = express();

app.get("/users", (req, res) => {
  res.send({firstName: "aman", lastName: "Pal"})
});

app.post("/users", (req, res) => {
  res.send("save the data successfully in db");
});

app.delete("/users", (req, res) => {
  res.send("Deleted the data successfully");
});

// This will handles all HTTP methods API calls
app.use("/hello", (req, res) => {
  res.send("hello hello hello");
});


app.listen(7777, () => {
  console.log("server runnig on local host 7777");
});