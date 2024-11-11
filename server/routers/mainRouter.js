const express = require("express")
const userRouter = require('./userRouter')
const mainrouter = express.Router()
const adminRouter = require('./adminRouter')


mainrouter.use("/user", userRouter)
mainrouter.use("/admin",adminRouter)


module.exports = mainrouter
