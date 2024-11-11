const { getAllJobs } = require('../models/adminModel');
const { findUser, updateUserJobs, createUserWithJob } = require('../models/userModel');
const { getJob } = require('../models/adminModel');
const { findUserById } = require('../models/authModel');

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

    try {
        // Fetch the user's email and check if the user exists
        const userdata = await findUserById(userId);
        if (!userdata) {
            return res.status(404).json({ message: 'User not found' });
        }

        const useremail = userdata.email;

        // Fetch the job details
        const jobData = await getJob(jobId);
        if (!jobData) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Add status and appliedAt to the job data
        const addJobStatus = {
            ...jobData._doc,
            status: 'pending',
            appliedAt: new Date()
        };

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

