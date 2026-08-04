const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  const path = req.url.toLowerCase();

  if (path === "/men") {
    res.write(`<body><h1>Men</h1></body>`);
  } else if (path === "/women") {
    res.write(`<body><h1>Women</h1></body>`);
  } else if (path === "/kids") {
    res.write(`<body><h1>Kids</h1></body>`);
  } else if (path === "/cart") {
    res.write(`<body><h1>Cart</h1></body>`);
  } else {
    res.write(`
      <body>
        <nav>
          <ul>
            <li><a href="/men">Men</a></li>
            <li><a href="/women">Women</a></li>
            <li><a href="/kids">Kids</a></li>
            <li><a href="/cart">Cart</a></li>
          </ul>
        </nav>
      </body>
    `);
  }

  res.end();
});

const port = 5001;
server.listen(port, () => {
  console.log(`Active at localhost:${port}`);
});
