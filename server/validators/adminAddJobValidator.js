const Joi = require('joi');

// Updated validation schema for the job form
const adminAddJobFormValidator = Joi.object({
  title: Joi.string().valid(
    'Frontend Developer', 
    'Backend Developer', 
    'Full Stack Developer', 
    'UI/UX Designer', 
    'DevOps Engineer'
  ).required().messages({
    'string.base': 'Job title must be a string',
    'string.empty': 'Job title cannot be empty',
    'any.required': 'Job title is required',
    'any.only': 'Job title must be one of the available options',
  }),
  description: Joi.string().min(10).required().messages({
    'string.base': 'Job description must be a string',
    'string.empty': 'Job description cannot be empty',
    'string.min': 'Job description must be at least 10 characters',
    'any.required': 'Job description is required',
  }),
  company: Joi.string().min(2).required().messages({
    'string.base': 'Company name must be a string',
    'string.empty': 'Company name cannot be empty',
    'string.min': 'Company name must be at least 2 characters',
    'any.required': 'Company name is required',
  }),
  location: Joi.string().min(2).required().messages({
    'string.base': 'Location must be a string',
    'string.empty': 'Location cannot be empty',
    'string.min': 'Location must be at least 2 characters',
    'any.required': 'Location is required',
  }),
  experience: Joi.string().regex(/^\d+-\d+\s*years$/).required().messages({
    'string.base': 'Experience must be a string (e.g., "2-4 years")',
    'string.empty': 'Experience cannot be empty',
    'string.pattern.base': 'Experience must be in the format "X-Y years"',
    'any.required': 'Experience is required',
  }),
  salary: Joi.number().positive().required().messages({
    'number.base': 'Salary must be a number',
    'number.positive': 'Salary must be a positive number',
    'any.required': 'Salary is required',
  }),
  education: Joi.string().min(2).required().messages({
    'string.base': 'Education must be a string',
    'string.empty': 'Education cannot be empty',
    'string.min': 'Education must be at least 2 characters',
    'any.required': 'Education is required',
  }),
  skills: Joi.string().min(2).required().messages({
    'string.base': 'Skills must be a string',
    'string.empty': 'Skills cannot be empty',
    'string.min': 'Skills must be at least 2 characters',
    'any.required': 'Skills are required',
  }),
});

module.exports = adminAddJobFormValidator;
