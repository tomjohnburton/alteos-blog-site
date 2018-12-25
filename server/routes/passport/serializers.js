const passport = require("passport");
const User = require("../../models/User");

//! serialize the userid and pass that into the cookie so
//! anytime a browser makes another request, the backend is able to recognise that particular user
//! by the cookie

passport.serializeUser((loggedInUser, cb) => {
  //* serialize and send to cookie
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  //* deserialize and find a user
  User.findById(userIdFromSession)
    .then(userDocument => {
      cb(null, userDocument);
    })
    .catch(err => {
      cb(err);
    });
});
