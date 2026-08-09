const Home = require("../models/home");

exports.getHomes = async (req, res, next) => {
  const registeredHomes = await Home.fetchAll();
  res.render("store/home-list", { registeredHomes: registeredHomes });
};

exports.getBooking = async (req, res, next) => {
  res.render("store/bookings");
};

exports.getFavList = async (req, res, next) => {
  res.render("store/fav-list");
};

exports.getIndex = async (req, res, next) => {
  const registeredHomes = await Home.fetchAll();
  res.render("store/index", { registeredHomes: registeredHomes });
};
