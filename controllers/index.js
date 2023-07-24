const express = require("express");
const router = express.Router();

// Import API routes and home routes
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

// Set up routes
router.use("/api", apiRoutes);
router.use("/", homeRoutes);

// Export the router
module.exports = router;
