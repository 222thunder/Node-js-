//external
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
const path = require("path");
const rootDir = require("./utils/pathUtils");

//local
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");

app.use(express.static(path.join(rootDir, "public")));

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);

app.use((req, res, next) => {
  res.status(404).render("404.ejs");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
