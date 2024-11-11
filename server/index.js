const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');
const app = express()
const mainrouter = require("./routers/mainRouter")
const bodyParser = require('body-parser');
require("dotenv").config()

const DBUrl = process.env.DB_Connnection_Url
mongoose.connect(DBUrl)

const db = mongoose.connection

db.once("open", ()=>{
    console.log("MongoDB Connection Successfull");
})

db.on("error",()=>{
    console.log("Error occured during MongoDB connection");

})

app.use("/uploads", express.static("uploads"))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(mainrouter)

app.listen(8000,()=>{
    console.log("App is running"); 
})