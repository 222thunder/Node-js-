//external
const express = require("express");

//local
const { getAddHome, postAddHome } = require("../controllers/homes");

const hostRouter = express.Router();

hostRouter.get("/add-home", getAddHome);
hostRouter.post("/add-home", postAddHome);

module.exports = hostRouter;
