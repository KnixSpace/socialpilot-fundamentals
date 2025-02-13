const { updateUser } = require("../db/user");
const { sendApprovalConfirmation } = require("../utils/email");

const approveBroker = async (ctx) => {
  const { userId, email, name } = ctx.request.state;
  await updateUser({ userId }, { approvedByAdmin: true });
  await sendApprovalConfirmation(email, name);
  ctx.body = { message: "broker approved successfully" };
};

module.exports = { approveBroker };
