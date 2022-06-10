const express = require("express");

const postrouting = express.Router();
const Post = require("../models/Post");

postrouting.get("/getposts", (req, res) => {
  Post.find({}, (err, documents) => {
    if (err) {
      res.status(500).json({
        msg: {
          msgBody: "error occured while fetching posts",
          msgError: true,
        },
      });
    } else {
      res.status(200).json({ posts: documents });
    }
  });
});

postrouting.post("/newpost", (req, res) => {
  console.log("post to add: ", req.body);

  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
  });
  newPost.save((err) => {
    if (err) {
      res.status(500).json({
        msg: {
          msgBody: "An error occured while trying to post your post",
          msgError: true,
        },
      });
    } else {
      res.status(201).json({
        msg: {
          msgBody: "Post was successfully saved",
          msgError: false,
        },
      });
    }
  });
});

postrouting.put("/updatepost/:id", (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, body: req.body.body },
    (err) => {
      if (err) {
        res.status(500).json({
          msg: {
            msgBody: "An error occured while updating your post",
            msgError: true,
          },
        });
      } else {
        res.status(200).json({
          msg: {
            msgBody: "Post has now been updated successfully",
            msgError: false,
          },
        });
      }
    }
  );
});

postrouting.delete("/deletepost/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.status(500).json({
        msg: {
          msgBody: "an error occurred while deleting your post",
          msgError: true,
        },
      });
    } else {
      res.status(200).json({
        msg: {
          msgBody: "successfully deleted post",
          msgError: false,
        },
      });
    }
  });
});

module.exports = postrouting;
