const express = require("express");
const routine_activities = express.Router();
const { getRoutineActivityById, getRoutineById, updateRoutineActivity, destroyRoutineActivity } = require("../db");

routine_activities.patch('/:routineActivityId', async (req, res, next) => {
    const {count, duration} = req.body;
    const id = req.params.routineActivityId;
    try {
        const routineActivity = await getRoutineActivityById(id);
        const routine = await getRoutineActivityById(routineActivity.routineId);
        if (req.user.id != routine.creatorId) {
            next({ name: "Must be logged in"})
        } else {
            const updatedRoutineActivity = await updateRoutineActivity({
                id,
                count,
                duration
            });
            if (updatedRoutineActivity) {
                res.send(updatedRoutineActivity)
            } else {
                next({ name: "This routine does not exist"})
            }
        }
    } catch (error) {
        console.log(error)
    }
})

routine_activities.delete('/:routineActivityId', async (req, res, next) => {
    const {routineActivityId} = req.params;
    try {
        const routineActivity = await getRoutineActivityById(routineActivityId);
        const routine = await getRoutineById(routineActivity.routineId);
        if(req.user.id === routine.creatorId) {
            const destroyActivity = destroyRoutineActivity(routineActivityId);
            res.send(destroyActivity)
        } else {
            next ({ message: "Routine not deleted. Only the creator can delete a routine."})
        }
    } catch (error) {
        console.log(error)
    }
})