const Router = require("@koa/router");
const {
  listAllProperties,
  addNewProperty,
  getPropertyDetails,
  updatePropertyStatus,
  removeProperty,
} = require("../controllers/property");
const { isAuthenticated } = require("../middlewares/auth");
const { validate } = require("../validators/validate");
const {
  validatePropertyStatus,
  validatePropertyId,
} = require("../validators/property");

const router = new Router({ prefix: "/api/v1/property" });

router.get("/", listAllProperties);
router.get("/:propertyId", validate([validatePropertyId]), getPropertyDetails);
router.post("/create", isAuthenticated, addNewProperty);
router.patch(
  "/status",
  validate([validatePropertyId, validatePropertyStatus]),
  updatePropertyStatus
);
router.delete("/:propertyId", validate([validatePropertyId]), removeProperty);

module.exports = router;
