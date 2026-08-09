const fs = require("fs").promises;
const path = require("path");
const rootDir = require("../utils/pathUtils");

const homeDataPath = path.join(rootDir, "data", "homes.json");

module.exports = class Home {
  constructor(houseName, price, location, rating, url) {
    this.houseName = houseName;
    this.housePrice = price;
    this.houseLocation = location;
    this.houseRating = rating;
    this.housePhoto = url;
  }

  async save() {
    const registeredHomes = await Home.fetchAll();
    registeredHomes.push(this);
    try {
      await fs.writeFile(homeDataPath, JSON.stringify(registeredHomes, null, 2));
    } catch (err) {
      console.log(err);
    }
  }

  static async fetchAll() {
    try {
      const data = await fs.readFile(homeDataPath, "utf8");
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }
};



