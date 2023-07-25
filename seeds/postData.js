// Importing the Post model from "../models" directory
const Post = require("../models/Post");

// Array of dummy post data to be inserted into the database
const postData = [
  {
    title: "First Blog Post",
    content: "This is the content of the first blog post.",
    user_id: 1,
  },
  {
    title: "Second Blog Post",
    content: "This is the content of the second blog post.",
    user_id: 2,
  },
  // Additional post objects...
];

// The seedPosts function to insert the post data into the database
const seedPosts = async () => {
  try {
    // Using Sequelize's bulkCreate to insert multiple posts into the database
    await Post.bulkCreate(postData);

    console.log("Post data seeded successfully!");
  } catch (error) {
    console.error("Error seeding post data:", error);
  }
};

// Exporting the seedPosts function for use in other files
module.exports = seedPosts;
