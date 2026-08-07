express = require("express");

const bodyParser = require("body-parser");
const app = express();

app.use("/", (req, res, next) => {
  console.log("first dummy middleware", req.url, req.method);
  next();
});

app.use("/", (req, res, next) => {
  console.log("second dummy middleware", req.url, req.method);
  next();
});

// app.use("/", (req, res, next) => {
//   console.log("third  middleware", req.url, req.method);
//   res.send(`<h1>Welcome G</h1>`);
//   next();
// });

app.get("/", (req, res, next) => {
  console.log("Handling / for GET", req.url, req.method);
  res.send(`<h1>Whatever</h1>`);
});

app.get("/contact-us", (req, res, next) => {
  console.log("Handling / for contact-us", req.url, req.method);
  res.send(
    `
    <h1>Enter your details below so i can sell it and make money </h1>
    <form action="/contact-us" method="POST">
      <input type="text" placeholder="Enter your name" name="name" />
      <input type="email" placeholder="Enter your email" name="email" />
      <input type="submit"/>
    </form>`,
  );
});

app.use(bodyParser.urlencoded());

app.post("/contact-us", (req, res, next) => {
  console.log("Handling contact-us for post", req.body);
  res.send(`<h1> name is ${req.body.name}</h1>
            <h1> email is ${req.body.email}</h1>
    `);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`live at http://localhost:${PORT}`);
});
