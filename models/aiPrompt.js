"use strict";

require('dotenv').config();

const GEMINI_API = process.env.API_KEY;

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(GEMINI_API);
const model = genAI.getGenerativeModel({
  model: "gemini-1.0-pro"
});

const history = [
  {
    role: "user",
    parts: [{ text: "Create a blog post with a title and body about the following topic. Exclude section names for the title and body" }],
  },
  {
    role: "model",
    parts: [{ text: "" }],
  },
];

class AiPrompt {
  static async answer({ prompt }) {
    try {
      const chatSession = model.startChat({
        history
      });

      // Update the prompt to instruct the model to generate both a title and body
      const fullPrompt = `Generate a blog post including a title and body for the topic: ${prompt}`;
      const result = await chatSession.sendMessage(fullPrompt);

      // Extract the reply text from the result
      const replyText = result.response.text();

      // Assume the AI response is in the format "Title: [title]\n\nBody: [content]"
      const [titleLine, ...bodyLines] = replyText.split('\n');
      const title = titleLine.replace("Title: ", "").trim();
      const body = bodyLines.join('\n').trim();

      console.log("History: ", chatSession._history[0]);

      // Return an object containing both the title and the body
      return { title, body };

    } catch (error) {
      console.error("Error in AiPrompt.answer:", error);

      if (error.response && error.response.data) {
        throw new Error(`AI API Error: ${error.response.data.message}`);
      } else {
        throw new Error("An error occurred while processing the AI prompt.");
      }
    }
  }
}

module.exports = AiPrompt;
