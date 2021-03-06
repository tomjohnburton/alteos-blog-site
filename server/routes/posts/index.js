const express = require("express");
const Post = require("../../models/Post");
const User = require("../../models/User");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../middlewares");

// ? Gather all posts
router.get("/list-posts", (req, res) => {
  //! ADD ISLOGGED IN AFTER UI FINISHED
  Post.find()
    .populate("user")
    .then(response => {
      res.status(200).json(response);
    });
});
// ? Create a new post
router.post("/create-post", isLoggedIn, isAdmin, (req, res, next) => {
  console.log(req.body);
  let { title, content } = req.body;
  let { user } = req;
  Post.create({
    title,
    content,
    likes: 0,
    user: user._id
  })
    .then(() => {
      res.status(200).json({ message: "Post successfully created" });
    })
    .catch(err => {
      console.log("ERROR", err);
    });
});

// ? Edit a post
router.patch("/edit-post", isLoggedIn, isAdmin, (req, res, next) => {
  let { title, content, _id } = req.body;
  Post.findOne({ _id })
    .then(response => {
      let oldTitle = response.title;
      let oldContent = response.content;
      Post.findOneAndUpdate(
        { _id: _id },
        {
          title: title == undefined ? oldTitle : title,
          content: content == undefined ? oldContent : content,
          user: req.user._id
        }
      ).then(() => {
        res.status(200).json({ message: "Post successfully updated" });
      });
    })
    .catch(err => {
      console.log(err);
    });
});

// ? Delete a post
router.post("/delete-post", isLoggedIn, isAdmin, (req, res, next) => {
  let { _id } = req.body;
  Post.findOneAndDelete({ _id })
    .then(() => {
      res.status(200).json({ message: "Post successfully deleted" });
    })
    .catch(err => {
      console.log(err);
    });
});

// ? Add like
router.patch("/add-like", (req, res) => {
  let { _id } = req.body;

  Post.findOne({ _id }).then(response => {
    let { likes } = response;
    Post.findOneAndUpdate(
      { _id },
      {
        likes: likes + 1
      }
    ).then(response => {
      User.findOne({ _id: req.user._id })
        .then(response => {
          console.log(response);
          User.findOneAndUpdate(
            { _id: response._id },
            { likedPosts: [...response.likedPosts, _id] }
          );
        })
        .then(() => {
          res.status(200).json({ likes: response.likes });
        });
    });
  });
});

module.exports = router;
