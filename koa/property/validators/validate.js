const Promise = require("bluebird");

const buildPropertyError = (property, error) => ({ property, error });

const validate = (validators) => async (ctx, next) => {
  const errors = [];
  await Promise.each(validators, async (validator) => {
    console.time("name");
    await validator(ctx, errors);
    console.timeEnd("name");
  });
  if (errors.length > 0) {
    ctx.status = 400;
    ctx.body = errors;
    return;
  }
  return next();
};

module.exports = { validate, buildPropertyError };
