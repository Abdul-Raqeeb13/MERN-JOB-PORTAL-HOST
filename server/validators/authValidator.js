const joi = require('joi')

const userValidator = joi.object({

    name: joi.string().min(3).max(30).required().messages({
        'string.base': "Name must be a string",
        'string.empty': "Name cannot be empty",
        'string.min': "Name must be at least 3 characters long",
        'string.max': "Name must be less than or equal to 30 characters",
        'any.required': "Name is required"
    }),

    email: joi.string().trim().required().email().messages({
        'string.base': "Email must be a string",
        'string.empty': "Email cannot be empty",
        'string.email': "Email must be a valid",
        'any.required': "Email is required"
    }),

    password: joi.string().trim().min(3).required().messages({
        'string.base': "password must be a string",
        'string.empty': "password cannot be empty",
        'string.min': "password must be at least 3 characters",
        'any.required': "password is required"
    }),

    usertype: joi.string().valid('user', 'admin').default('user').required().messages({
        'string.base': "Usertype must be a string",
        'string.empty': "Usertype cannot be empty",
        'any.required': "Usertype is required",
        'any.only': "Usertype must be either 'user' or 'admin'"
      }),
    
})

module.exports = userValidator