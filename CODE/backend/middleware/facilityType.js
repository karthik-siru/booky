const fcType = require("../models/facilityType");

exports.getfctypeById = (req, res, next, id) => {
  fcType.findById(id).exec((err, fcTypeFound) => {
    if (err) {
      return res.status(400).json({
        err: "fcType not found in DB",
      });
    }
    req.fctype = fcTypeFound;
    next();
  });
};
