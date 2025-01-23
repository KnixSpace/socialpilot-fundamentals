const fs = require("fs");

// fs.open("open.txt", "w", (err, file) => {
//   if (err) throw err;
//   console.log("Saved!");
// });

// fs.writeFile("open.txt", "Hello content!", function (err) {
//   if (err) throw err;
//   console.log("Saved!");
// });

// fs.unlink("news.txt", (err) => console.log(err));

//fs.rename("open.txt","open2.txt",(err)=>console.log(err))
console.log("Start");
fs.readFile("package.json", (err, data) => {
  if (err) throw console.log(err);
  console.log("Async : ", data.toString());
});

console.log("Heloo");
const data = fs.readFileSync("package.json");
console.log("Sync :", data.toString());

console.log("End");
