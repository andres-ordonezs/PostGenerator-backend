"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for posts
const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  }
}, {
  timestamps: false
});

// Create a Mongoose model based on the schema
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
