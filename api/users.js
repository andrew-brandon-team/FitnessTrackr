// "All routes should be preceded by /api. If a route has a (*) next to it, it means that it should require a logged in user to be present, if a route has a (**) next to it, the logged in user should be the owner of the modified object."

// "IMPORTANT: While writing these routes, have one terminal open, running the server using npm run start:dev and the other terminal running the npm run test:watch api script to run automated tests to verify we have created the routes correctly. All database adapters still need to be imported into db/seedData.js for the tests to pass."

// import express
const express = require('express');
const usersRouter = express.Router();
// import functions from db
const { createUser, getUser, getUserbyId, getUserByUsername } = require('../db');

// JWT import
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// USE communicate with Users
// usersRouter.use((req, res, next) => {
//   console.log('A request is being made to /users');
//   next();
// });


//  GET api/users/me

//  GET api/users/:username/routines

//  POST api/users/login
usersRouter.post('/login', async (req, res, next) => {
  const {username, password} = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and a password"
    });
  }

  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      const token = jwt.sign({
        id: user.id,
        username
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'
      });

      res.send({
        message: "you're logged in!",
        token
      });
    } else {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect'
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
})


//  POST api/users/register
usersRouter.post('/register', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
          name: 'UserExistsError',
          message: 'A user by that username already exists'
      });
    }
      
      const user = await createUser({
        username,
        password
      });

      const token = jwt.sign({
        id: user.id,
        username
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'
      });

      res.send({
        message: 'thank you for signing up with prestige worldwide',
        token
      });
    } catch ({name, message}) {
      next({ name, message});
    }
});

module.exports = usersRouter;