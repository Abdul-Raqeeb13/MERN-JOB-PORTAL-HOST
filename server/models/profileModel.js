const mongoose = require('mongoose');
const { type } = require('../validators/profileValidator');
const { required } = require('joi');

// Define the schema for the user profile
const userProfileSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true }, // Unique user ID
        name: { type: String, required: true, trim: true },
        jobTitle: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        dob: { type: Date, required: true },
        age: { type: Number, required: true },
        degree: { type: String, required: true, trim: true },
        university: { type: String, required: true, trim: true },
        year: { type: String, required: true, trim: true },
        experience: { type: Number, required: true },
        location: { type: String, required: true, trim: true },
        profileComplete : {type: Boolean, required: true},
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
        skills: { type: String, required: true, trim: true },
        experiences: [
            {
                company: { type: String, required: true, trim: true },
                role: { type: String, required: true, trim: true },
                duration: { type: String, required: true, trim: true }
            }
        ]
    },
    { timestamps: true }
);

// Create the model from the schema
const UserProfile = mongoose.model('UserProfile', userProfileSchema);

exports.createProfile = (obj) => UserProfile.create(obj);

exports.findUserProfile = (userId) => UserProfile.findOne({ userId });
