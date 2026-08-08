const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const contactUsRouter = require("./routes/contactUsRouter");
const userRouter = require("./routes/userRouter");
const rootDir = require("./utils/pathUtils");

app.use(userRouter);
app.use(bodyParser.urlencoded());
app.use(contactUsRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`live at http://localhost:${PORT}`);
});
