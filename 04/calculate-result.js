const generateResult = (sum) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Result</title>
  </head>
  <body>
    <h1>The result is: ${sum}</h1>
    <br>
    <a href="/calculator">Calculate Another</a>
  </body>
</html>
`;

module.exports = { generateResult };
