const Joi = require('joi');

// Validation schema for job form
const adminAddJobFormValidator = Joi.object({
  // Validate job title, ensuring it matches one of the provided options
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

  // Validate job description with a minimum length
  description: Joi.string().min(10).required().messages({
    'string.base': 'Job description must be a string',
    'string.empty': 'Job description cannot be empty',
    'string.min': 'Job description must be at least 10 characters',
    'any.required': 'Job description is required',
  }),

  // Validate company name
  company: Joi.string().min(2).required().messages({
    'string.base': 'Company name must be a string',
    'string.empty': 'Company name cannot be empty',
    'string.min': 'Company name must be at least 2 characters',
    'any.required': 'Company name is required',
  }),

  // Validate location
  location: Joi.string().min(2).required().messages({
    'string.base': 'Location must be a string',
    'string.empty': 'Location cannot be empty',
    'string.min': 'Location must be at least 2 characters',
    'any.required': 'Location is required',
  }),

  // Validate experience required (should be a string, e.g., "2-4 years")
  experience: Joi.string().regex(/^\d+-\d+\s*years$/).required().messages({
    'string.base': 'Experience must be a string (e.g., "2-4 years")',
    'string.empty': 'Experience cannot be empty',
    'string.pattern.base': 'Experience must be in the format "X-Y years"',
    'any.required': 'Experience is required',
  }),

  // Validate salary, ensuring it's a positive number
  salary: Joi.number().positive().required().messages({
    'number.base': 'Salary must be a number',
    'number.positive': 'Salary must be a positive number',
    'any.required': 'Salary is required',
  }),
});

module.exports = adminAddJobFormValidator;
