const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Middleware
app.use(cors()); // allow requests from the React frontend
app.use(express.json()); // parse incoming JSON request bodies

// Routes
app.use("/api/students", studentRoutes);

// Simple root route to quickly check that the API is running
app.get("/", (req, res) => {
  res.json({ message: "Student Management System API is running" });
});

module.exports = app;
