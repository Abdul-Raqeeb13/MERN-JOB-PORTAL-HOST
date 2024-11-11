const mongoose = require('mongoose');
const { ObjectId } = require('mongodb'); 
const {sendMail} = require('../Utilities/sendMail')

const appliedJobsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },  // Unique user ID
  useremail: { type: String, required: true },  // Add useremail here
  jobs: [{ 
    type: Object,
    required: true
  }]
});



// Export the model
const AppliedJobs = mongoose.model('AppliedJobs', appliedJobsSchema);

// Find user by userId
exports.findUser = (userId) => AppliedJobs.findOne({ userId });

exports.getall = () => AppliedJobs.find();

// Update user jobs array by pushing the entire job object
exports.updateUserJobs = (userId, useremail, jobdata) => {
  return AppliedJobs.updateOne(
      { userId },
      {
          $set: { useremail },  // Set or update the useremail field
          $push: { jobs: jobdata }  // Append the job data to the jobs array
      }
  );
};

// Create a new user with the full job object
exports.createUserWithJob = (userId, useremail, jobdata) => {
  const newUser = new AppliedJobs({
      userId,
      useremail,  // Store useremail here
      jobs: [jobdata]  // Initialize with the first job object in the array
  });
  return newUser.save();
};


exports.updateAcceptJobStatus = async (parentId, jobId, username, useremail, jobtitle) => {
  try {
    // Convert IDs to ObjectId instances with 'new'
    const parentObjectId = new mongoose.Types.ObjectId(parentId);
    const jobObjectId = new mongoose.Types.ObjectId(jobId);

    const result = await AppliedJobs.updateOne(
      {
        _id: parentObjectId, // Main ID
        "jobs._id": jobObjectId // Job ID in the jobs array
      },
      {
        $set: {
          "jobs.$.status": "Accepted" // Desired status
        }
      }
    );

    const sendemail = await sendMail(username, useremail , jobtitle, "Accepted") 


    return result; // Return the result of the update operation
  } catch (error) {
    console.error("Error updating job status:", error);
    throw error; // Re-throw the error for further handling
  }
};


exports.updateRejectJobStatus = async (parentId, jobId, username, useremail, jobtitle) => {
  try {

    // Convert IDs to ObjectId instances with 'new'
    const parentObjectId = new mongoose.Types.ObjectId(parentId);
    const jobObjectId = new mongoose.Types.ObjectId(jobId);
    
    const result = await AppliedJobs.updateOne(
      {
        _id: parentObjectId, // Main ID
        "jobs._id": jobObjectId // Job ID in the jobs array
      },
      {
        $set: {
          "jobs.$.status": "Rejected" // Desired status
        }
      }
    );


    const sendemail = await sendMail(username, useremail , jobtitle, "Rejected") 
    

    // return result; // Return the result of the update operation
  } catch (error) {
    console.error("Error updating job status:", error);
    throw error; // Re-throw the error for further handling
  }
};