const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

profileRouter.get("/profile", userAuth,  async (req, res) => {
    try {
      const user = req.user;
      if(!user) {
        throw new Error("No user found");
      }
      res.send(user);
      
    } catch (err) {
      res.status(400).send("ERROR" + err.messsage);
    } 
  });

module.exports = profileRouter;