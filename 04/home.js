const http = require("http");
const { calculator } = require("./calculator");
const { generateResult } = require("./calculate-result");

const server = http.createServer((req, res) => {
  console.log("Request received for:", req.url);
  const path = req.url.toLowerCase();

  if (path === "/calculator") {
    res.setHeader("Content-type", "text/html");
    res.write(calculator);
    res.end();
  }
  // Handle the form submission
  else if (path === "/calculate-result" && req.method === "POST") {
    const body = [];

    // Read the incoming data chunks
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    // When all data is received
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();

      // Parse the URL-encoded form data (e.g., "num1=5&num2=10")
      const params = new URLSearchParams(parsedBody);
      const num1 = Number(params.get("num1"));
      const num2 = Number(params.get("num2"));

      const sum = num1 + num2;

      res.setHeader("Content-type", "text/html");
      // Pass the sum to our HTML generator function
      res.write(generateResult(sum));
      res.end();
    });
  } else if (path === "/") {
    res.setHeader("Content-type", "text/html");
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
    res.end();
  } else {
    res.statusCode = 404;
    res.setHeader("Content-type", "text/plain");
    res.write("Page Not Found");
    res.end();
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Active at http://localhost:${port}`);
});
