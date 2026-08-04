const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/") {
    res.write(`
    <html>
      <head>
        <title>Sanyam Dhawan</title>
      </head>

      <body>
        <h1>welcome to home</h1>
      </body>
    </html>
    `);
    return res.end();
  } else if (req.url === "/product") {
    res.write(`
    <html>
      <head>
        <title>Sanyam Dhawan</title>
      </head>

      <body>
        <h1>welcome to procuts</h1>
      </body> 
    </html>
    `);
    return res.end();
  }
  res.write(`
    <html>
      <head>
        <title>Sanyam Dhawan</title>
      </head>

      <body>
        <h1>Sanyam ka server</h1>
      </body>
    </html>
    `);
  res.end();
});

const port = 3000;
server.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
