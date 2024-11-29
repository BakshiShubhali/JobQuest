const express = require('express');
require('express-group-routes'); // Add group functionality to Express
const router = express();
const jobController = require('../controllers/jobController');

router.group('/job', (jobRoutes) => {
  jobRoutes.post('/addJob', jobController.addJob);
  jobRoutes.get('/getAllJobs', jobController.getAllJobs);
});

router.group('/document', (documentRoutes) => {
  documentRoutes.post('/uploadDocument', jobController.uploadDocument);
});

module.exports = router;