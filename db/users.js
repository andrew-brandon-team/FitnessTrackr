const client = require("./client");

async function createUser({ username, password }) {
    try {
        const { rows: [user] } = await client.query(`
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *
        `, [username, password]);

        return user
    } catch (error) {
        console.log(error)
    }
}

async function getUser ({ username, password }) {
    try {
        const { rows: [user]} = await client.query(`
        SELECT id, username
        from users
        WHERE id=${ username };
        `);

        return user
    } catch (error) {
        console.log(error)
    }
}

async function getUserbyId (userId) {
    try {
        const { rows: [user]} = await client.query(`
        SELECT id, username
        FROM users
        WHERE id=${ userId };
        `);

        if (!user) {
            return null
        }

        return user
    } catch (error) {
        console.log(error)
    }
}

async function getUserByUsername(userName) {
    try {
        const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE username=$1;
        `, [userName]);

        return user;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createUser,
    getUser,
    getUserbyId,
    getUserByUsername
}