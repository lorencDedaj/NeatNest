// server/models/queries.js
import pool from './db.js';

export const getAllUsers = async () => {
  const { rows } = await pool.query('SELECT id, email, role FROM users');
  return rows;
};
