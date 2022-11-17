const client = require("./client")

async function getAllActivities() {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM activities`);

        return rows
    } catch (error) {
        console.log(error)
    }
}

async function getActivityById(id) {
    try {
        const { rows: [activity] } = await client.query(`
        SELECT id
        FROM activities
        WHERE id=${id}
        `, [activityId]);

        return activity
    } catch (error) {
        console.log(error)
    }
}

async function getActivityByName(name) {
    try {
        const { row: [activity] } = await client.query(`
        SELECT name
        FROM activities
        WHERE name=${name}
        `, [name]);

        return activity
    } catch (error) {
        console.log(error)
    }
}

async function attachActivitiesToRoutines(routines) {
    const routineArr = [...routines];
    const attach = routines.map((routine) => routine.id);
    if (routines.length === 0) {
        return;
    }

    try {
        const { rows: activities } = await client.query(`
        SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities.id AS "routineActivityId",
        routine_activities."routineId"
        FROM activities
        JOIN routine_activities ON routine_activities."activityId" = activities.id
        WHERE routine_activities."routineId" IN (${attach.map((routineId, index) => ('$' + (index + 1))).join(',')});
        `, attach);
        for (const routine of routineArr) {
            const addActivities = activities.filter((activity) => routine.id === activity.routineId);
            routine.activities = addActivities
        }

        return routineArr
    } catch (error) {
        console.log(error)
    }
}

async function createActivity({ name, description }) {
    try {
        const { rows: [activities] } = await client.query(`
        INSERT INTO activities(name, description)
        VALUES ($1, $2)
        ON CONFLICT (name) DO NOTHING
        RETURNING *
        `, [name, description])

        return activities
    } catch (error) {
        console.log(error)
    }
}

async function updateActivity({ id, ...fields }) {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(",");
    try {
        if (setString.length > 0) {
            const { rows } = await client.query(`
            UPDATE activities
            SET ${setString}
            WHERE id = ${id}
            RETURNING *;
            `, Object.values(fields));
            return rows[0];
        }

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getAllActivities,
    getActivityById,
    getActivityByName,
    attachActivitiesToRoutines,
    createActivity,
    updateActivity
}