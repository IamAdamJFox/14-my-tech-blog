// Importing the User model from "../models" directory
const User = require("../models/User");

// Array of dummy user data to be inserted into the database
const userData = [
  {
    username: "user1",
    email: "user1@example.com",
    password: "password1",
  },
  {
    username: "user2",
    email: "user2@example.com",
    password: "password2",
  },
  // Additional user objects...
];

// The seedUsers function to insert the user data into the database
const seedUsers = async () => {
  try {
    // Using Sequelize's bulkCreate to insert multiple users into the database
    await User.bulkCreate(userData);

    console.log("User data seeded successfully!");
  } catch (error) {
    console.error("Error seeding user data:", error);
  }
};

// Exporting the seedUsers function for use in other files
module.exports = seedUsers;
