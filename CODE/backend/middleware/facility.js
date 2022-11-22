const { facility, facilityfcType } = require("../models/facility");

exports.getFacilityById = (req, res, next, id) => {
  facility.findById(id).exec((err, facilityFound) => {
    if (err) {
      return res.status(400).json({
        err: "Facility  not found in DB",
      });
    }
    req.facility = facilityFound;
    next();
  });
};

exports.getFacilityfcTypeById = (req, res, next, id) => {
  facilityfcType.findById(id).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        err: "Facility By Id not found in DB",
      });
    }
    req.facilityFcType = result;
    next();
  });
};
