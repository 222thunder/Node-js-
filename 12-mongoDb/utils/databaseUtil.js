const { MongoClient } = require("mongodb");

const MONGO_URL =
  "mongodb+srv://sanyamdhawan2007_db_user:gLo0xWGiA8itBhUZ@cluster0.qffudrb.mongodb.net/?appName=Cluster0";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      callback();
      _db = client.db("airbnb");
    })
    .catch((err) => {
      console.log("Error while connecting to Mongo DB : ", err);
    });
};

const getDB = () => {
  if (!_db) {
    throw new Error("Mongo DB not connected!");
  }
  return _db;
};

exports.getDB = getDB;
exports.mongoConnect = mongoConnect;
