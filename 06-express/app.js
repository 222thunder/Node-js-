const express = require("express");

const requestHandler = require("./user");

const app = express();

app.get("/", (req, res, next) => {
  console.log("Came in first middle", req.url, req.method);
  res.send(`<html><body><h1>First</h1></body></html>`);
  next();
});

app.post("/submit-detail", (req, res, next) => {
  console.log("Came in second middle", req.url, req.method);
  res.send(`<html><body><h1>Second</h1></body></html>`);
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
