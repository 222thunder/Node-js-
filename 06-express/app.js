const express = require("express");

const requestHandler = require("./user");

const app = express();

app.use("/", (req, res, next) => {
  console.log("Came in first middle", req.url, req.method);
  next();
});

app.use("/submit-details", (req, res, next) => {
  console.log("Came in second middle", req.url, req.method);
  res.send(`<html><body><h1>Hello</h1></body></html>`);
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
