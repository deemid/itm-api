const { validationResult } = require('express-validator/check')
const transporter = require('../../../utils/transporter')

module.exports = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  let { name, email, phoneNumber, password } = req.body

  let mailOptions = {
    to: process.env.API_REQUEST_EMAIL_RECIPIENT,
    from: 'me@gmail.com',
    subject: 'New API Access Request',
    text: 'New API Access Request',
    html: `
    <h2>API Access Credentials</h2>
    <ul>
      <li><strong>Name: </strong>${name}</li>
      <li><strong>Email: </strong>${email}</li>
      <li><strong>Phone Number: </strong>${phoneNumber}</li>
      <li><strong>Password: </strong>${password}</li>
    </ul>
    `,
  }

  let requestorMailOptions = {
    to: unescape(email),
    from: 'me@gmail.com',
    subject: 'New API Access Request',
    text: `Hello ${name}! Your request for API access has been received. We'll get back to you soon. Thanks`,
    html: `
    <h2>API Access Request Confirmation</h2>
    <p>Hello ${name}! Your request for API access has been received. We'll get back to you soon. Thanks </p>
    `,
  }

  transporter
    .sendMail(mailOptions)
    .then(() => {
      // res.status(200).json({ message: 'OK' })
      transporter
        .sendMail(requestorMailOptions)
        .then(() => {
          res.status(200).json({ message: 'OK' })
        })
        .catch(err => {
          console.log('INNER MAIL', err)
          res.status(500).json({ message: 'Error' })
        })
    })
    .catch(err => {
      console.log('OUTER MAIL', err)
      res.status(500).json({ message: 'Error' })
    })
}
