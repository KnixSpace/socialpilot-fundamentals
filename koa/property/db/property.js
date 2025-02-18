const { client } = require("../config/database");
const { propertyStatus } = require("../constants/constant");
const propertyCollection = client
  .db(process.env.DB_NAME)
  .collection("property");

const createProperty = async (property) =>
  await propertyCollection.insertOne(property);

const readProperties = async (filters = {}) => {
  const pipeline = [];
  const matchStage = {};

  if (filters.minPrice || filters.maxPrice) {
    matchStage["listingDetails.amount"] = {};
    if (filters.minPrice)
      matchStage["listingDetails.amount"]["$gte"] = Number(filters.minPrice);
    if (filters.maxPrice)
      matchStage["listingDetails.amount"]["$lte"] = Number(filters.maxPrice);
  }

  if (filters.rooms) {
    matchStage["propertyDetails.bedrooms"] = Number(filters.rooms);
  }

  if (filters.isBroker) {
    matchStage["ownedByType"] = filters.isBroker === "true" ? "B" : "O";
  }

  if (filters.listingType) {
    matchStage["listingDetails.listingType"] = filters.listingType;
  }

  if (filters.propertyType) {
    matchStage["propertyDetails.propertyType"] = filters.propertyType;
  }

  matchStage["status"] = propertyStatus.avaliable;

  pipeline.push({ $match: matchStage });
  pipeline.push({
    $project: {
      _id: 0,
      propertyId: 1,
      description: 1,
      ownedByType: 1,
      ownedById: 1,
      "listingDetails.amount": 1,
      "listingDetails.listingType": 1,
      "propertyDetails.propertyType": 1,
      "propertyDetails.bedrooms": 1,
      "propertyDetails.bathrooms": 1,
      "location.city": 1,
      "location.state": 1,
      "location.zipcode": 1,
    },
  });

  return await propertyCollection.aggregate(pipeline).toArray();
};

const readPropertyById = async (propertyId) => {
  const pipeline = [
    {
      $match: {
        propertyId,
      },
    },
    {
      $lookup: {
        from: "user",
        let: {
          ownerId: "$ownedById",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$userId", "$$ownerId"],
              },
            },
          },
          {
            $project: {
              email: 1,
              name: 1,
              _id: 0,
            },
          },
        ],
        as: "ownerDetails",
      },
    },
    {
      $unwind: {
        path: "$ownerDetails",
      },
    },
  ];

  return await propertyCollection.aggregate(pipeline).toArray();
};

const updateProperty = async (propertyId, data) =>
  await propertyCollection.updateOne(
    { propertyId },
    {
      $set: { ...data, updatedOn: new Date() },
    }
  );

const deleteProperty = async (propertyId) =>
  await propertyCollection.deleteOne({ propertyId });

module.exports = {
  createProperty,
  readProperties,
  readPropertyById,
  updateProperty,
  deleteProperty,
};
