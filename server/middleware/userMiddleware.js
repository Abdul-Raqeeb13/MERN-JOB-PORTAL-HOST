const JWT = require("jsonwebtoken");
require("dotenv").config();
const {findUserById} = require('../models/authModel')


exports.userMiddleware = (req, res, next) => {

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
                next()
            }
        })
    }
 catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error });
}
}


