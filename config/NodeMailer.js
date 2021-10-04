const Mailer = require("nodemailer");
require("dotenv").config();
const transporter = Mailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

const sendForMe = (to, html) => {
  transporter.sendMail(
    {
      from: "bawloemil@hotmail.com",
      to,
      subject: "Email Verification",
      html,
    },
    (err, info) => {
      if (err) console.log(err);
      else console.log(info.response);
    }
  );
};

module.exports = sendForMe;
