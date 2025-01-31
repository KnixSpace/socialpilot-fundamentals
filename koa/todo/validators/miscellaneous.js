const result = (property, error = null) => {
  return {
    property,
    error,
  };
};

const isEmail = (data, property) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (typeof data[property] !== "string") {
    return result(property, "Email must be string");
  } else if (!emailRegex.test(data[property].trim())) {
    return result(property, "Not an valid email");
  }
};

module.exports = { isEmail };
