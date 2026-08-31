//external
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const DB_PATH =
  "mongodb+srv://sanyamdhawan2007_db_user:gLo0xWGiA8itBhUZ@cluster0.qffudrb.mongodb.net/todo?appName=Cluster0";
//local

const todoItemsRouter = require("./routes/todoItemsRouter");
const { getError } = require("./controllers/error");

//server created
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

//routes
app.use("/api/todo", todoItemsRouter);
app.use(getError);

//server listen
const PORT = 3001;

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
