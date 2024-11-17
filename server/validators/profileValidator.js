const joi = require('joi');

const profileValidator = joi.object({
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

    degree: joi.string().trim().required().messages({
        'string.base': "Degree must be a string",
        'string.empty': "Degree cannot be empty",
        'any.required': "Degree is required"
    }),

    university: joi.string().trim().required().messages({
        'string.base': "University must be a string",
        'string.empty': "University cannot be empty",
        'any.required': "University is required"
    }),

    year: joi.string().trim().required().messages({
        'string.base': "Year must be a string",
        'string.empty': "Year cannot be empty",
        'any.required': "Year is required"
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

    experiences: joi.array().items(
        joi.object({
            company: joi.string().trim().required().messages({
                'string.base': "Company must be a string",
                'string.empty': "Company cannot be empty",
                'any.required': "Company is required"
            }),
            role: joi.string().trim().required().messages({
                'string.base': "Role must be a string",
                'string.empty': "Role cannot be empty",
                'any.required': "Role is required"
            }),
            duration: joi.string().trim().required().messages({
                'string.base': "Duration must be a string",
                'string.empty': "Duration cannot be empty",
                'any.required': "Duration is required"
            })
        })
    ).min(1).required().messages({
        'array.base': "Experiences must be an array",
        'array.min': "At least one experience is required",
        'any.required': "Experiences are required"
    })
});

module.exports = profileValidator;
