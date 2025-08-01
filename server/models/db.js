// const { Pool } = require('pg');
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  databse: process.env.DB_DATABASE,
  password: process.env.DB_PASSOWRD,
  port: process.env.DB_PORT,
});

export default pool;
