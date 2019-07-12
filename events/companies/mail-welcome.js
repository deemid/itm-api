const { transporter } = require('../../middleware/index')
module.exports = ({company, user, password, name})=>{
  // TODO send email to company
  
  setImmediate(()=>{
    let mail = `
      Welcome,
      You have been granted access to use the intimate.io payment gateway. Please login using the following information:

      Email: ${user.email}
      Password: ${password}
    `

    let mailOptions = {
      to: user.email,
      from: 'help@intimate.io',
      subject: 'Intimate Account',
      text: mail,
    }

    console.log(mail)

    transporter
    .sendMail(mailOptions)
    .then(() => {
      console.log('Mail sent to: ' + user.email)
    })
  })
}
