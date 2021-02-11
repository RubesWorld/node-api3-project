const express = require("express");

const server = express();
server.use(express.json());

// remember express by default cannot parse JSON in request bodies

// global middlewares and routes need to be connected here
const mw = require("./middleware/middleware");

server.get("/", mw.logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
