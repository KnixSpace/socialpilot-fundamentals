let http = require("http");
let fs = require("fs");
let url = require("url");
// require("./fs");
require("./test");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/json" });
    fs.readFile("package.json", (err, data) => {
      res.write(data);
      res.end();
    });
  })
  .listen(3000);

//clientServer method is use to create server in node js

//how the content is going to visible on browser is we can define in writeHead (header)
