"use strict";

const express = require("express");
const bodyParser = require('body-parser');
const aiPrompt = require("../models/aiPrompt");

const router = new express.Router();

// Parse JSON and URL-encoded bodies
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/**
 * Handles POST requests to create a new prompt.
 *
 * @name POST /api/generate
 *
 * @throws {Error} - Throws an error if generating the prompt fails.
 */
router.post("/", async function (req, res, next) {
  try {
    const response = await aiPrompt.answer(req.body);
    return res.json({ response });
  } catch (error) {
    console.error("Error creating prompt:", error);
    return next(new Error("Failed to generate prompt"));
  }
});

module.exports = router;
