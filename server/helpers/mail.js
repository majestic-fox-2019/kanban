const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_KEY)

function sendEmail(userEmail) {
  const msg = {
    to: userEmail,
    from: 'a.marzmellow21@gmail.com',
    subject: 'New invitation to project',
    text:
      'A new invitation to join a project, please kindly check your kanban account. Click https://projekanban.firebaseapp.com',
    html:
      '<strong>A new invitation to join a project, please kindly check your kanban account. Click https://projekanban.firebaseapp.com</strong>'
  }
  sgMail
    .send(msg)
    .then(response => {
      console.log(response, 'msg sent')
    })
    .catch(err => {
      console.log(err.response.body)
    })
}

module.exports = sendEmail
