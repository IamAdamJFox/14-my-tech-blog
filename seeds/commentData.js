// Importing the Comment model from "../models"
const Comment = require("../models/Comment");

// An array of comment data objects to be inserted into the database
const commentData = [
  {
    comment_text: "Waffles",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "Tomatoes",
    user_id: 2,
    post_id: 1,
  },
  // Additional comment objects...
];

// The seedComments function to insert the comment data into the database
const seedComments = async () => {
  try {
    // Using Sequelize's bulkCreate to insert multiple comments into the database
    await Comment.bulkCreate(commentData);

    console.log("Comment data seeded successfully!");
  } catch (error) {
    console.error("Error seeding comment data:", error);
  }
};

// Exporting the seedComments function for use in other files
module.exports = seedComments;
