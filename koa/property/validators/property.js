const { validate: uuidValidate } = require("uuid");
const { buildPropertyError } = require("./validate");
const { propertyStatus } = require("../constants/constant");
const { isDefined } = require("./common");

const validatePropertyId = (ctx, errors) => {
  const propertyId = ctx.params.propertyId || ctx.request.body.propertyId;
  if (!isDefined(propertyId))
    return errors.push(
      buildPropertyError("propertyId", "property id is required")
    );
  else if (!uuidValidate(propertyId))
    return errors.push(buildPropertyError("propertyId", "invalid property id"));
};

const validatePropertyStatus = (ctx, errors) => {
  const { status } = ctx.request.body;
  if (!isDefined(status))
    return errors.push(buildPropertyError("status", "status is required"));
  else if (!Object.values(propertyStatus).includes(status))
    return errors.push(
      buildPropertyError("status", `${status} is invalid status`)
    );
};

module.exports = { validatePropertyId, validatePropertyStatus };
