
const aiChatRoutes = require("./routes/aiPrompt");
const postsRoutes = require("./routes/posts");

const mongoose = require("mongoose");
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');

// Creating an Express application
const app = express();

/**
 * Middleware setup
 * - Parses incoming JSON requests
 * - Enables CORS for a specific origin
 * - Parses URL-encoded bodies
 */
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5174' }));
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Connects to MongoDB using Mongoose
 * Logs connection success or error messages
 */
mongoose.connect("mongodb://localhost:27017/posts", {});

/**
 * Event listener for successful MongoDB connection
 * Logs a message to the console
 */
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

/**
 * Event listener for MongoDB connection errors
 * Logs error details to the console
 * @param {Error} err - The error object
 */
mongoose.connection.on("error", (err) => {
  console.error("Failed to connect to MongoDB", err);
});

/**
 * Sets up API routes for handling requests
 * - AI chat prompts: /api/generate
 * - Posts: /api/posts
 */
app.use("/api/generate", aiChatRoutes);
app.use("/api/posts", postsRoutes);

/**
 * Exports the configured Express application
 * @module
 */
module.exports = app;
