const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to Airbnb",
    editing: false,
  });
};

exports.postAddHome = async (req, res, next) => {
  const home = new Home(
    req.body.housename,
    req.body.houseprice,
    req.body.houselocation,
    req.body.houserating,
    req.body.housephoto,
    req.body.houseDescription,
  );
  await home.save();
  res.render("host/home-added");
};

exports.getHostHomes = async (req, res, next) => {
  const registeredHomes = await Home.fetchAll();
  res.render("host/host-home-list", { registeredHomes: registeredHomes });
};

exports.getEditHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  const home = await Home.findById(homeId);
  if (!home) {
    console.log("Home can't be found");
    res.redirect("/host/host-home-list");
  } else {
    res.render("host/edit-home", {
      pageTitle: "Edit Home",
      editing: editing,
      home: home,
    });
  }
};

exports.postEditHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  const newHome = new Home(
    req.body.housename,
    req.body.houseprice,
    req.body.houselocation,
    req.body.houserating,
    req.body.housephoto,
    req.body.houseDescription,
  );

  await Home.EditHome(homeId, newHome);
  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  await Home.DeleteHome(homeId);
  res.redirect("/host/host-home-list");
};
