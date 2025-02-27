const express = require('express');

const app = express();

const {adminAuth} = require("./middlewares/auth");
app.use("/admin", adminAuth);

app.get("/user", (req, res) => {
  res.send("user Data send");
})

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data send");
})

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
})


app.listen(7777, () => {
  console.log("server runnig on local host 7777");
});