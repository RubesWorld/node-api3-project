//import models
const pModels = require("../posts/posts-model");
const uModels = require("../users/users-model");

const logger = (req, res, next) => {
  console.log(
    `The ${req.method} was made on ${Date().toLocaleString()} to ${
      req.protocol
    }://${req.get("Host")}${req.originalUrl} `
  );
  next();
};

const validateUserId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await uModels.getById(id);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(500).json(`server error: ${err}`);
  }
};

const validateUser = async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else {
    next();
  }
};

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missinge post data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

const validatePostId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const posts = pModels.getById(id);
    if (!posts) {
      res.status(404).json({ message: "user not found" });
    } else {
      req.posts = posts;
      next();
    }
  } catch (err) {
    res.status(500).json(`server error: ${err}`);
  }
};

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  validatePostId,
};
