const { validate: uuidValidate } = require("uuid");

const { buildPropertyError } = require("./validate");
const { isUser, getUser } = require("../db/user");
const { isDefined, isValidType, isValidEmail, isInRange } = require("./common");
const { verifyJwtToken } = require("../utils/jwt");

const validateParams = (ctx, errors) => {
  const { brokerDataToken } = ctx.params;

  if (!isDefined(brokerDataToken))
    return errors.push(buildPropertyError("params", "no params found"));

  const brokerData = verifyJwtToken(brokerDataToken, process.env.JWT_DATA_KEY);
  if (!brokerData)
    return errors.push(buildPropertyError("params", "invalid params"));

  const { email, userId, name } = brokerData;

  if (
    !isDefined(email) ||
    !isDefined(userId) ||
    !isDefined(name) ||
    !isValidType(email, "string") ||
    !isValidType(name, "string") ||
    !uuidValidate(userId) ||
    !isValidEmail(email) ||
    !isInRange(name, "BOTH", 1, 25)
  )
    return errors.push(buildPropertyError("params", "invalid params"));

  ctx.request.state = { email, userId, name };
};

const validateBroker = async (ctx, errors) => {
  const brokerData = ctx.request.state;
  if (!brokerData) return;

  const { email, userId } = brokerData;
  if (!(await isUser({ userId, email, role: "B" })))
    return errors.push(buildPropertyError("invalid", "not a valid broker"));
  else if (!(await getUser({ userId, approvedByAdmin: false })))
    return errors.push(
      buildPropertyError("invalid", "broker is already approved")
    );
};

module.exports = { validateParams, validateBroker };
