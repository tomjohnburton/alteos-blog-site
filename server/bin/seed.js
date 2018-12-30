const User = require("../models/User");
const Post = require("../models/Post");
const mongoose = require("mongoose");
require("../configs/database");

const users = [
  {
    username: "John",
    password: "pwd",
    role: "Admin"
  },
  {
    username: "Harry",
    password: "pwd2",
    role: "User"
  }
];

const posts = [
  {
    title: "A little thought",
    contents:
      "I've tried many things but no luck yet. Thanks in advance for the help"
  },
  {
    title: "A merry thought",
    contents:
      "distance from one step to another gets enlarged with respect to content"
  },
  {
    title: "A unhappy thought",
    contents: "It's easiest to do this on the server when it starts:"
  },
  {
    title: "A wishful thought",
    contents:
      "Why is it not recommended to define maven artifact repository URL in pom file? (Azure context, artifact source)"
  }
];

User.create(users)
  .then(user => {
    console.log(`${user.length} users created.`);
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });

Post.create(posts)
  .then(postsCreated => {
    console.log(`${postsCreated.length} posts created.`);
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
