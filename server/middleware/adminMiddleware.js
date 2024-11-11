const JWT = require("jsonwebtoken");
require("dotenv").config();
const {findUserById} = require('../models/authModel')


exports.adminMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).send({ message: "Token not provided" });
        }

        JWT.verify(authorization, process.env.SECRET_KEY, async function (error, decoded) {
            if (error) {
                return res.status(403).send({ message: "Invalid Token" });
            }
            else {
                // Extract user type from the decoded token
                const { _id } = decoded;
                
                const data = await findUserById(_id)
                
                // If the user type is admin, allow access
                if (data.usertype === "admin") {
                    next();
                } else {
                    // If not admin, deny access
                    return res.status(403).send({ message: "Please login as admin" });
                }
            }


        });
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error });
    }
};
