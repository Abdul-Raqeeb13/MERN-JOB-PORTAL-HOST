const userValidator = require("../validators/authValidator")
const {findUser , createUser} = require('../models/authModel')
const bcrypt = require('bcrypt');
const loginValidator = require("../validators/loginValidator");
const JWT = require('jsonwebtoken');
const { default: mongoose } = require("mongoose");
require("../models/profileModel")
// const pdfSchema = mongoose.model("PdfDetails") 
require("dotenv").config()


exports.signup = async (req, res) => {
    try {
        const { error, value } = userValidator.validate(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            });
        } else {
            // const filename = req.file.filename;
            const { name, email, password, usertype, file } = req.body;
            
            // Check if email already exists
            const checkEmailExist = await findUser({ email });
            if (checkEmailExist) {
                return res.status(409).send({
                    message: 'Email already exists'
                });
            } else {
                // Hash the password and create the user
                const hashPassword = await bcrypt.hash(password, 12);
                req.body.password = hashPassword;
                const newUser = await createUser(req.body); // This should save the user and return the saved user object

                // Retrieve the newly created user to get the user ID
                // const user = await findUser({ email });
                // if (!user) {
                //     return res.status(500).send({
                //         message: 'Failed to retrieve user after creation'
                //     });
                // }

                // Create an entry in pdfSchema with user ID and filename
                // const response = await pdfSchema.create({
                //     userId: user._id,  // Store the user ID here
                //     pdf: filename      // Store the filename
                // });

                // console.log(response);
                

                return res.status(200).send({
                    message: 'Signup successful!',
                    user: value // Assuming 'value' contains validated user data
                });
            }
        }
    } catch (error) {
        res.status(500).send({
            message: 'Signup failed',
            error: error.message
        });
    }
};


exports.login = async (req, res) => {
    
    const {error , value} = loginValidator.validate(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }

    const {email, password} = req.body;
    const findUserData = await findUser({ email: email });

    if (findUserData) {
        const checkPassword = await bcrypt.compare(password, findUserData.password);
        if (checkPassword) {
            const token = JWT.sign({ _id: findUserData._id }, process.env.SECRET_KEY);
            return res.send({
                message: "Login Success",
                data: findUserData,  // Ensure usertype is included here
                token
            });
        } else {
            return res.status(400).send({
                message: "Invalid Password"
            });
        }
    } else {
        return res.status(404).send({
            message: "User Not Found"
        });
    }
};
