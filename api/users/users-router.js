const express = require("express");
const Users = require("./users-model");
const Posts = require("../posts/posts-model");

const mw = require("../middleware/middleware");

const router = express.Router();

router.get("/", mw.logger, (req, res) => {
  Users.get(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({
        message: "error retrieving users",
      });
    });
  // RETURN AN ARRAY WITH ALL THE USERS
});

router.get("/:id", mw.validateUserId, mw.logger, (req, res) => {
  res.status(200).json(req.user);
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post("/", mw.validateUser, (req, res) => {
  Users.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error adding the user",
      });
    });
});

// RETURN THE NEWLY CREATED USER OBJECT
// this needs a middleware to check that the request body is valid

router.put(
  "/:id",
  mw.validateUserId,
  mw.validateUser,
  mw.logger,
  (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    Users.update(id, changes)
      .then((user) => {
        res
          .status(200)
          .json({ message: `User ${id} was updated to ${changes.name}` });
      })
      .catch((err) => {
        res.status(500).json({ message: "Error updating that user" });
      });
    // RETURN THE FRESHLY UPDATED USER OBJECT
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
  }
);

router.delete("/:id", mw.validateUserId, mw.logger, (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then((user) => {
      res.status(201).json({ user });
    })
    .catch((err) => {
      res.status(400).json({ message: "couldn't delete user " });
    });

  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get("/:id/posts", mw.validateUserId, mw.logger, (req, res) => {
  const { id } = req.params;
  Users.getUserPosts(id)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post(
  "/:id/posts",
  mw.validateUserId,
  mw.validatePost,
  mw.logger,
  (req, res) => {
    const { id } = req.params;
    Posts.insert(req.body)
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((err) => {
        res.status(500).json({ message: "error posting for that user" });
      });
  }
);

// RETURN THE NEWLY CREATED USER POST
// this needs a middleware to verify user id
// and another middleware to check that the request body is valid

// do not forget to export the router
module.exports = router;
