// ? Compile all neccesary passport configuration files and write them to the app
const passport = require("passport");

require("./serializers");
require("./localStrategy");

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());
};
