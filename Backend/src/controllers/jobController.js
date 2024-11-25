//logic for routes
"use strict";

const jobModel = require("../models/jobModel");
const responseMessage = require("../utils/responseMessages");

const job = {};

//add job after login
/* { HTTP METHOD - POST, API ENDPOINT - http://localhost:3334/job/addJob }*/
job.addJob = async (req, res, next) => {
  try {
    const {
        job_id,
        // document_id,
        // company_id,
        job_title,
        job_category,
        job_type,
        priority,
        job_status,
        job_board,
        applied_date,
        follow_date,
        personal_note,
    } = req.body;

    // Validate required fields
    // if (!job_id || !job_title || !job_category || !job_type || !job_status || !applied_date || !follow_date) 
    //   {
    //     return res.status(400).json({ error: 'Missing required fields' });
    //   }

    // Create a new job
    let job = await jobModel.create({
        job_id,
        // document_id,
        // company_id,
        job_title,
        job_category,
        job_type,
        priority,
        job_status,
        job_board,
        applied_date,
        follow_date,
        personal_note,
    });

    return res.status(200).send({
      status: true,
      message: responseMessage.ADD_JOB,
   });
} catch (err) {
  return res.status(400).send({
    status: false,
    message: responseMessage.ERROR,
});
}
};

 //get all jobs list
/* { HTTP METHOD - GET, API ENDPOINT - http://localhost:3334/job/getAllJobs }*/
job.getAllJobs = async (req, res, next) => {
  try {
    let jobsList = await jobModel.findAll()
    if (jobsList) {
      return res.status(200).send({
          status: true,
          message: responseMessage.JOBSLIST,
          list : jobsList
        });
    } 
    return res.status(500).send({
      status: false,
      message: responseMessage.JOB_LISTNOTFOUND,
    });
  }
  catch (err) {
      return res.status(400).send({
          status: false,
          message: responseMessage.ERROR,
      });
  } 
};

module.exports = job;

  