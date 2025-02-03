const buildPropertyError = (property, error) => ({
  property,
  error,
});

const validate = (validators) => {
  return (ctx, next) => {
    const errors = [];
    validators.forEach((validator) => {
      validator(ctx, errors);
    });

    if (errors.length > 0) {
      ctx.status = 400;
      ctx.body = errors;
      return;
    }
    return next();
  };
};

module.exports = { buildPropertyError, validate };
