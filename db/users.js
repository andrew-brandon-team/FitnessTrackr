const {client} = require("./index");
const bcrypt = require('bcrypt')

async function createUser({ username, password }) {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
    try {
        const { rows: [user] } = await client.query(`
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING id, username;
        `, [username, hashedPassword]);

        return user
    } catch (error) {
        console.log(error)
    }
}

async function getUser ({ username, password }) {
    if (!username || !password) return
    try {
        const user = await getUserByUsername(username)

        const hashedPassword = user.password
        const passwordMatched = await bcrypt.compare(password, hashedPassword)
        if (passwordMatched) {
            delete user.password;
            return user;
        } else {
            return null;
        }

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