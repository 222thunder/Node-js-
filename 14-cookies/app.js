//external
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
const MongoDBStore = require("connect-mongodb-session")(session);
const DB_PATH =
  "mongodb+srv://sanyamdhawan2007_db_user:gLo0xWGiA8itBhUZ@cluster0.qffudrb.mongodb.net/airbnb?appName=Cluster0";
//local
const rootDir = require("./utils/pathUtils");
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const { getError } = require("./controllers/error");

//server created
const app = express();
//coustom render for ejs
app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "mySessions",
});

app.use(express.static(path.join(rootDir, "public")));
app.use(express.urlencoded());

//session
app.use(
  session({
    secret: "true dat hoe",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

//store
app.use(storeRouter);

//host - auth
app.use("/host", (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});

//host
app.use("/host", hostRouter);

//auth
app.use(authRouter);

//error
app.use(getError);

//server listen
const PORT = 4000;

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
