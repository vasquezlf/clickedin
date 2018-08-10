const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path")

const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// DB Config. Extract value of mongoURI from file and save in db
const db = require("./config/keys").mongoURI;

// Connect to MongoDB via Mongoose
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch( err => console.log(err));

// Route
// app.get("/", (req, res) => res.send("Hello world")); //Test

/////// ?? Not sure what's going on here ??
// Passport middleware
app.use(passport.initialize());
// Import passport.js then call passport function from the file
require("./config/passport")(passport);
///////

// Use routes
app.use("/api/users", users);
app.use("/api/profile", profiles);
app.use("/api/posts", posts);

// Serve static assets if in production
if(process.env.NODE_ENV === production) {
  // Set a static folder
  app.user(express.static("client/build"));
  // get anything that is not an api route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Setup for Heroku port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
