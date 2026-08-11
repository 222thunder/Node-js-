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
    this.id = Math.random().toString();
    const registeredHomes = await Home.fetchAll();
    registeredHomes.push(this);
    try {
      await fs.writeFile(
        homeDataPath,
        JSON.stringify(registeredHomes, null, 2),
      );
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

  static async findById(homeId) {
    const homes = await this.fetchAll();
    return homes.find((home) => home.id === homeId);
  }

  static async EditHome(homeId, newHome) {
    const homes = await this.fetchAll();
    const index = homes.findIndex((h) => h.id === homeId);
    if (index !== -1) {
      homes[index].houseName = newHome.houseName;
      homes[index].housePrice = newHome.housePrice;
      homes[index].houseLocation = newHome.houseLocation;
      homes[index].houseRating = newHome.houseRating;
      homes[index].housePhoto = newHome.housePhoto;
      try {
        await fs.writeFile(homeDataPath, JSON.stringify(homes, null, 2));
      } catch (err) {
        console.log("Error updating home:", err);
      }
    }
  }

  static async DeleteHome(homeId) {
    let homes = await this.fetchAll();
    homes = homes.filter((home) => home.id !== homeId);
    try {
      await fs.writeFile(homeDataPath, JSON.stringify(homes, null, 2));
    } catch (err) {
      console.log("Error deleting home:", err);
    }
  }
};
