const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/add-home");
};

exports.postAddHome = async (req, res, next) => {
  const home = new Home(
    req.body.housename,
    req.body.houseprice,
    req.body.houselocation,
    req.body.houserating,
    req.body.housephoto,
  );
  await home.save();
  res.render("host/home-added");
};

exports.getHostHomes = async (req, res, next) => {
  const registeredHomes = await Home.fetchAll();
  res.render("host/host-home-list", { registeredHomes: registeredHomes });
};
