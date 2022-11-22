const express = require("express");
const router = express.Router();

//controllers
const {
  createfcType,
  getfcType,
  getAllfcTypes,
  removefcType,
} = require("../controllers/facilityType");

//middleware
const { isAdmin, isAuthenticated } = require("../middleware/auth");
const { getfctypeById } = require("../middleware/facilityType");
const { getUserById } = require("../middleware/user");

//params :
router.param("userId", getUserById);
router.param("fcTypeId", getfctypeById);

//Requests
router.post("/fctype/create/:userId", isAuthenticated, isAdmin, createfcType);
router.get("/fctype/all", getAllfcTypes);
router.get("/fctype/:fcTypeId", getfcType);
router.delete(
  "/fctype/delete/:fcTypeId/:userId",
  isAuthenticated,
  isAdmin,
  removefcType
);

module.exports = router;
