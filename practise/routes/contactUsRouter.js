const express = require("express");
const path = require("path");
const rootDir = require("../utils/pathUtils");
const contactUsRouter = express.Router();

contactUsRouter.get("/contact-us", (req, res, next) => {
  console.log("Handling / for contact-us", req.url, req.method);
  res.sendFile(path.join(rootDir, "views", "contactUs.html"));
});

contactUsRouter.post("/contact-us", (req, res, next) => {
  console.log("Handling contact-us for post", req.body);
  res.sendFile(path.join(rootDir, "views", "success.html"));
});

module.exports = contactUsRouter;
