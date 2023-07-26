// Importing the User model from "../models" directory
const User = require("../models/User");
const bcrypt = require("bcryptjs");

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
    // Hash the passwords before inserting into the database
    const hashedUserData = await Promise.all(
      userData.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
      })
    );

    // Using Sequelize's bulkCreate to insert multiple users into the database
    await User.bulkCreate(hashedUserData);

    console.log("User data seeded successfully!");
  } catch (error) {
    console.error("Error seeding user data:", error);
  }
};

// Exporting the seedUsers function for use in other files
module.exports = seedUsers;