// Importing required modules and dependencies
const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");
const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers: require("./utils/helpers") });

// Creating express app and setting port
const app = express();
const PORT = process.env.PORT || 3001;

// Setting up session object with secret, cookie, and store
const sess = {
  secret: 'Its a secret', // Secret used to sign the session ID cookie
  cookie: {}, // Use the default options for the session cookie
  resave: false, // Don't save the session if it wasn't modified
  saveUninitialized: true, // Save a session that is new but not modified yet
  store: new SequelizeStore({
    db: sequelize, // Use the Sequelize instance to store session data in the database
  }),
};

// Using session middleware with session object
app.use(session(sess));

// Parsing incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORTANT FOR PUBLIC FOLDERS - serving static files such as images from the public directory
app.use(express.static("public"));

// Setting up Handlebars as the view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Using session middleware again with a different session object
app.use(
  session({
    secret: process.env.SECRET, // Secret used to sign the session ID cookie
    store: new SequelizeStore({ db: sequelize }), // Use Sequelize to store session data in the database
    resave: false, // Don't save the session if it wasn't modified
    saveUninitialized: false, // Don't save uninitialized sessions
  })
);

// Using routes from the controller
app.use(routes);

// Syncing sequelize models with the database and starting the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});


