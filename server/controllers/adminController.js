const adminAddJobFormValidator = require("../validators/adminAddJobValidator");
const { postJob, getAllJobs, deleteJobs,getJob } = require('../models/adminModel');
const { getall, updateAcceptJobStatus, updateRejectJobStatus } = require('../models/userModel')
const {findUserById} = require('../models/authModel')
// const PdfDetails = require('../models/pdfModel'); // Adjust the path based on your directory structure


exports.adminAddJobs = (async (req, res) => { 
    try {
        const { error, value } = adminAddJobFormValidator.validate(req.body);
        
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            });
        } else {
            const jobResponse = await postJob(req.body);  // Avoid naming conflict by using 'jobResponse'
            
            if (jobResponse) {
                return res.status(201).send({  // 201: Created
                    message: "Job Posted Successfully"
                });
            } else {
                return res.status(500).send({  // 500: Internal Server Error
                    message: "Something went wrong"
                });
            }
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });  // Catch block with status 500 for server errors
    }
});


exports.adminViewJobs = async (req, res) => {
    try {
        const allJobs = await getAllJobs();
        
        if (allJobs && allJobs.length > 0) {
            return res.status(200).json({
                success: true,
                data: allJobs
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No jobs found."
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching jobs.",
            error: error.message
        });
    }
};


exports.adminDeleteJobs = async (req, res) => {
    try {
        const { id } = req.query; // Extract job ID from query parameters

        // Check if the job ID is provided
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Job ID is required',
            });
        }

        const deleteJob = await deleteJobs({ _id: id }); // Call deleteJobs function

        if (deleteJob) {
            return res.status(200).json({
                success: true,
                message: 'Job deleted successfully',
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Job not found',
            });
        }
    } catch (error) {
        console.error(`Error deleting job ID ${req.query.id}: ${error.message}`); // Log error details
        return res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the job',
            error: error.message, // Return error message for debugging
        });
    }
};


exports.adminAppliedJobs = async (req, res) => {
    try {
        const appliedJobs = await getall();
        
        // Send the data to the frontend
        res.status(200).json({
            success: true,
            data: appliedJobs
        });
    } catch (error) {
        console.error("Error fetching applied jobs:", error);

        // Send error response to the frontend
        res.status(500).json({
            success: false,
            message: "Failed to fetch applied jobs"
        });
    }
};


exports.adminAcceptJobs = async (req, res) => {
    try {
        const { jobId, JobDetails, userid } = req.body;

        // Retrieve user and job information
        const getUser = await findUserById(userid);
        const JobData = await getJob(JobDetails);

        // Update the job status to 'accepted'
        const updatedJob = await updateAcceptJobStatus(jobId, JobDetails, getUser.name, getUser.email, JobData.title);

        // Send a success response with updated job information
        res.status(200).json({
            success: true,
            message: "Job status updated to accepted",
            data: updatedJob
        });
        
    } catch (error) {
        console.error("Error updating job status:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update job status"
        });
    }
};


exports.adminRejectJobs = async (req, res) => {
    try {
        const { jobId, JobDetails, userid } = req.body;
        // console.log("aaaaaa" , jobId, JobDetails);
        const getUser = await findUserById(userid)
        const JobData = await getJob(JobDetails)
        // console.log(getUser.name);
        
        const updatedJob = await updateRejectJobStatus(jobId, JobDetails, getUser.name, getUser.email, JobData.title);
        // console.log(updatedJob);
        res.status(200).json({
            success: true,
            message: "Job status updated to rejected",
            data: updatedJob
        });
        
    } catch (error) {
        console.error("Error updating job status:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update job status"
        });
    }
};


// exports.adminGetUserCV = async (req, res) => {
//     try {
//         const { userId } = req.query; // Change this to req.query to get the userId from query parameters
        
//         // Find the PDF details for the specified user ID
//         // const pdfDetails = await PdfDetails.findOne({ userId: userId });

//         // if (!pdfDetails) {
//         //     return res.status(404).json({ message: "PDF not found" });
//         // }

//         // Respond with the PDF name
//         // res.status(200).json({ pdfName: pdfDetails.pdf });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

