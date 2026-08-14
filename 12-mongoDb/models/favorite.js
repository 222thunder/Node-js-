const { getDB } = require("../utils/databaseUtil");
const { ObjectId } = require("mongodb");

module.exports = class Favorite {
  static async getFavorites() {
    try {
      const db = getDB();
      const favorites = await db.collection("favorites").find().toArray();
      return favorites.map((fav) => String(fav._id));
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  static async addToFavorites(homeId) {
    try {
      const db = getDB();
      await db.collection("favorites").updateOne(
        { _id: new ObjectId(String(homeId)) },
        { $setOnInsert: { _id: new ObjectId(String(homeId)) } },
        { upsert: true }
      );
    } catch (err) {
      console.log(err);
    }
  }

  static async removeFromFavorites(homeId) {
    try {
      const db = getDB();
      await db.collection("favorites").deleteOne({ _id: new ObjectId(String(homeId)) });
    } catch (err) {
      console.log(err);
    }
  }

  static async getFavoriteHomes() {
    try {
      const favoriteIds = await this.getFavorites();
      if (!favoriteIds || favoriteIds.length === 0) {
        return [];
      }
      
      const mongoIds = favoriteIds.map((id) => new ObjectId(id));
      const db = getDB();
      return await db.collection("homes").find({ _id: { $in: mongoIds } }).toArray();
    } catch (err) {
      console.log(err);
      return [];
    }
  }
};
