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
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve posts." });
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
      res.status(404).json({ message: "No post found with that ID." });
    } else {
      res.status(200).json(postData);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve the post." });
  }
});

// Create a new post with authenticated user
router.post("/", withAuth, async (req, res) => {
  try {
    const newPostData = {
      ...req.body,
      user_id: req.session.user_id,
    };
    const newPost = await Post.create(newPostData);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: "Failed to create the post." });
  }
});

// Update an existing post with authenticated user
router.put("/:id", withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedRows = await Post.update(req.body, {
      where: { id: postId },
    });

    if (updatedRows[0] === 0) {
      res.status(404).json({ message: "No post found with that ID." });
    } else {
      res.status(200).json({ message: "Post updated successfully." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update the post." });
  }
});

// Delete a post with authenticated user
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    await Comment.destroy({
      where: { post_id: postId },
    });

    const deletedRows = await Post.destroy({
      where: { id: postId },
    });

    if (deletedRows === 0) {
      res.status(404).json({ message: "No post found with that ID." });
    } else {
      res.status(200).json({ message: "Post deleted successfully." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete the post." });
  }
});

module.exports = router;

