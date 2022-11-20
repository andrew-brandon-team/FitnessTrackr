// This is where we will be building our pg.Client instance

// 1. Import pg
const pg = require('pg');
require('dotenv').config()
// 2. Make a new pg.client instance


// const client = new pg.Client( process.env.db_url || 'http://localhost:5432/fitness-dev')

// const connectionString =  process.env.db_url || 'http://localhost:5432/fitness-dev'

const client = new pg.Client({
  host: process.env.db_host || 'localhost',
  database: process.env.db_database || 'fitness-dev',
  port: process.env.db_port || 5432,
  user: process.env.db_user || 'sleazycook',
  password: process.env.db_password || undefined,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnathorized: false } : undefined,
});
// console.log(client);
// client.connect();

// 3. Don't forget to connect your db client
// client.connect();

// Last step. Export the db client
module.exports = {
  client
}