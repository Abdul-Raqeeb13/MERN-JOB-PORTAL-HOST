const mongoose = require('mongoose');

// Define the schema for the user profile
const userProfileSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  jobTitle: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    required: true, 
    trim: true 
  },
  dob: { 
    type: Date, 
    required: true 
  },
  age: { 
    type: Number, 
    required: true 
  },
  experience: { 
    type: Number, 
    required: true 
  },
  location: { 
    type: String, 
    required: true, 
    trim: true 
  },
  phone: { 
    type: String, 
    required: true, 
    trim: true, 
    match: [/^\d{10,15}$/, "Invalid phone number"] 
  },
  email: { 
    type: String, 
    required: true, 
    trim: true, 
    unique: true, 
    match: [/^\S+@\S+\.\S+$/, "Invalid email address"] 
  },
  skills: { 
    type: [String], 
    required: true 
  },
  experiences: { 
    type: String, 
    required: true, 
    trim: true 
  },
  education: { 
    type: String, 
    required: true, 
    trim: true 
  },
}, { timestamps: true });

// Create the model from the schema
const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
