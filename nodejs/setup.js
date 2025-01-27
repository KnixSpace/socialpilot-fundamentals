const { createInterface } = require("readline");
const { stdin, stdout } = require("process");
const {
  updateTodoController,
  registerTodoController,
  getAllTodosController,
  deleteTodoController,
} = require("./todoController");
const {
  mainMenuOptions,
  updateOptions,
  statusCode,
} = require("./utils/constant");

const rl = createInterface({
  input: stdin,
  output: stdout,
});

//display main menu
function displayMainMenu() {
  console.table(mainMenuOptions);
  rl.question("Enter code :", (code) => {
    switch (code) {
      case "c":
        promptNewTodoInput();
        break;
      case "v":
        listAllTodos();
        break;
      case "u":
        promptUpdateTodo();
        break;
      case "d":
        promptTodoDeletion();
        break;
      case "e":
        console.log("Byeee...");
        process.exit(0);
      default:
        console.log("Please enter correct code!!!");
        displayMainMenu();
    }
  });
}

//create new todo
function promptNewTodoInput() {
  rl.question("Enter todo description :", (todo) => {
    if (todo.trim() === "") {
      console.log("Please enter perfect description!!!");
      return promptNewTodoInput();
    }

    const body = {
      task: todo,
      status: "pending",
    };

    fetch("http://localhost:3000/todos/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((rawData) => {
        if (!rawData.ok) {
          console.log("Error in fetching todos");
          return;
        }
        return rawData.json();
      })
      .then((data) => {
        console.table(data);
        displayMainMenu();
      });
    // registerTodoController(todo);
  });
}

//list all todos
function listAllTodos() {
  fetch("http://localhost:3000/todos")
    .then((rawData) => {
      if (!rawData.ok) {
        console.log("Error in fetching todos");
        return;
      }
      return rawData.json();
    })
    .then((data) => {
      console.table(data);
      displayMainMenu();
    });
  // getAllTodosController();
}

//update todo status
function promptTodoStatus(todoId, callback) {
  console.table(statusCode);
  const promptForStatusCode = () => {
    rl.question("Enter status code :", (statusCode) => {
      if (statusCode !== "p" && statusCode !== "d") {
        console.log("Please enter correct status code!!!");
        return promptForStatusCode();
      }

      const body = {
        field: "s",
        todoId,
        data: statusCode,
      };

      fetch("http://localhost:3000/todos/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((rawData) => {
          if (!rawData.ok) {
            console.log("Error in updating todos");
            return;
          }
          return rawData.json();
        })
        .then((data) => {
          console.log(data.message);
          callback();
        });
      // updateTodoController("s", todoId, statusCode);
    });
  };
  promptForStatusCode();
}

//update todo description
function promptTodoDescription(todoId, callback) {
  rl.question("Enter new description :", (desc) => {
    if (desc.trim() === "") {
      console.log("Please entere perfect description1!!");
      return promptTodoDescription(todoId, callback);
    }
    const body = {
      field: "d",
      todoId,
      data: desc,
    };

    fetch("http://localhost:3000/todos/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((rawData) => {
        if (!rawData.ok) {
          console.log("Error in updating todos");
          return;
        }
        return rawData.json();
      })
      .then((data) => {
        console.log(data.message);
        callback();
      });
    // updateTodoController("d", todoId, desc);
  });
}

//update options
function promptTodoUpdateOptions(todoId, callback) {
  console.table(updateOptions);
  rl.question("Enter code :", (code) => {
    if (code === "d") {
      promptTodoDescription(todoId, callback);
    } else if (code === "s") {
      promptTodoStatus(todoId, callback);
    } else {
      console.log("Please enter the correct coee!!!");
      promptTodoUpdateOptions(todoId, callback);
    }
  });
}

//initiate update
function promptUpdateTodo() {
  // let totalTodos = getAllTodosController();
  fetch("http://localhost:3000/todos")
    .then((rawData) => {
      if (!rawData.ok) {
        console.log("Error in fetching todos");
        return;
      }
      return rawData.json();
    })
    .then((data) => {
      const allTodos = data;
      console.table(allTodos);
      if (allTodos.length) {
        const promptForTodoId = () => {
          rl.question("Enter todo id :", (id) => {
            if (id < 0 || id > allTodos.length || isNaN(id)) {
              console.log("Please enter valid id!!!");
              return promptForTodoId();
            }
            promptTodoUpdateOptions(id, displayMainMenu);
          });
        };
        promptForTodoId();
      } else {
        console.log("No todos found...");
        displayMainMenu();
      }
    });
}

//delete todo
function promptTodoDeletion() {
  fetch("http://localhost:3000/todos")
    .then((rawData) => {
      if (!rawData.ok) {
        console.log("Error in fetching todos");
        return;
      }
      return rawData.json();
    })
    .then((data) => {
      const allTodos = data;
      console.table(allTodos);
      if (allTodos) {
        const promptForTodoId = () => {
          rl.question("Enter todo id :", (id) => {
            if (id < 0 || id > allTodos || isNaN(id)) {
              console.log("Please enter valid id!!!");
              return promptForTodoId();
            }
            const body = {
              todoId: id,
            };
            fetch("http://localhost:3000/todos/delete", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            })
              .then((rawData) => {
                if (!rawData.ok) {
                  console.log("Error in updating todos");
                  return;
                }
                return rawData.json();
              })
              .then((data) => {
                console.log(data.message);
                displayMainMenu();
              });
            // deleteTodoController(id);
          });
        };
        promptForTodoId();
      } else {
        console.log("No todos found...");
        displayMainMenu();
      }
    });
}

module.exports = { displayMainMenu };
