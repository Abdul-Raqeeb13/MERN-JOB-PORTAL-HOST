const nodemailer = require('nodemailer')
require('dotenv').config()


exports.sendMail = (username, email, jobtitle, jobstatus) => {
    
    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.smtpemail,
        pass: process.env.smtppasskey,
    },
    tls: {
        rejectUnauthorized: false
    }

})

const info = {
    from: process.env.smtpemail,
    to: email,
    subject: "Welcome to Our Job Portal",
    html: `
    <h1>Hi ${username} </h1>
    <p>You applied for the job of ${jobtitle} is <b>${jobstatus}</b> by admin</p>   
    `

}

transporter.sendMail(info, (err, result) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(result);
        
    }
})
}