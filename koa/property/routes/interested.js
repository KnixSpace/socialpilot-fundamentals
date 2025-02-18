const Router = require("@koa/router");
const { isAuthenticated } = require("../middlewares/auth");
const {
  createNewInterestEntry,
  updateInterestStatus,
  getInterestedProperty,
  getAllInterestedProperties,
} = require("../controllers/interested");
const { validate } = require("../validators/validate");
const {
  validateInterestId,
  validateOwnerEmail,
  validateOwnerName,
  validateInterestStatus,
  validateUserEmail,
  validateUserName,
} = require("../validators/interestes");
const { validatePropertyId } = require("../validators/property");

const router = new Router({ prefix: "/api/v1/interest" });

router.get("/", isAuthenticated, getAllInterestedProperties);

router.get(
  "/:interestId",
  isAuthenticated,
  validate([validateInterestId]),
  getInterestedProperty
);

router.post(
  "/create",
  isAuthenticated,
  validate([validatePropertyId, validateOwnerEmail, validateOwnerName]),
  createNewInterestEntry
);

router.patch(
  "/update",
  isAuthenticated,
  validate([
    validateInterestStatus,
    validateInterestId,
    validateUserEmail,
    validateUserName,
  ]),
  updateInterestStatus
);

module.exports = router;
