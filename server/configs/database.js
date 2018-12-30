// Defining the database seperately to the app made creating seed files much easier
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI || `mongodb://localhost/alteos-blog`; // define the uri connection to mongoDB

mongoose // connect to mongo using mongoose
  .connect(
    uri,
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log("URI", uri);
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name} on PORT:${
        process.env.PORT
      }"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
