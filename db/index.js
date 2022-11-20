// This is where we will be building our pg.Client instance

// 1. Import pg
const pg = require('pg');
// const { client } = require('./db/index');

// 2. Make a new pg.client instance


const client = new pg.Client({
  connectionString: process.env.db_url || 'http://localhost:5432/fitness-dev',
  host: process.env.db_host || 'localhost',
  database: process.env.db_database || 'fitness-dev',
  port: process.env.db_port || 5432,
  user: process.env.db_user || 'sleazycook',
  password: process.env.db_password || undefined
})



// 3. Don't forget to connect your db client
// client.connect();

// Last step. Export the db client
module.exports = {
  client
}