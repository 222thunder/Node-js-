const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to Airbnb",
    editing: false,
    isLoggedIn: req.session.isLoggedIn,
    userType: req.session.userType,
  });
};

exports.postAddHome = async (req, res, next) => {
  const home = new Home({
    houseName: req.body.housename,
    housePrice: req.body.houseprice,
    houseLocation: req.body.houselocation,
    houseRating: req.body.houserating,
    housePhotoUrl: req.body.housephoto,
    houseDescription: req.body.houseDescription,
  });
  await home.save();
  res.render("host/home-added", {
    isLoggedIn: req.session.isLoggedIn,
    userType: req.session.userType,
  });
};

exports.getHostHomes = async (req, res, next) => {
  const registeredHomes = await Home.find();
  res.render("host/host-home-list", {
    registeredHomes: registeredHomes,
    isLoggedIn: req.session.isLoggedIn,
    userType: req.session.userType,
  });
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
      isLoggedIn: req.session.isLoggedIn,
      userType: req.session.userType,
    });
  }
};

exports.postEditHome = async (req, res, next) => {
  const homeId = req.params.homeId;

  const newHome = {
    houseName: req.body.housename,
    housePrice: req.body.houseprice,
    houseLocation: req.body.houselocation,
    houseRating: req.body.houserating,
    housePhotoUrl: req.body.housephoto,
    houseDescription: req.body.houseDescription,
  };

  try {
    await Home.findByIdAndUpdate(homeId, newHome);
    res.redirect("/host/host-home-list");
  } catch (err) {
    next(err);
  }
};

exports.postDeleteHome = async (req, res, next) => {
  const homeId = req.params.homeId;

  try {
    await Home.findByIdAndDelete(homeId);
    res.redirect("/host/host-home-list");
  } catch (err) {
    next(err);
  }
};
