const express = require("express")
const router = express.Router()
const { adminMiddleware } = require("../middleware/adminMiddleware")
const { adminAddJobs, adminViewJobs, adminDeleteJobs, adminAppliedJobs, adminAcceptJobs, adminRejectJobs, adminGetUserProfile } = require("../controllers/adminController")
const { route } = require("./userRouter")

// router.get('/adminaddobs', adminMiddleware,adminAddJobs)
router.post('/adminaddjobs', adminMiddleware, adminAddJobs)
router.get('/adminviewjobs', adminMiddleware, adminViewJobs)
router.delete('/admindeletejobs', adminMiddleware, adminDeleteJobs)
router.get('/adminappliedjobs', adminMiddleware, adminAppliedJobs)
router.post('/adminacceptJob', adminMiddleware, adminAcceptJobs)
router.post('/adminrejectJob', adminMiddleware, adminRejectJobs)
router.get("/adminUserProfile", adminMiddleware, adminGetUserProfile)

module.exports = router

