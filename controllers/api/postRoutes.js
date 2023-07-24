const express = require("express");
const router = express.Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all posts with associated usernames
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });

    // Return posts data with associated usernames
    res.status(200).json(postData);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});

// Get one post by ID with associated username and comments
router.get("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const postData = await Post.findByPk(postId, {
      include: [
        { model: User, attributes: ["username"] },
        { model: Comment, include: [{ model: User, attributes: ["username"] }] },
      ],
    });

    if (!postData) {
      // If no post found with the given ID, send a 404 response
      res.status(404).json({ message: "Post not found with that ID." });
    } else {
      // Return the post data with associated username and comments
      res.status(200).json(postData);
    }
  } catch (err) {
    console.error("Error fetching the post:", err);
    res.status(500).json({ error: "Failed to fetch the post." });
  }
});

// Create a new post with authenticated user
router.post("/", withAuth, async (req, res) => {
  try {
    // Extract post data from the request body and associate it with the authenticated user
    const newPostData = {
      ...req.body,
      user_id: req.session.user_id,
    };
    const newPost = await Post.create(newPostData);

    // Return the newly created post
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Error creating the post:", err);
    res.status(400).json({ error: "Failed to create the post." });
  }
});

// Update an existing post with authenticated user
router.put("/:id", withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await Post.update(req.body, {
      where: { id: postId },
    });

    if (updatedPost[0] === 0) {
      // If no post found with the given ID, send a 404 response
      res.status(404).json({ message: "Post not found with that ID." });
    } else {
      // Return a success message after updating the post
      res.status(200).json({ message: "Post updated successfully." });
    }
  } catch (err) {
    console.error("Error updating the post:", err);
    res.status(500).json({ error: "Failed to update the post." });
  }
});

// Delete a post with authenticated user
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postId = req.params.id;

    // Delete all comments related to the post
    await Comment.destroy({
      where: { post_id: postId },
    });

    // Delete the post itself
    const deletedPost = await Post.destroy({
      where: { id: postId },
    });

    if (deletedPost === 0) {
      // If no post found with the given ID, send a 404 response
      res.status(404).json({ message: "Post not found with that ID." });
    } else {
      // Return a success message after deleting the post
      res.status(200).json({ message: "Post deleted successfully." });
    }
  } catch (err) {
    console.error("Error deleting the post:", err);
    res.status(500).json({ error: "Failed to delete the post." });
  }
});

module.exports = router;
