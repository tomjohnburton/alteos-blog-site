const express = require("express");
const { isLoggedIn } = require("./middlewares");
const router = express.Router();

router.get("/secret", (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user
  });
});

module.exports = router;
