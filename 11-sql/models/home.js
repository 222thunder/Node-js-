const db = require("../utils/databaseUtil");

module.exports = class Home {
  constructor(houseName, price, location, rating, url, description = null) {
    this.houseName = houseName;
    this.housePrice = price;
    this.houseLocation = location;
    this.houseRating = rating;
    this.housePhoto = url;
    this.houseDescription = description;
  }

  save() {
    return db.execute(
      `INSERT INTO homes (name, price, location, rating, photo, description)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        this.houseName,
        this.housePrice,
        this.houseLocation,
        this.houseRating,
        this.housePhoto,
        this.houseDescription,
      ],
    );
  }

  static async fetchAll() {
    try {
      const [rows] = await db.execute(
        "SELECT id, name AS houseName, price AS housePrice, location AS houseLocation, rating AS houseRating, photo AS housePhoto, description AS houseDescription FROM homes",
      );
      return rows;
    } catch (err) {
      console.log("Error while fetching all homes:", err);
      return [];
    }
  }

  static async findById(homeId) {
    try {
      const [rows] = await db.execute(
        "SELECT id, name AS houseName, price AS housePrice, location AS houseLocation, rating AS houseRating, photo AS housePhoto, description AS houseDescription FROM homes WHERE id = ?",
        [homeId],
      );
      return rows[0] || null;
    } catch (err) {
      console.log("Error while finding home:", err);
      return null;
    }
  }

  static EditHome(homeId, newHome) {
    return db.execute(
      `UPDATE homes
       SET name = ?, price = ?, location = ?, rating = ?, photo = ?, description = ?
       WHERE id = ?`,
      [
        newHome.houseName,
        newHome.housePrice,
        newHome.houseLocation,
        newHome.houseRating,
        newHome.housePhoto,
        newHome.houseDescription,
        homeId,
      ],
    );
  }

  static DeleteHome(homeId) {
    return db.execute("DELETE FROM homes WHERE id = ?", [homeId]);
  }
};
