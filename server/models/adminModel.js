 const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,  // Automatically add the current date when the job is posted
  },
});

const JobModel = mongoose.model('Jobs', jobSchema);

exports.postJob = (obj) => JobModel.create(obj)
// exports.findUserById = (_id) => JobModel.findById(_id);

exports.getAllJobs = () => JobModel.find()

exports.getJob = (_id) => JobModel.findOne({_id})

exports.deleteJobs = (id) => JobModel.findOneAndDelete(id)

