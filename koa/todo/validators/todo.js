const {
  isDefined,
  isValidType,
  isMin,
  isMax,
  isUuid,
} = require("./miscellaneous");
const { buildPropertyError } = require("./validator");

const title = (ctx, errors) => {
  const { title } = ctx.request.body;
  if (!isDefined(title))
    return errors.push(buildPropertyError("title", "Title is required"));
  else if (!isValidType(title, "string"))
    return errors.push(buildPropertyError("title", "Title must be string"));
  else if (!isMin(title, 3))
    return errors.push(
      buildPropertyError("title", "Title must be minimum of 3 characters")
    );
  else if (!isMax(title, 100))
    return errors.push(
      buildPropertyError("title", "Title must be maximum of 100 characters")
    );
};

const description = (ctx, errors) => {
  const { description } = ctx.request.body;
  if (!isDefined(description))
    return errors.push(
      buildPropertyError("description", "Description is required")
    );
  else if (!isValidType(description, "string"))
    return errors.push(
      buildPropertyError("description", "Description must be string")
    );
  else if (!isMin(description, 10))
    return errors.push(
      buildPropertyError(
        "description",
        "Description must be minimum of 10 characters"
      )
    );
  else if (!isMax(description, 600))
    return errors.push(
      buildPropertyError(
        "description",
        "Description must be maximum of 600 characters"
      )
    );
};

const params = (ctx, errors) => {
  const { todoId } = ctx.params;
  if (!isDefined(todoId))
    return errors.push(buildPropertyError("params", "uuid is required"));
  else if (!isUuid(todoId))
    return errors.push(buildPropertyError("params", "uuid is not valid"));
};

const todoFiled = (ctx, errors) => {
  const { title, description, status } = ctx.request.body;
  if (Object.keys(ctx.reqest.body).length > 3)
    return errors.push(buildPropertyError("fileds", "filed are nor valid"));

};

module.exports = { title, description, params };
