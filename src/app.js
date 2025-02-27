const express = require('express');

const app = express();

app.get("/users/:userId/:name/:password", (req, res) => {
  console.log(req.params);
  res.send({firstName: "aman", lastName: "Pal"})
});

app.listen(7777, () => {
  console.log("server runnig on local host 7777");
});