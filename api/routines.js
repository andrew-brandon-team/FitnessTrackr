const { routines } = require(".");

const {
    getRoutineById,
    getRoutinesWithoutActivities,
    getAllRoutines,
    getAllPublicRoutines,
    getAllRoutinesByUser,
    getPublicRoutinesByUser,
    getPublicRoutinesByActivity,
    createRoutine,
    updateRoutine,
    destroyRoutine,
} = require('../db');

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


// PATCH /routines/:routineId(**)


// DELETE /routines/:routineId (**)


// POST /routines/:routineId/activities(*)


// PATHC /routine_activities/:routineActivityId(**)


// DELETE /routine_activities/:routineActivityId (**)


//

    // const routines = allRoutines.filter(routines => {
    //   if (routine.isPublic)
    // })