// Import necessary modules
const router = require("express").Router();
const { User } = require("../../models");

// Route to get all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] }, // Exclude the password field from the returned user data
  })
    .then((dbUserData) => res.json(dbUserData)) // Send the user data in JSON format
    .catch((err) => {
      console.log(err);
      res.status(500).json(err); // Send a 500 status code and error message if an error occurs
    });
});

// Route to sign up a new user
router.post("/signup", async (req, res) => {
  try {
    // Create a new User instance with the provided data
    const newUser = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    // Save the new user data to the database
    const userData = await newUser.save();

    // Save user session data and send the user data in the response
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err); // Send a 400 status code and error message if an error occurs
    console.log(err);
  }
});

// Route to log in a user
router.post("/login", async (req, res) => {
  try {
    // Find the user by their username in the database
    const userData = await User.findOne({ where: { username: req.body.username } });
    console.log(req.body)
    if (!userData) {
      // If the user is not found, send a 400 status code and error message
      res.status(400).json({ message: "Incorrect username or password, please try again" });
      return;
    }

    // Check if the provided password matches the user's password in the database
    const validPassword = await userData.checkPassword(req.body.password);
    console.log(validPassword)
    if (!validPassword) {
      // If the password does not match, send a 400 status code and error message
      res.status(400).json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Save user session data and send a success message in the response
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ user: userData, message: "You are now logged in!" });
    });
    console.log(req.session)
  } catch (err) {
    res.status(400).json(err); // Send a 400 status code and error message if an error occurs
  }
});

// Route to log out a user
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    // If the user is logged in, destroy the session and send a 204 status code (No Content)
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If the user is not logged in, send a 404 status code (Not Found)
    res.status(404).end();
  }
});

// Export the router
module.exports = router;


