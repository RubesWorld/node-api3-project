const logger = (req, res, next) => {
  console.log(
    `The ${req.method} was made on ${Date().toLocaleString()} to ${
      req.protocol
    }://${req.get("Host")}${req.originalUrl} `
  );
  next();
};

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

const validatePostId = (req, res, next) => {};

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  validatePostId,
};
