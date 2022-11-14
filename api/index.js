// Import Express
const express = require('express');
const apiRouter = express.Router();

// JWT
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Connect Router to API components
const usersRouter = require('users');
apiRouter.use('users', usersRouter);

// Set up error logs for API Router
apiRouter.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message
  });
});

// Export API Router
module.exports = apiRouter;