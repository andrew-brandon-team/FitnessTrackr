const client = require("./client")

async function getAllActivities() {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM activities`)

        return rows
    } catch (error) {
        console.log(error)
    }
}

async function getActivityById(id) {
    try {
        await client.query(`
        SELECT id
        FROM activities
        WHERE id=${id}`)
    } catch (error) {
        console.log(error)
    }
}

async function getActivityByName(name) {
    try {
        await client.query(`
        SELECT name
        FROM activities
        WHERE name=${name}`)
    } catch (error) {
        console.log(error)
    }
}

async function attachActivitiesToRoutines(routines) {
    try {
        await client.query(`
        SELECT `)
    } catch (error) {
        console.log(error)
    }
}

async function createActivity({ name, description }) {
    try {
        await client.query(`
        INSERT INTO activities(name, description)
        VALUES ($1, $2)
        ON CONFLICT (name) DO NOTHING
        RETURNING *
        `, [name, description])
    } catch (error) {
        console.log(error)
    }
}

async function updateActivity({ id, ...fields }) {

}


module.exports = {
    getAllActivities,
    getActivityById,
    getActivityByName,
    attachActivitiesToRoutines,
    createActivity,
    updateActivity
}