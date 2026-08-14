//external
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
const path = require("path");
const rootDir = require("./utils/pathUtils");

//local
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const { getError } = require("./controllers/error");
const mongoose = require("mongoose");

app.use(express.static(path.join(rootDir, "public")));

app.use(express.urlencoded());
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(getError);

const PORT = 4000;
const DB_PATH =
  "mongodb+srv://sanyamdhawan2007_db_user:gLo0xWGiA8itBhUZ@cluster0.qffudrb.mongodb.net/airbnb?appName=Cluster0";

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB:", err.message);
  });
