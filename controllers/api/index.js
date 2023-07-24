// Import required modules
const express = require("express");
const router = express.Router();

// Import sub-routers for different functionalities
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");

// Set up the main router
router.use("/users", userRoutes); // Mount routes for user-related functionality
router.use("/posts", postRoutes); // Mount routes for post-related functionality
router.use("/comments", commentRoutes); // Mount routes for comment-related functionality

// Export the main router
module.exports = router;
