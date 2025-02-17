const userRole = Object.freeze({
  admin: "A",
  owner: "O",
  broker: "B",
  user: "U",
});

const propertyStatus = Object.freeze({
  sold: "S",
  rented: "R",
  avaliable: "A",
});

const interestedStatus = Object.freeze({
  interested: "I",
  followUp: "F",
  requestAccepted: "A",
  requestDenied: "D",
  closed: "C",
});

const propertyType = Object.freeze({
  flat: "flat",
  townhouse: "townhouse",
  villa: "villa",
});

const listingType = Object.freeze({
  rent: "rent",
  sale: "sale",
});

module.exports = {
  userRole,
  propertyStatus,
  interestedStatus,
  propertyType,
  listingType,
};
