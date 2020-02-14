// import nodemailer from "nodemailer"

const nodemailer = require('nodemailer')

 function sendReminding(email, text) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
    user: 'skincare.pairproject@gmail.com',
    pass: 'skincare12345'
  }
});

let mailOptions = {
  from: 'skincare.pairproject@gmail.com', 
  to: email, 
  subject: "Your purchase from Skin Type receipt", 
  text: "Hello world?", 
  html: text
}
transporter.sendMail(mailOptions, function (err, data) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('email sent');
    this.emailRemind = ''
    this.textRemind = ''
  }
})
}

sendReminding("fadhilahrayafi@gmail.com", "haloooo")