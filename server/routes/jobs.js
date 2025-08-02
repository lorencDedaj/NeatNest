import express from 'express';

import { getAllJobs, createJob, getJobById } from '../controllers/jobs.js';

const router = express.Router();

// GET jobs --- /api/jobs
router.get('/', getAllJobs);

// POST jobs --- /api/jobs
router.post('/', createJob);

// GET jobs by id --- /api/jobs/:id
router.get('/:id', getJobById);

export default router;
