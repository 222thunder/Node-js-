const calculator = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calculator</title>
  </head>
  <body>
    <form>
      <label for="num1">Enter number 1: </label>
      <input id="num1" />
      <label for="num2">Enter number 2: </label>
      <input id="num2" />
      <a href="/calculate-result"><button type="submit">Sum</button></a>
    </form>
  </body>
</html>
`;

module.exports = { calculator };
