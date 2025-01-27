const http = require("http");
const url = require("url");

const {
  getAllTodosController,
  registerTodoController,
  updateTodoController,
  deleteTodoController,
} = require("./todoController");
const { displayMainMenu } = require("./setup");
displayMainMenu();

const PORT = process.env.PORT || 3000;
let bodyData = "";

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    const q = url.parse(req.url);
    switch (q.pathname) {
      case "/todos":
        res.end(JSON.stringify(getAllTodosController()));
        break;
      case "/todos/create":
        req.on("data", (e) => {
          bodyData = e;
        });

        req.on("end", () => {
          const parsedData = JSON.parse(bodyData);
          res.end(JSON.stringify(registerTodoController(parsedData)));
        });
        break;
      case "/todos/update":
        req.on("data", (e) => {
          bodyData = e;
        });

        req.on("end", () => {
          const { field, todoId, data } = JSON.parse(bodyData);
          updateTodoController(field, todoId, data);
          res.end(
            JSON.stringify({
              status: "success",
              message: "Todo updated successfully",
            })
          );
        });
        break;
      case "/todos/delete":
        req.on("data", (e) => {
          bodyData = e;
        });

        req.on("end", () => {
          const { todoId } = JSON.parse(bodyData);
          deleteTodoController(todoId);
          res.end(
            JSON.stringify({
              status: "success",
              message: "Todo deleted successfully",
            })
          );
        });
        break;
      default:
        console.log("404");
        res.end();
    }
  })
  .listen(PORT);
