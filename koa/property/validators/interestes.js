const { validate: uuidValidate } = require("uuid");
const { buildPropertyError } = require("./validate");
const { isDefined, isValidEmail, isValidType, isInRange } = require("./common");
const { interestedStatus } = require("../constants/constant");

const validateInterestStatus = (ctx, errors) => {
  const { status } = ctx.request.body;
  if (!isDefined(status))
    return errors.push(buildPropertyError("status", "status is required"));
  else if (!Object.values(interestedStatus).includes(status))
    return errors.push(
      buildPropertyError("status", "not a valid interest status")
    );
};

const validateInterestId = (ctx, errors) => {
  const interestId = ctx.params.interestId || ctx.request.body.interestId;
  if (!isDefined(interestId))
    return errors.push(
      buildPropertyError("interestId", "interest id is required")
    );
  else if (!uuidValidate(interestId))
    return errors.push(buildPropertyError("interestId", "invalid interest id"));
};

const validateOwnerEmail = async (ctx, errors) => {
  const { ownerEmail } = ctx.request.body;
  if (!isDefined(ownerEmail))
    return errors.push(
      buildPropertyError("ownerEmail", "owner email is required")
    );
  else if (!isValidType(ownerEmail, "string"))
    return errors.push(
      buildPropertyError("ownerEmail", "owner email is not a valid string")
    );
  else if (!isValidEmail(ownerEmail))
    return errors.push(
      buildPropertyError("ownerEmail", "owner email is not a valid email")
    );
};

const validateOwnerName = async (ctx, errors) => {
  const { ownerName } = ctx.request.body;
  if (!isDefined(ownerName))
    return errors.push(
      buildPropertyError("ownerName", "owner name is requireds")
    );
  else if (!isValidType(ownerName, "string"))
    return errors.push(
      buildPropertyError("ownerName", "owner name is not valid string")
    );
  else if (!isInRange(ownerName, "BOTH", 1, 25))
    return errors.push(
      buildPropertyError(
        "ownerName",
        "owner name must be of 1 to 25 characters"
      )
    );
};

const validateUserEmail = async (ctx, errors) => {
  const { userEmail } = ctx.request.body;
  if (!isDefined(userEmail))
    return errors.push(
      buildPropertyError("userEmail", "user email is required")
    );
  else if (!isValidType(userEmail, "string"))
    return errors.push(
      buildPropertyError("userEmail", "user email is not a valid string")
    );
  else if (!isValidEmail(userEmail))
    return errors.push(
      buildPropertyError("userEmail", "user email is not a valid email")
    );
};

const validateUserName = async (ctx, errors) => {
  const { userName } = ctx.request.body;
  if (!isDefined(userName))
    return errors.push(
      buildPropertyError("userName", "user name is requireds")
    );
  else if (!isValidType(userName, "string"))
    return errors.push(
      buildPropertyError("userName", "user name is not valid string")
    );
  else if (!isInRange(userName, "BOTH", 1, 25))
    return errors.push(
      buildPropertyError("userName", "user name must be of 1 to 25 characters")
    );
};

module.exports = {
  validateInterestStatus,
  validateInterestId,
  validateOwnerEmail,
  validateOwnerName,
  validateUserEmail,
  validateUserName,
};
