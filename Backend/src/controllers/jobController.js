//logic for routes
"use strict";

const jobModel = require("../models/jobModel");
const documentModel = require("../models/documentModel");
const upload = require("../middleware/upload"); // Import the multer upload config
const responseMessage = require("../utils/responseMessages");

const job = {};

//add job after login
/* { HTTP METHOD - POST, API ENDPOINT - http://localhost:3336/job/addJob }*/
job.addJob = async (req, res, next) => {
  try {
    const {
        job_id,
        user_id,
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
        user_id,
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
      jobAdded: job
   });
} catch (err) {
  return res.status(400).send({
    status: false,
    message: responseMessage.ERROR,
});
}
};

 //get all jobs list
/* { HTTP METHOD - GET, API ENDPOINT - http://localhost:3336/job/getAllJobs }*/
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

//upload document for jobs
/* { HTTP METHOD - POST, API ENDPOINT - http://localhost:3336/document/uploadDocument }*/
job.uploadDocument = [
  upload.single('file_path'), // Multer middleware to handle single file upload
  async (req, res, next) => {
    try {

      //Check if the document already exists for the job
      let checkDoc = await documentModel.findOne({
        where: {
          job_id: req.body.job_id,
        },
        raw: true
      });

      if (checkDoc) {
        return res.status(400).send({
          status: false,
          message: 'Document already exists for this job',
        });
      }

      // Prepare data for the new document
      const documentData = {
        document_name: req.body.document_name, // From the request body
        job_id: req.body.job_id, // From the request body
        document_type: req.body.document_type, // From the request body
        file_path: req.file.path, // File path from the uploaded file
      };

      // Save document information to the database
      const savedDocument = await documentModel.create(documentData);

      if (savedDocument) {
        return res.status(201).send({
          status: true,
          message: 'Document uploaded successfully',
          data: savedDocument,
        });
      }
    } 
    catch (err) {
      return res.status(500).send({
        status: false,
        message: 'Error while uploading the document',
      });
    }
  }
];

module.exports = job;

  