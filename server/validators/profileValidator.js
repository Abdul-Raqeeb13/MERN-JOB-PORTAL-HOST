const joi = require('joi');

const profileValidator  = joi.object({

    // userid: joi.string().required().messages({
    //     'string.base': "User ID must be a string",
    //     'string.empty': "User ID cannot be empty",
    //     'any.required': "User ID is required"
    // }),

    name: joi.string().trim().required().messages({
        'string.base': "Name must be a string",
        'string.empty': "Name cannot be empty",
        'any.required': "Name is required"
    }),

    jobTitle: joi.string().trim().required().messages({
        'string.base': "Job Title must be a string",
        'string.empty': "Job Title cannot be empty",
        'any.required': "Job Title is required"
    }),

    description: joi.string().trim().required().messages({
        'string.base': "Description must be a string",
        'string.empty': "Description cannot be empty",
        'any.required': "Description is required"
    }),

    dob: joi.date().required().messages({
        'date.base': "DOB must be a valid date",
        'any.required': "DOB is required"
    }),

    age: joi.number().integer().min(0).required().messages({
        'number.base': "Age must be a number",
        'number.min': "Age must be a positive number",
        'any.required': "Age is required"
    }),

    experience: joi.number().integer().min(0).required().messages({
        'number.base': "Experience must be a number",
        'number.min': "Experience must be a positive number",
        'any.required': "Experience is required"
    }),

    location: joi.string().trim().required().messages({
        'string.base': "Location must be a string",
        'string.empty': "Location cannot be empty",
        'any.required': "Location is required"
    }),

    phone: joi.string().trim().pattern(/^\d{10,15}$/).required().messages({
        'string.base': "Phone must be a string",
        'string.empty': "Phone cannot be empty",
        'string.pattern.base': "Phone must be between 10 and 15 digits",
        'any.required': "Phone is required"
    }),

    email: joi.string().trim().email().required().messages({
        'string.base': "Email must be a string",
        'string.empty': "Email cannot be empty",
        'string.email': "Email must be a valid email",
        'any.required': "Email is required"
    }),

    skills: joi.string().trim().required().messages({
        'string.base': "Skills must be a string",
        'string.empty': "Skills cannot be empty",
        'any.required': "Skills are required"
    }),

    experiences: joi.string().trim().required().messages({
        'string.base': "Experience details must be a string",
        'string.empty': "Experience details cannot be empty",
        'any.required': "Experience details are required"
    }),

    education: joi.string().trim().required().messages({
        'string.base': "Education must be a string",
        'string.empty': "Education cannot be empty",
        'any.required': "Education is required"
    }),
});

module.exports = profileValidator ;
