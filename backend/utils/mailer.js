const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com', // Outlook SMTP server hostname
  port: 587, // Port for secure TLS connection
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'info.olympiad@nust.edu.pk', // Your Outlook email address
    pass: `i-ij46$BJ-"gN:)` // Your Outlook email password
  }
});
module.exports = { transporter };


// info.olympiad@nust.edu.pk
// i-ij46$BJ-"gN:)