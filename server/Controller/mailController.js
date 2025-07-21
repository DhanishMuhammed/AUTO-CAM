const nodemailer = require('nodemailer');
require('dotenv').config();



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationMail = async (toEmail, username, serviceName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Service Confirmation',
    html: `
      <h3>Hello ${username},</h3>
      <p>Your <strong>${serviceName}</strong> service has been successfully confirmed.</p>
      <p>We appreciate your trust in our service.</p>
      <br>
      <p>Best regards,<br/>Your Company Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(" Confirmation mail sent to:", toEmail);
  } catch (error) {
    console.error(" Error sending email:", error);
  }
};

module.exports = sendConfirmationMail;
