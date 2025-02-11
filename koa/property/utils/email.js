const nodemailer = require("nodemailer");

const FROM = process.env.FROM;
const APP_PASS = process.env.APP_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: FROM,
    pass: APP_PASS,
  },
});

const sendMail = async (to, subject, text, html = null) =>
  await transporter.sendMail({
    from: FROM,
    to,
    subject,
    text,
    html,
  });

module.exports = { sendMail };
