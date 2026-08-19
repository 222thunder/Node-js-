const TodoItem = require("../models/todoItem");

exports.getTodoItems = async (req, res, next) => {
  console.log(req.body);
  const todoItems = await TodoItem.find();
  res.status(200).json(todoItems);
};

exports.createTodoItem = async (req, res, next) => {
  console.log(req.body);
  const { task, date } = req.body;
  const todoItem = new TodoItem({ task, date });
  await todoItem.save();
  res.status(201).json(todoItem);
};

exports.deleteTodoItem = async (req, res, next) => {
  const { id } = req.params;
  await TodoItem.findByIdAndDelete(id);
  res.status(200).json({ id });
};

exports.markTodoItemCompleted = async (req, res, next) => {
  const { id } = req.params;
  const todoItem = await TodoItem.findByIdAndUpdate(
    id,
    { completed: true },
    { new: true }
  );
  res.status(200).json(todoItem);
};
