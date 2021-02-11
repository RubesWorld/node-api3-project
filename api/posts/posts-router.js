const express = require("express");
const Posts = require("./posts-model");

const mw = require("../middleware/middleware");
const router = express.Router();

router.get("/", mw.logger, (req, res) => {
  Posts.get(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({
        message: "error retrieving the posts",
      });
    });
});

router.get("/:id", mw.validatePostId, mw.logger, (req, res) => {
  res.status(200).json(req.posts);

  // RETURN THE POST OBJECT
  // this needs a middleware to verify post id
});

// do not forget to export the router

module.exports = router;
