const calculator = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calculator</title>
  </head>
  <body>
    <form action="/calculate-result" method="POST">
      <label for="num1">Enter number 1: </label>
      <input type="number" id="num1" name="num1" required />
      <br><br>
      <label for="num2">Enter number 2: </label>
      <input type="number" id="num2" name="num2" required />
      <br><br>
      <button type="submit">Sum</button>
    </form>
  </body>
</html>
`;

module.exports = { calculator };
