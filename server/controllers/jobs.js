//this controller will interface directly with PostgreSQL database - pulling an up-to-date list of jobs,
// adding or deleting jobs

// const db = require("../models/db");
import db from '../models/db.js';

// Get all jobs
export const getAllJobs = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM jobs');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// Get a specific job
export const getJobById = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM jobs WHERE id = $1', [
      req.params.id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Job not found' });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Create a new job
export const createJob = async (req, res, next) => {
  const { title, location, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  try {
    const result = await db.query(
      `INSERT INTO jobs (title, location, description)
       VALUES ($1, $2, $3) RETURNING *`,
      [title, location, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Close a job
export const closeJob = async (req, res, next) => {
  try {
    const result = await db.query(
      `UPDATE jobs SET status = 'closed' WHERE id = $1 RETURNING *`,
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job closed', job: result.rows[0] });
  } catch (err) {
    next(err);
  }
};
