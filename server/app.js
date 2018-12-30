require("dotenv").config();

const bodyParser = require("body-parser"); //body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.
const cors = require("cors"); // cross origin resource standard
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const nocache = require("nocache");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const uuidv4 = require("uuid/v4");
require("passport");
require("./configs/database");
const app = express(); // initialize express

app.use(nocache()); // Prevent users from getting cached versions of my files

// Set "Access-Control-Allow-Origin" header
app.use(
  cors({
    origin: (origin, cb) => {
      cb(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true
  })
);
app.use(logger("dev")); // logging add on showing the maximum detail
app.use(bodyParser.json()); // expose the body of request using req.body and pass it as json
app.use(bodyParser.urlencoded({ extended: false })); // parse data using the querystring library
app.use(cookieParser());
// app.get("/", function(req, res) {
//   // test get request to understand the finer details of each component
//   console.log();
//   res.end();
// });
app.use(express.static(path.join(__dirname, "../client/build"))); // serve the final build react file as a static file (unlikely to be used in this case)

app.use(
  session({
    secret: process.env.SESSION_SECRET || "Alteos-Be",
    resave: true,
    genid: function() {
      return uuidv4();
    },
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
require("./routes/passport")(app); //! Link the local strategy to the rest of the application AFTER THE PARSER MIDDLEWARES

app.use("/api", require("./routes/index"));
app.use("/", require("./routes/auth"));
app.use("/api/post", require("./routes/posts"));

// For any routes that starts with "/api", catch 404 and forward to error handler
app.use("/api/*", (req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// For any other routes, redirect to the index.html file of React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

// Error handler
app.use((err, req, res, next) => {
  console.error("----- An error happened -----");
  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(err.status || 500);

    // A limited amount of information sent in production
    if (process.env.NODE_ENV === "production") res.json(err);
    else
      res.json(
        JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)))
      );
  }
});

// app.listen(8080, function() {
//   console.log("Example app listening on port 8080!");
// });

module.exports = app;
