const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/") {
    res.write(`
    <html>
      <head>
        <title>Sanyam Dhawan</title>
      </head>

      <body>
        <h1>Enter your details</h1>
        <form action='/submit-details' method="POST">
          <input type='text' name='username' placeholder='Enter your name'/>
          <br>
          <label for='male'>Male:</label>
          <input type='radio' id='male' name='gender' value='male'/>
          <label for='female'>Female:</label>
          <input type='radio' id='female' name='gender' value='female'/>
          <br>
          <button type='submit'>Submit</button>
        </form>
      </body>
    </html>
    `);
    return res.end();
  } else if (
    req.url.toLowerCase() === "/submit-details" &&
    req.method == "POST"
  ) {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const params = new URLSearchParams(parsedBody);
      // const jsonObj = {};
      // for (const [key, value] of params.entries()) {
      //   jsonObj[key] = value;
      // }
      // console.log(`params = ${params} and type is ${typeof params}`);
      const jsonObj = Object.fromEntries(params);
      console.log(jsonObj);
      fs.writeFileSync("user.txt", `${JSON.stringify(jsonObj)}`);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
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
