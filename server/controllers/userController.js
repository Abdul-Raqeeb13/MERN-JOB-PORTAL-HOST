const { getAllJobs } = require('../models/adminModel');
const { findUser, updateUserJobs, createUserWithJob } = require('../models/userModel');
const { getJob, findSpecificJob } = require('../models/adminModel');
const { findUserById } = require('../models/authModel');
const mongoose = require('mongoose');

// Function to display all jobs to the user
exports.userViewJobs = async (req, res) => {
    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required."
            });
        }

        // Fetch user data based on userId
        const userdata = await findUser(userId);

        // Fetch all available jobs
        const allJobs = await getAllJobs();

        // If the user is not found or has not applied for any jobs, return all jobs
        if (!userdata || !userdata.jobs || userdata.jobs.length === 0) {
            return res.status(200).json({
                success: true,
                data: allJobs
            });
        }

        // Extract job IDs that the user has already applied for
        const userJobIds = userdata.jobs.map(job => job._id.toString());

        // Filter out jobs the user has already applied for
        const jobsNotApplied = allJobs.filter(job => !userJobIds.includes(job._id.toString()));

        return res.status(200).json({
            success: true,
            data: jobsNotApplied
        });

    } catch (error) {
        console.error("Error fetching jobs:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching jobs.",
            error: error.message
        });
    }
};



// Function to handle job application
exports.userapplyjob = async (req, res) => {
    
    const { userId, jobId } = req.body;
    console.log(userId, jobId);
    

    try {
        // Fetch the user's email and check if the user exists
        const userdata = await findUserById(userId);
        console.log(userdata);
        
        if (!userdata) {
            return res.status(404).json({ message: 'User not found' });
        }

        const useremail = userdata.email;
        console.log(useremail);
        

        // Fetch the job details
// console.log({jobId});
        
        const jobData = await getJob(jobId);
        console.log(jobData);
        
        if (!jobData) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Add status and appliedAt to the job data
        const addJobStatus = {
            ...jobData._doc,
            status: 'pending',
            appliedAt: new Date()
        };

        console.log(addJobStatus);
        

        // Check if the user has already applied for the job
        const userAppliedJobs = await findUser(userId);
        const hasApplied = userAppliedJobs && userAppliedJobs.jobs.some(job => job._id.toString() === jobId);

        if (hasApplied) {
            return res.status(400).json({ message: 'You have already applied for this job.' });
        }

        if (userAppliedJobs) {
            // Update the jobs array with the new job
            await updateUserJobs(userId, useremail, addJobStatus);
            return res.status(200).json({ message: 'Job applied successfully!' });
        } else {
            // Create a new user document with the applied job
            await createUserWithJob(userId, useremail, addJobStatus);
            return res.status(201).json({ message: 'Job applied successfully!' });
        }
    } catch (error) {
        console.error('Error while applying job:', error);
        return res.status(500).json({ message: 'Error applying for the job', error: error.message });
    }
};


// Function to fetch the user's applied jobs
exports.userAppliedJobs = async (req, res) => {
    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required."
            });
        }

        // Fetch the user and their applied jobs
        const getUser = await findUser(userId);
        if (getUser && Array.isArray(getUser.jobs) && getUser.jobs.length > 0) {
            const filteredJobs = getUser.jobs.filter(job => job !== null);

            return res.status(200).json({
                success: true,
                data: filteredJobs
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No applied jobs found for this user."
            });
        }
    } catch (error) {
        console.error("Error fetching applied jobs:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching applied jobs.",
            error: error.message
        });
    }
};





// const mongoose = require('mongoose'); // Import mongoose if not already in your file
// const { findSpecificJob } = require('../models/jobModel'); // Adjust the path if necessary

exports.JobDetails = async (req, res) => {
    // console.log("Received request for job details");

    try {
        const jobId = req.params.jobid;

        // Validate jobId format
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            // console.log("Invalid job ID format:", jobId);
            return res.status(400).json({
                success: false,
                message: "Invalid job ID format."
            });
        }

        // Fetch job details
        const job = await findSpecificJob(jobId);

        // Check if job exists
        if (!job) {
            // console.log("Job not found:", jobId);
            return res.status(404).json({
                success: false,
                message: "Job not found."
            });
        }

        // Return job details
        // console.log("Job found:", job);
        return res.status(200).json({
            success: true,
            data: job
        });

    } catch (error) {
        // console.error("Error fetching job details:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching job details.",
            error: error.message
        });
    }
};


