const validate = (validators) => {
  const errors = [];
  return (ctx, next) => {
    validators.forEach((item) => {
      errors.push(item[0](ctx.request.body, item[1]));
    });
    if (errors.length > 0) {
      ctx.status = 400;
      ctx.body = errors;
      return;
    }
    next();
  };
};

module.exports = { validate };
