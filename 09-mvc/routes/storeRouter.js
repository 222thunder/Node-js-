const express = require("express");
const {
  getHomes,
  getBooking,
  getFavList,
  getIndex,
} = require("../controllers/storeController");

const storeRouter = express.Router();
storeRouter.get("/", getIndex);
storeRouter.get("/bookings", getBooking);
storeRouter.get("/favorite", getFavList);
storeRouter.get("/homes", getHomes);

module.exports = storeRouter;
