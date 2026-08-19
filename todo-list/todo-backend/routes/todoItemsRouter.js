const express = require("express");
const todoItemsController = require("../controllers/todoItemsController");
const todoItemsRouter = express.Router();

todoItemsRouter.get("/", todoItemsController.getTodoItems);
todoItemsRouter.post("/", todoItemsController.createTodoItem);
todoItemsRouter.delete("/:id", todoItemsController.deleteTodoItem);
todoItemsRouter.put("/:id/completed", todoItemsController.markTodoItemCompleted);

module.exports = todoItemsRouter;
