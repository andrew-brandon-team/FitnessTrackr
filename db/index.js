// This is where we will be building our pg.Client instance

// 1. Import pg
const pg = require('pg');
const { client } = require('./db/index');

// 2. Make a new pg.client instance
let client 
if (process.env.db_url) {
  new pg.Client(process.env.db_url)
} else {
  client = new pg.Client({
    host: 'localhost',
    database: 'fitness-dev',
    port: 5432,
    user: 'sleazycook',
    password: ''
  })
}

// 3. Don't forget to connect your db client
client.connect();

// Last step. Export the db client
module.exports = {
  client
}