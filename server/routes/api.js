const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobs');
const jobApplications = require('../controllers/applications');
const authorization = require('../controllers/auth'); //can be used for authorization

// get a list of all available jobs
router.get('/', jobsController.getAllJobs);

// get alist of jobs by user
router.get('/:user', jobsController.getJobByUser);

// post a job
router.post('/', jobsController.createJob);

//close/ archive a job that has been completed ?

// apply for a listed job - a post request with applicants data?

router.post('/', jobApplications.applyForJob);

module.exports = router;
