const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("addHome");
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
  res.render("homeAdded");
};

exports.getHomes = async (req, res, next) => {
  const registeredHomes = await Home.fetchAll();
  res.render("home", { registeredHomes: registeredHomes });
  // Home.fetchAll((registeredHomes) => {
  //   res.render("home", { registeredHomes: registeredHomes });
  // });
};
