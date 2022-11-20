// This is where we will be building our pg.Client instance

// 1. Import pg
const pg = require('pg');
const { client } = require('./db/index');

// 2. Make a new pg.client instance
const client = new pg.Client(process.env.DB_URL || 'postgres://localhost:5432/fitness-dev' )

// 3. Don't forget to connect your db client
client.connect();

// Last step. Export the db client
module.exports = {
  client
}