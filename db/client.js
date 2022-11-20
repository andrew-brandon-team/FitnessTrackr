// const { Pool } = require('pg');

// const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/fitness-dev';

// const client = new Pool({
//     connectionString,
//     ssl: process.env.NODE_ENV === 'production' ? { rejectUnathorized: false } : undefined,
// });

// module.exports = client;

// {
//     connectionString: process.env.db_url || 'http://localhost:5432/fitness-dev',
//     host: process.env.db_host || 'localhost',
//     database: process.env.db_database || 'fitness-dev',
//     port: process.env.db_port || 5432,
//     user: process.env.db_user || 'sleazycook',
//     password: process.env.db_password || undefined
//   }