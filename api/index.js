// Import Express
const express = require('express');
const apiRouter = express.Router();

// JWT
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      } else {
        next({
          name: 'AuthorizationHeaderError',
          message: 'Authorization token malformed',
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

// Connect Router to API components
// Users
const usersRouter = require('users');
apiRouter.use('users', usersRouter);
// Activities
const activitiesRouter = require('activities');
apiRouter.use('activities', activitiesRouter);

// Routines

// RoutineActivities

// Set up error logs for API Router
apiRouter.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message
  });
});

// Export API Router
module.exports = apiRouter;