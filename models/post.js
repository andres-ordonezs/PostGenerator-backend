"use strict";

const Post = require("../schemas/postModel");

class PostService {
  /**
   * Creates a new post with the given title and text.
   */
  static async add({ title, text }) {
    try {
      const newPost = new Post({
        title: title,
        text: text
      });
      return await newPost.save();
    } catch (error) {
      console.error("Error creating post:", error);
      throw new Error("Failed to create post");
    }
  }

  /**
   * Retrieves all posts from the database.
   *
   * @returns {Promise<Array<Post>>} - A promise that resolves to an array of posts.
   * @throws {Error} - Throws an error if retrieving posts fails.
   */
  static async getAll() {
    try {
      return await Post.find({});
    } catch (error) {
      console.error("Error retrieving posts:", error);
      throw new Error("Failed to retrieve posts");
    }
  }

  /**
   * Updates an existing post identified by the provided ID with the given updated data.
   *
   * @param {string} id - The ID of the post to update.
   * @param {Object} updatedPost - The updated post data.
   */
  static async update(id, updatedPost) {
    try {
      const post = await Post.findByIdAndUpdate(id, updatedPost, { new: true });
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    } catch (error) {
      console.error("Error updating post:", error);
      throw new Error("Failed to update post");
    }
  }

  /**
   * Deletes a post identified by the provided ID.
   *
   * @param {string} id - The ID of the post to delete.
   */
  static async delete(id) {
    try {
      const post = await Post.findByIdAndDelete(id);
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw new Error("Failed to delete post");
    }
  }
}

module.exports = PostService;


