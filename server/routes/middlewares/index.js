//! Simple middleware to confirm a user is logged in to apply to the REST requests
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) next();
  else next({ status: 403, message: "Please login." });
}

function isAdmin(req, res, next) {
  if (req.user.roles === "Admin") {
    next();
  } else {
    next({ status: 403, message: "You are not an admin." });
  }
}

module.exports = {
  isLoggedIn,
  isAdmin
};
