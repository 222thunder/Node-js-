//external
const express = require("express");

//local
const {
  getAddHome,
  postAddHome,
  getHostHomes,
} = require("../controllers/hostController");

const hostRouter = express.Router();

hostRouter.get("/add-home", getAddHome);
hostRouter.post("/add-home", postAddHome);
hostRouter.get("/host-home-list", getHostHomes);

module.exports = hostRouter;
