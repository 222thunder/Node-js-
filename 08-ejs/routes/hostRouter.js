const express = require("express");
const path = require("path");
const rootDir = require("../utils/pathUtils");
const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res, next) => {
  res.render("addHome.ejs");
});

const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
  res.render("homeAdded.ejs");
  console.log("req.body is ", req.body);
  registeredHomes.push({
    houseName: req.body.housename,
    housePrice: req.body.houseprice,
    houseLocation: req.body.houselocation,
    houseRating: req.body.houserating,
    housePhoto: req.body.housephoto,
  });
});

module.exports = hostRouter;
module.exports.registeredHomes = registeredHomes;
