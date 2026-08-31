# Node.js & Express MVC Backend Setup Guide

A complete reference guide for building modular, scalable REST API backends using Node.js, Express, and MongoDB (Mongoose).

---

## 1. Project Architecture (MVC Pattern)

```text
backend-project/
├── app.js                     # Application entry point (server, middlewares, DB connection)
├── package.json               # Dependencies & scripts
├── .env                       # Environment variables (DB credentials, PORT)
├── .gitignore                 # Files/folders to ignore in Git
├── models/                    # Data models & schemas (Mongoose)
│   └── <resource>.js          # E.g., todoItem.js, user.js
├── controllers/               # Business logic & request/response handling
│   ├── <resource>Controller.js
│   └── error.js               # 404 and global error handlers
└── routes/                    # API Route definitions
    └── <resource>Router.js    # Endpoint mappings (GET, POST, PUT, DELETE)
```

---

## 2. Step-by-Step Setup Guide

### Step 1: Initialize Project & Install Dependencies

Run the following commands in your terminal:

```bash
# Create directory and initialize npm
mkdir my-backend && cd my-backend
npm init -y

# Core dependencies
npm install express mongoose cors dotenv

# Dev dependencies (for auto-reloading during development)
npm install --save-dev nodemon
```

Update your `package.json` scripts:

```json
{
  "name": "my-backend",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "nodemon app.js"
  }
}
```

---

### Step 2: Configure Environment Variables (`.env` & `.gitignore`)

Create a `.env` file:
```env
PORT=3001
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/<database_name>?retryWrites=true&w=majority
```

Create a `.gitignore` file:
```gitignore
node_modules/
.env
.DS_Store
```

---

### Step 3: Create the Model (`models/todoItem.js`)

Define the data structure and schema constraints with Mongoose:

```javascript
const mongoose = require("mongoose");

const todoItemSchema = new mongoose.Schema(
  {
    task: { 
      type: String, 
      required: true,
      trim: true 
    },
    completed: { 
      type: Boolean, 
      default: false 
    },
    date: { 
      type: Date 
    }
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

module.exports = mongoose.model("TodoItem", todoItemSchema);
```

---

### Step 4: Create the Controller (`controllers/todoItemsController.js`)

Implement the CRUD operations and database interactions:

```javascript
const TodoItem = require("../models/todoItem");

// GET /api/todo
exports.getTodoItems = async (req, res, next) => {
  try {
    const todoItems = await TodoItem.find();
    res.status(200).json(todoItems);
  } catch (error) {
    next(error);
  }
};

// POST /api/todo
exports.createTodoItem = async (req, res, next) => {
  try {
    const { task, date } = req.body;
    const todoItem = new TodoItem({ task, date });
    await todoItem.save();
    res.status(201).json(todoItem);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/todo/:id
exports.deleteTodoItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    await TodoItem.findByIdAndDelete(id);
    res.status(200).json({ message: "Item deleted successfully", id });
  } catch (error) {
    next(error);
  }
};

// PUT /api/todo/:id/completed
exports.markTodoItemCompleted = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todoItem = await TodoItem.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true } // returns the updated document
    );
    res.status(200).json(todoItem);
  } catch (error) {
    next(error);
  }
};
```

---

### Step 5: Create Error Controller (`controllers/error.js`)

Handle 404 (not found) and general errors gracefully:

```javascript
exports.notFound = (req, res, next) => {
  res.status(404).json({ message: "API route not found" });
};

exports.errorHandler = (err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error"
  });
};
```

---

### Step 6: Define Routes (`routes/todoItemsRouter.js`)

Link URLs and HTTP methods to their corresponding controller functions:

```javascript
const express = require("express");
const todoItemsController = require("../controllers/todoItemsController");

const router = express.Router();

router.get("/", todoItemsController.getTodoItems);
router.post("/", todoItemsController.createTodoItem);
router.delete("/:id", todoItemsController.deleteTodoItem);
router.put("/:id/completed", todoItemsController.markTodoItemCompleted);

module.exports = router;
```

---

### Step 7: Create the Application Entry Point (`app.js`)

Assemble middleware, routes, database connection, and start the server:

```javascript
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todoItemsRouter = require("./routes/todoItemsRouter");
const { notFound, errorHandler } = require("./controllers/error");

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/todo", todoItemsRouter);

// 404 & Global Error Handling
app.use(notFound);
app.use(errorHandler);

// Server Configuration & Database Connection
const PORT = process.env.PORT || 3001;
const DB_PATH = process.env.MONGODB_URI;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
```

---

## 3. Running the Server

Start in development mode with auto-reload:

```bash
npm start
```

Your API endpoints will be accessible at:
- `GET    http://localhost:3001/api/todo`
- `POST   http://localhost:3001/api/todo`
- `DELETE http://localhost:3001/api/todo/:id`
- `PUT    http://localhost:3001/api/todo/:id/completed`

---

## 4. Key Rules for Adding New Resources

When adding a new feature (e.g. `users`, `products`, `notes`):
1. **Create Model**: `models/<name>.js` (Schema definition).
2. **Create Controller**: `controllers/<name>Controller.js` (CRUD methods).
3. **Create Router**: `routes/<name>Router.js` (Endpoint definitions).
4. **Mount in `app.js`**: `app.use("/api/<name>", <name>Router);`.
