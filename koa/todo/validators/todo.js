const { isDefined, isValidType, isMin, isMax } = require("./miscellaneous");
const { buildPropertyError } = require("./validator");

const title = (ctx, errors) => {
  const { title } = ctx.request.body;
  if (!isDefined(title)) {
    errors.push(buildPropertyError("title", "Title is required"));
    return;
  } else if (!isValidType(title, "string")) {
    errors.push(buildPropertyError("title", "Title must be string"));
    return;
  } else if (!isMin(title, 3)) {
    errors.push(
      buildPropertyError("title", "Title must be minimum of 3 characters")
    );
    return;
  } else if (!isMax(title, 100)) {
    errors.push(
      buildPropertyError("title", "Title must be maximum of 100 characters")
    );
    return;
  }
};

const description = (ctx, errors) => {
  const { description } = ctx.request.body;
  if (!isDefined(description)) {
    errors.push(buildPropertyError("description", "Description is required"));
    return;
  } else if (!isValidType(description, "string")) {
    errors.push(
      buildPropertyError("description", "Description must be string")
    );
    return;
  } else if (!isMin(description, 10)) {
    errors.push(
      buildPropertyError(
        "description",
        "Description must be minimum of 10 characters"
      )
    );
    return;
  } else if (!isMax(description, 600)) {
    errors.push(
      buildPropertyError(
        "description",
        "Description must be maximum of 600 characters"
      )
    );
    return;
  }
};

module.exports = { title, description };
