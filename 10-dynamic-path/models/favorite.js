const fs = require("fs").promises;
const path = require("path");
const rootDir = require("../utils/pathUtils");
const Home = require("./home");

const favDataPath = path.join(rootDir, "data", "favorites.json");

module.exports = class Favorite {
  static async getFavorites() {
    try {
      const data = await fs.readFile(favDataPath, "utf8");
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  static async addToFavorites(homeId) {
    const favorites = await Favorite.getFavorites();
    if (!favorites.includes(homeId)) {
      favorites.push(homeId);
      try {
        await fs.writeFile(favDataPath, JSON.stringify(favorites, null, 2));
      } catch (err) {
        console.log("Error adding to favorites:", err);
      }
    }
  }

  static async removeFromFavorites(homeId) {
    let favorites = await Favorite.getFavorites();
    favorites = favorites.filter((id) => id !== homeId);
    try {
      await fs.writeFile(favDataPath, JSON.stringify(favorites, null, 2));
    } catch (err) {
      console.log("Error removing from favorites:", err);
    }
  }

  static async getFavoriteHomes() {
    const favoriteIds = await Favorite.getFavorites();
    const allHomes = await Home.fetchAll();
    return allHomes.filter((home) => favoriteIds.includes(home.id));
  }
};
