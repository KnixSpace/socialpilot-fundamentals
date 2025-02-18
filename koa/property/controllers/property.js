const { v4: uuidV4 } = require("uuid");
const {
  readProperties,
  createProperty,
  readPropertyById,
  updateProperty,
  deleteProperty,
} = require("../db/property");
const { propertyStatus } = require("../constants/constant");

const addNewProperty = async (ctx) => {
  const { userId, role } = ctx.request.user;
  const property = Object.assign(
    {
      propertyId: uuidV4(),
      ownedById: userId,
      ownedByType: role,
      status: propertyStatus.avaliable,
      createdOn: new Date(),
      updatedOn: new Date(),
    },
    ctx.request.body
  );

  await createProperty(property);
  ctx.body = {
    message: "property created successfully",
  };
};

const listAllProperties = async (ctx) => {
  const properties = await readProperties(ctx.query);

  if (properties.length === 0) {
    ctx.body = { message: "no property found" };
    return;
  }
  ctx.body = properties;
};

const getPropertyDetails = async (ctx) => {
  const property = await readPropertyById(ctx.params.propertyId);
  if (!property.length) {
    ctx.body = { message: "No property found" };
    return;
  }
  ctx.body = property[0];
};

const updatePropertyStatus = async (ctx) => {
  const { status, propertyId } = ctx.request.body;
  const { matchedCount } = await updateProperty({ propertyId }, { status });
  if (!matchedCount) {
    ctx.body = { message: "No property found" };
    return;
  }
  ctx.body = { message: "updated status" };
};

const removeProperty = async (ctx) => {
  const { deletedCount } = await deleteProperty(ctx.params.propertyId);
  if (!deletedCount) {
    ctx.body = { message: "No property found" };
  }
  ctx.body = { message: "property deleted successfully" };
};

module.exports = {
  listAllProperties,
  addNewProperty,
  getPropertyDetails,
  updatePropertyStatus,
  removeProperty,
};
