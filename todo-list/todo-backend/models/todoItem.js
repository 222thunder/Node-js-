const mongoose = require("mongoose");

const todoItemSchema = mongoose.Schema(
  {
    date: Date,
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TodoItem", todoItemSchema);
