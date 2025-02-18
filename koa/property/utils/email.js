const nodemailer = require("nodemailer");
const path = require("path");
const pug = require("pug");
const { generateJwtToken } = require("./jwt");

const FROM = process.env.FROM;
const APP_PASS = process.env.APP_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: FROM,
    pass: APP_PASS,
  },
});

const renderTemplate = (templateName, data) => {
  const filePath = path.join(
    __dirname,
    "../views/emails",
    `${templateName}.pug`
  );
  return pug.renderFile(filePath, data);
};

const sendEmail = async (to, subject, template, data) =>
  await transporter.sendMail({
    from: FROM,
    to,
    subject,
    html: renderTemplate(template, data),
  });

const sendAdminApprovalRequest = async (to, name, userId) => {
  await sendEmail(to, "Sent for admin approval", "brokerApprovalRequest", {
    name,
  });

  const brokerDataToken = generateJwtToken(
    { userId, email: to, name },
    process.env.JWT_DATA_KEY
  );

  await sendEmail(FROM, "New broker approval request", "adminApprovalRequest", {
    name,
    brokerDataToken,
  });
};

const sendApprovalConfirmation = async (to, name) => {
  await sendEmail(to, "Request approved", "brokerApproved", { name });
};

module.exports = {
  sendAdminApprovalRequest,
  sendApprovalConfirmation,
  sendNewPropertyInterest,
  sendPropertyInterestupdate,
};
