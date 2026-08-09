const express = require("express");
const path = require("path");
const { registeredHomes } = require("./hostRouter");
const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
  res.render("home", { registeredHomes });
});

module.exports = userRouter;
