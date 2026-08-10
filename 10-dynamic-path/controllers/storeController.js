const Home = require("../models/home");
const Favorite = require("../models/favorite");

exports.getHomes = async (req, res, next) => {
  const registeredHomes = await Home.fetchAll();
  const favoriteHomes = await Favorite.getFavoriteHomes();
  const favoriteIds = await Favorite.getFavorites();
  res.render("store/home-list", {
    registeredHomes: registeredHomes,
    favoriteHomes: favoriteHomes,
    favoriteIds: favoriteIds,
  });
};

exports.getBooking = async (req, res, next) => {
  res.render("store/bookings");
};

exports.getFavList = async (req, res, next) => {
  const favoriteHomes = await Favorite.getFavoriteHomes();
  const favoriteIds = await Favorite.getFavorites();
  res.render("store/fav-list", {
    registeredHomes: favoriteHomes,
    favoriteHomes: favoriteHomes,
    favoriteIds: favoriteIds,
  });
};

exports.postAddToFav = async (req, res, next) => {
  const homeId = req.body.homeId;
  await Favorite.addToFavorites(homeId);
  res.redirect("/favorite");
};

exports.postRemoveFromFav = async (req, res, next) => {
  const homeId = req.body.homeId;
  await Favorite.removeFromFavorites(homeId);
  res.redirect("/favorite");
};

exports.getIndex = async (req, res, next) => {
  const registeredHomes = await Home.fetchAll();
  const favoriteHomes = await Favorite.getFavoriteHomes();
  const favoriteIds = await Favorite.getFavorites();
  res.render("store/index", {
    registeredHomes: registeredHomes,
    favoriteHomes: favoriteHomes,
    favoriteIds: favoriteIds,
  });
};

exports.getHomeId = async (req, res, next) => {
  const homeId = req.params.homeId;
  const home = await Home.findById(homeId);
  const favoriteIds = await Favorite.getFavorites();
  const favoriteHomes = await Favorite.getFavoriteHomes();
  if (home) {
    res.render("store/home-details", {
      home: home,
      favoriteHomes: favoriteHomes,
      favoriteIds: favoriteIds,
      isFavorite: favoriteIds.includes(homeId),
    });
  } else {
    res.redirect("/homes");
    console.log("Home not found");
  }
};
