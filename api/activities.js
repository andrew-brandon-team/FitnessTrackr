const express = require('express');
const activitiesRouter = express.Router();

const {requireUser} = require('./utils');

const {
  getAllActivities, 
  getActivityById, 
  getActivityByName, 
  attachActivitiesToRoutines, 
  createActivity, 
  updateActivity,
  getAllPublicRoutines
} = require('../db');


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

  try {
    if (req.user) {
      const updatedActivity = await updateActivity(activityId, updateFields);
      res.send({ activity: updatedActivity});
    } else {
      next ({
        name: "NotLoggedIn",
        message: "Please Login to Update Activity"
      })
    }
  } catch (error) {
    console.log({name, message})
  }
});

// GET /activities/:activityId/routines
activitiesRouter.get('/:activityId/routines', async (req, res, next) =>{
  try {
    const id = req.params.activityId;
    const activity = {id: id};
    const routines = await getAllPublicRoutines(activity);
    if (routines.length === 0)
      res.send({
        message: "Activity not found",
        name: "Activity does not exist",
        error: "Activity does not currently exist",
      });
    res.send(routines);
  } catch ({name, message }) {
    console.log({name, message})
  }  
})

module.exports = activitiesRouter;