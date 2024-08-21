"use strict";

const express = require("express");
const Post = require("../models/post");
const router = new express.Router();
require('dotenv').config();

/**
 * POST /api/posts
 *
 * Creates a new post with the provided title and text.
 * Expects a JSON body with `title` and `text` fields.
 *
 * @function
 * @param {express.Request} req - The request object containing the post data.
 * @param {express.Response} res - The response object to send the created post.
 * @param {function} next - The next middleware function.
 * @returns {express.Response} - A response with status 201 and the created post.
 */
router.post("/", async function (req, res, next) {
  try {
    const { title, text } = req.body;
    const post = await Post.add({ title, text });
    return res.status(201).json({ post });
  } catch (err) {
    return next(err);
  }
});

/**
 * GET /api/posts
 *
 * Retrieves all posts from the database.
 *
 * @function
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object containing all posts.
 * @param {function} next - The next middleware function.
 * @returns {express.Response} - A response with all posts.
 */
router.get("/", async function (req, res, next) {
  try {
    const posts = await Post.getAll();
    return res.json({ posts });
  } catch (err) {
    return next(err);
  }
});

/**
 * PATCH /api/posts/:id
 *
 * Updates an existing post identified by the provided ID.
 * Expects a JSON body with fields to update.
 *
 * @function
 * @param {express.Request} req - The request object containing the ID in params and update data in body.
 * @param {express.Response} res - The response object containing the updated post.
 * @param {function} next - The next middleware function.
 * @returns {express.Response} - A response with the updated post.
 */
router.patch("/:id", async function (req, res, next) {
  try {
    const post = await Post.update(req.params.id, req.body);
    return res.json({ post });
  } catch (err) {
    return next(err);
  }
});

/**
 * DELETE /api/posts/:id
 *
 * Deletes a post identified by the provided ID.
 *
 * @function
 * @param {express.Request} req - The request object containing the ID in params.
 * @param {express.Response} res - The response object with a deletion confirmation message.
 * @param {function} next - The next middleware function.
 * @returns {express.Response} - A response with a message confirming the deletion.
 */
router.delete("/:id", async function (req, res, next) {
  try {
    await Post.delete(req.params.id);
    return res.json({ message: "Deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
