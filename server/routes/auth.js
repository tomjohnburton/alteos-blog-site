const express = require("express");
const passport = require("passport");
require("../routes/passport");

const router = express.Router();
const User = require("../models/User");
const { isLoggedIn } = require("./middlewares");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// ALL ROUTES PREFIXED WITH /api/auth

router.post("/signup", (req, res, next) => {
  // ? Sanity check to ensure user has filled out all the required fields
  const { password, username } = req.body;
  if (password === "" || username === "") {
    res.status(400).json({ message: "Indicate all the fields" });
    return;
  }
  // ? check if the username is already registered in the DB
  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "The username is already registered!" });
      return;
    }

    // ? generate a hash of the password and create the user in the database
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    User.create({
      password: hashPass,
      username,
      roles: username.includes("admin") ? "Admin" : "User"
    })
      // ? If successful log the user in to the app using a passport method
      .then(user => {
        req.login(user, function(err) {
          res.status(200).json(user);
          return;
        });
      })
      .catch(err => {
        next(err);
      });
  });
});

// ? Login method using passport local strategy
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: "An error ocurred or maybe here." });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "An error ocurred and it was here." });
        return;
      }
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

// ? passport logout strategy and endpoint
router.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Successfully logged out." });
});

router.post("/user-delete-test", (req, res) => {
  let { username } = req.body;
  User.findOneAndDelete({ username }).then(response => {
    res.status(200).json(response);
  });
});

module.exports = router;
