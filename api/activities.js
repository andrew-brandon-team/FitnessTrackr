const express = require('express');
const activitiesRouter = express.Router();

const {requireUser} = require('./utils');

const {
  getAllActivities, 
  getActivityById, 
  getActivityByName, 
  attachActivitiesToRoutines, 
  createActivity, 
  updateActivity
} = require('../db');
const { post } = require('./users');

// GET ACTIVITIES
activitiesRouter.get('/', async (req, res, next) => {
  try {
    const allActivities = await getAllActivities();

    res.send({
      allActivities
    });
  } catch ({name, description}) {
    next({name, description});
  }
});

// POST activities (*)
activitiesRouter.post('/', async (req, res, next) => {
  const { name, description = "" } = req.body;

  const activityData = {};

  try {
    activityData.name = name;
    activityData.description = description;

    const activity = await createActivity(activityData);

    if (activity) {
      res.send(post);
    } else {
      next({
        name: 'ActivityCreationError',
        message: 'There was an error creating your activity. Please try again.'
      })
    }
  } catch ({name, message}) {
    next ({name, message})
  }
});

// PATCH /activities/:activityId (*)
activitiesRouter.patch('/:activityId', requireUser, async (req, res, next) => {
  const {activityId} = req.params;
  const {name, description} = req.body;

  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }

  if (description) {
    updateFields.description = description;
  }

  // try {
  //   const originalActivity = await getActivityById(activityId);

  //   if (originalActivity)
  // }
});

// GET /activities/:activityId/routines

module.exports = acitivitiesRouter;