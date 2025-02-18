const { v4: uuidV4 } = require("uuid");

const {
  createInterest,
  updateInterest,
  readInterest,
} = require("../db/interested");
const {
  sendNewPropertyInterest,
  sendPropertyInterestupdate,
} = require("../utils/email");
const { interestedStatus } = require("../constants/constant");

const getAllInterestedProperties = async (ctx) => {
  const { userId } = ctx.request.user;
  const interest = await readInterest({ ownedById: userId });
  if (!interest.length) {
    ctx.body = { message: "No interested property found" };
    return;
  }
  ctx.body = interest;
};

const getInterestedProperty = async (ctx) => {
  ctx.body = await readInterest({ interestId: ctx.params.interestId });
};

const createNewInterestEntry = async (ctx) => {
  const { propertyId, ownedById, ownerName, ownerEmail } = ctx.request.body;
  const { name: userName, userId, email: userEmail } = ctx.request.user;
  const interest = {
    interestId: uuidV4(),
    ownedById,
    userId,
    userEmail,
    propertyId,
    status: interestedStatus.interested,
    createdOn: new Date(),
    updatedOn: new Date(),
  };
  await createInterest(interest);
  await sendNewPropertyInterest(ownerEmail, {
    ownerName,
    userName,
    propertyId,
  });
  ctx.body = { message: "Added to interest" };
};

const updateInterestStatus = async (ctx) => {
  const { userName, userEmail, interestId, status } = ctx.request.body;
  await updateInterest({ interestId }, { status });
  await sendPropertyInterestupdate(userEmail, { userName, interestId });
  ctx.body = { message: "Interest status updated" };
};

module.exports = {
  getAllInterestedProperties,
  getInterestedProperty,
  createNewInterestEntry,
  updateInterestStatus,
};
