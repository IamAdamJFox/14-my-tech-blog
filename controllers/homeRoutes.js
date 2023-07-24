const express = require("express");
const router = express.Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Route to render the homepage
router.get("/", async (req, res) => {
  try {
    // Fetch all posts with associated usernames from the database
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });

    // Convert post data to plain JavaScript objects
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the homepage template with posts and login status
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // If there is an error, return a 500 status code and error message
    res.status(500).json({ error: "Failed to retrieve posts." });
  }
});

// Route to render an individual post page
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    // Find the post by ID with associated username and comments with associated usernames
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });

    // Convert post data to plain JavaScript object
    const post = postData.get({ plain: true });

    // Render the post template with post data and login status
    res.render("post", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // If there is an error, return a 500 status code and error message
    res.status(500).json({ error: "Failed to retrieve the post." });
  }
});

// Route to render the dashboard page with all posts by the current user
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find all posts by the current user with associated usernames
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ["username"] }],
    });

    // Convert post data to plain JavaScript objects
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the dashboard template with user's posts and login status
    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // If there is an error, return a 500 status code and error message
    res.status(500).json({ error: "Failed to retrieve posts for the dashboard." });
  }
});

// Route to render the login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    // If the user is already logged in, redirect to the dashboard
    res.redirect("/dashboard");
  } else {
    // Otherwise, render the login template
    res.render("login");
  }
});

// Route to render the signup page
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    // If the user is already logged in, redirect to the dashboard
    res.redirect("/dashboard");
  } else {
    // Otherwise, render the signup template
    res.render("signup");
  }
});

// Route to render the new post page
router.get("/newpost", (req, res) => {
  if (req.session.logged_in) {
    // If the user is logged in, render the newpost template
    res.render("newpost");
  } else {
    // Otherwise, redirect to the login page
    res.redirect("/login");
  }
});

// Route to render the edit post page
router.get("/editpost/:id", async (req, res) => {
  try {
    // Find the post by ID with associated username and comments with associated usernames
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });

    // Convert post data to plain JavaScript object
    const post = postData.get({ plain: true });

    // Render the editpost template with post data and login status
    res.render("editpost", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // If there is an error, return a 500 status code and error message
    res.status(500).json({ error: "Failed to retrieve the post for editing." });
  }
});

// Export the router
module.exports = router;


