// const { Pool } = require('pg');
import { Pool } from 'pg';
import 'dotenv/config';

// TEMP: Log environment variables to make sure they're loading correctly
console.log('Connecting to DB with:');
console.log({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Create the connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default pool;
