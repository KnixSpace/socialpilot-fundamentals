const { client } = require("../config/database");

const interestedCollection = client
  .db(process.env.DB_NAME)
  .collection("interested");

const readInterest = async (filters, options) =>
  await interestedCollection.find(filters, options).toArray();

const createInterest = async (interestProperty) =>
  await interestedCollection.insertOne(interestProperty);

const updateInterest = async (filters, data) =>
  await interestedCollection.updateOne(filters, {
    $set: { ...data, updatedOn: new Date() },
  });

module.exports = { readInterest, createInterest, updateInterest };
