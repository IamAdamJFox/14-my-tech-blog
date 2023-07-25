// Importing the seed data functions
const seedUsers = require("./userData");
const seedPosts = require("./postData");
const seedComments = require("./commentData");

// Importing the sequelize connection from ../config/connection
const sequelize = require("../config/connection");

// Function to seed all data by calling the three seed functions in sequence
const seedAll = async () => {
  try {
    // Step 1: Synchronize Sequelize models and wipe out the tables (if they exist)
    await sequelize.sync({ force: true });

    // Step 2: Call each of the seed data functions to populate the database
    await seedUsers();
    await seedPosts();
    await seedComments();

    // Step 3: Exiting the process with a successful exit code
    process.exit(0);
  } catch (error) {
    console.error("Error seeding the database:", error);
    process.exit(1); // Exit with a non-zero code to indicate an error
  }
};

// Calling the seedAll function to seed the database
seedAll();
