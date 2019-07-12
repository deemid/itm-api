const nodemailer = require('nodemailer')

// TODO: HAVE NEW AUTH USER & PASS FOR PRODUCTION
var smtpConfig = {
  host: process.env.SMTP_HOST,
  port: 2525,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
}

const transporter = nodemailer.createTransport(smtpConfig)

module.exports = transporter
