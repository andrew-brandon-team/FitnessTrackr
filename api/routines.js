const express = require('express')
const { routinesRouter } = express.Router();

const {
    getRoutineById,
    getAllRoutines,
    getPublicRoutinesByActivity,
    attachActivitiesToRoutines,
    createRoutine,
    updateRoutine,
    destroyRoutine,
} = require('../db');
const {requireUser} = require("./utils")

// GET /routines
routinesRouter.get('/', async (req, res, next) => {
    try{
        const allRoutines = await getAllRoutines();

        const routines = allRoutines.filter(routine => {
            if (routine.active) {
                return true;
            }

            if (req.user && routine.creatorName === req.user.id) {
                return true;
            }

            return false;
        });

        res.send({
            routines
        });
    }   catch ({ name, description }) {
        next({ name, description });
    }
});

// POST /routines (*)
<<<<<<< HEAD
routinesRouter.post('/', requireUser, async (req, res, next) => {
    const {name, description} = req.body;

    const routineData = {};

    try {
        routineData.creatorId = req.user.id;
        routineData.name = name;
        routineData.description = description;

        const routine = await createRoutine(routineData);

        if (routine) {
            res.send(routine);
        } else {
            next({
                name: "RoutineCreationError",
                message: "There was an error creating your routine. Please try again"
            })
        }
    } catch ({ name, message }) {
        console.log({ name, message });
    }
});

=======
routinesRouter.post("/", requireUser, async (req, res, next) =>{
    const {isPublic, name, goal} = req.body;
    const creatorId = req.user.id;

    try {
        if (creatorId && isPublic && name && goal) {
            const newRoutine = await createRoutine({
                creatorId,
                isPublic,
                name,
                goal
            });
            res.send({newRoutine})
        } else {
            res.send({message: "Missing a field"})
        }
    } catch (error) {
        console.log(error)
    }
})
>>>>>>> 9f067238882eec05bfa712e7bafa819015623fad

// PATCH /routines/:routineId(**)
routinesRouter.patch("/routineId", requireUser, async (req, res, next) => {
    const {routineId} = req.params;

    try {
        if (Object.keys(req.body).length === 0) {
            throw Error("No fields to update")
        }
        const updateFields = {id: routineId, ...req.body}
        const updatedRoutine = await updateRoutine(updateFields)
        res.send(updatedRoutine)
    } catch (error) {
        console.log(error)
    }
})

// DELETE /routines/:routineId (**)
routinesRouter.delete("/:routineId", requireUser, async (req, res, next)=> {
    const id = req.params.routineId;
    try {
        const routine = await getRoutineById(id);
        if (routine.creatorId != req.user.id) {
            next({
                name: "UserNotFound",
                message: "User is not allowed to delete this routine"
            })
        } else {
            await destroyRoutine(routine.id)
            res.send(routine)
        }
    } catch (error) {
        console.log(error)
    }
})

// POST /routines/:routineId/activities(*)
routinesRouter.post("/routineId/activities", requireUser, async (req, res, next) => {
    const {activityId, duration, count} = req.body;
    const {routineId} = req.params;
    const activityRoutineId = await getPublicRoutinesByActivity(activityId);
    try {
        if (activityRoutineId) {
            res.send({
                name: "ActivityExists",
                message: "Activity ID already exists in this routine"
            })
        } else {
            const addedActivity = await attachActivitiesToRoutines({
                routineId,
                activityId,
                duration,
                count
            })
            res.send(addedActivity)
        }
    } catch (error) {
        console.log(error)
    }
})