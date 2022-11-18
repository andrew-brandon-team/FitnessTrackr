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


// PATCH /routines/:routineId(**)


// DELETE /routines/:routineId (**)


// POST /routines/:routineId/activities(*)


// PATHC /routine_activities/:routineActivityId(**)


// DELETE /routine_activities/:routineActivityId (**)


//

    // const routines = allRoutines.filter(routines => {
    //   if (routine.isPublic)
    // })