const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req);
  res.setHeader("Type-Content", "text/html");
  res.write(`
    <html>
      <body>
        <h1>Hello</h1>
      </body>
    </html>
    `);
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
