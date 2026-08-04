console.log("Sanyam Dhawan");
const fs = require("fs");
fs.writeFile("output.txt", "Write in file", (err) => {
  if (err) console.log("Error occured");
  else console.log("File written ");
});
