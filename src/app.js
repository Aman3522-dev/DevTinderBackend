const express = require('express');

const app = express();

app.get("/getUserData", (req, res) => {
  try {

    // logic of DB called and user data
   throw new Error("fbnfdksl");
   res.send("user Data send");
  }
  catch(err) {
    res.status(500).send("something went wrong contact support team");
  }
});

app.use("/", (err, req, res, next) => {
   if (err) {
    res.status(500).send("something went wrong");
   }
})


app.listen(7777, () => {
  console.log("server runnig on local host 7777");
});