const express = require("express");
const router = express.Router();

//controllers
const {
  createFacility,
  getAllFacilities,
  getAllFacilitiesFctypes,
  appendtoFacility,
  updateFacilityfcType,
  removeFacility,
} = require("../controllers/facility");

//middleware
const { isAdmin, isAuthenticated } = require("../middleware/auth");
const { getUserById } = require("../middleware/user");
const {
  getFacilityById,
  getFacilityfcTypeById,
} = require("../middleware/facility");

//params :
router.param("userId", getUserById);
router.param("facilityId", getFacilityById);
router.param("facilityfcTypeId", getFacilityfcTypeById);

//Requests
router.post(
  "/facility/create/:userId",
  isAuthenticated,
  isAdmin,
  createFacility
);

router.get("/facility/all", getAllFacilities);
router.get("/facility/:facilityId", getAllFacilitiesFctypes);

router.post(
  "/facility/appendfc/:userId/:facilityId",
  isAuthenticated,
  isAdmin,
  appendtoFacility
);
router.post(
  "/facility/updatefacilityfctype/:userId/:facilityfcTypeId",
  isAuthenticated,
  isAdmin,
  updateFacilityfcType
);

router.delete(
  "/facility/delete/:userId/:facilityId",
  isAuthenticated,
  isAdmin,
  removeFacility
);

module.exports = router;
