const http = require("http");
const { calculator } = require("./calculator");
const { result } = require("./calculate-result");

const server = http.createServer((req, res) => {
  console.log("Connected!");
  res.setHeader("Content-type", "text/html");
  const path = req.url.toLowerCase();
  if (path === "/calculator") {
    res.write(calculator);
  } else if (path === "/calculate-result") {
    res.write(result);
  } else {
    res.write(`
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Calculator</title>
      </head>
      <body>
        <h1>Welcome to THE CALCULATOR</h1>
        <a href="/calculator">CLICK ME!!</a>
      </body>
      </html>
    `);
  }
  res.end();
});

const port = 3000;
server.listen(port, () => {
  console.log(`Active at localhost:${port}`);
});
