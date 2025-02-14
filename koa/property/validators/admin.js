const { validate: uuidValidate } = require("uuid");

const { buildPropertyError } = require("./validate");
const { readUser } = require("../db/user");
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

  const broker = await readUser(
    { userId: brokerData.userId },
    { projection: { _id: 0, password: 0, createdOn: 0, updatedOn: 0 } }
  );

  if (!broker)
    return errors.push(buildPropertyError("invalid", "not a valid broker"));
  else if (broker.approvedByAdmin)
    return errors.push(
      buildPropertyError("invalid", "broker is already approved")
    );
};

module.exports = { validateParams, validateBroker };
