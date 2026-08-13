const db = require("../utils/databaseUtil");

module.exports = class Favorite {
  constructor(id) {
    this.id = id;
  }

  /**
   * getFavorites
   * @returns {Promise<string[]>} Array of home ID strings that are favorited.
   * Example: ["2", "3"]
   * SQL: SELECT id FROM favorites
   */
  static async getFavorites() {
    try {
      const [rows] = await db.execute("SELECT id FROM favorites");
      return rows.map((row) => String(row.id));
    } catch (err) {
      console.log("Error while fetching favorites:", err);
      return [];
    }
  }

  /**
   * addToFavorites
   * @param {string} homeId - The ID of the home to add to favorites.
   * @returns {Promise<void>} Resolves when the favorite has been added.
   * SQL: INSERT INTO favorites (id) VALUES (?)
   */
  static async addToFavorites(homeId) {
    try {
      await db.execute("INSERT INTO favorites (id) VALUES (?)", [homeId]);
    } catch (err) {
      console.log("Error adding to favorites:", err);
    }
  }

  /**
   * removeFromFavorites
   * @param {string} homeId - The ID of the home to remove from favorites.
   * @returns {Promise<void>} Resolves when the favorite has been removed.
   * SQL: DELETE FROM favorites WHERE id = ?
   */
  static async removeFromFavorites(homeId) {
    try {
      await db.execute("DELETE FROM favorites WHERE id = ?", [homeId]);
    } catch (err) {
      console.log("Error removing from favorites:", err);
    }
  }

  /**
   * getFavoriteHomes
   * @returns {Promise<Object[]>} Array of home objects that are favorited.
   * Each object has: { id, houseName, housePrice, houseLocation, houseRating, housePhoto }
   * SQL: SELECT homes.* FROM homes NATURAL JOIN favorites
   */
  static async getFavoriteHomes() {
    try {
      const [rows] = await db.execute(
        "SELECT homes.id, name AS houseName, price AS housePrice, location AS houseLocation, rating AS houseRating, photo AS housePhoto, description AS houseDescription FROM homes NATURAL JOIN favorites",
      );
      return rows;
    } catch (err) {
      console.log("Error while fetching favorite Homes:", err);
      return [];
    }
  }
};
