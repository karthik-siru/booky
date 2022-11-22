const fcType = require("../models/facilityType");

exports.createfcType = (req, res) => {
  try {
    const name = req.body.name;
    fcType.findOne({ name: name }, async (err, fcFound) => {
      if (err) {
        res.status(401).json({
          err: "Something went Wrong",
        });
      } else if (fcFound) {
        res.status(401).json({
          err: "FcType Already exists",
        });
      } else {
        const newfcType = await fcType.create({
          name: name.toLowerCase(),
        });
        res.status(200).json({
          newfcType,
        });
      }
    });
  } catch {
    res.status(401).json({
      err: "Unable to create  fcType ",
    });
  }
};

exports.getfcType = (req, res) => {
  res.json(req.fctype);
};

exports.getAllfcTypes = (req, res) => {
  try {
    fcType.find().exec((err, fcTypes) => {
      if (err) {
        res.status(401).json({
          err: "Something went Wrong",
        });
      }
      res.json(fcTypes);
    });
  } catch {
    res.json({
      err: "Unable to get All fctypes ",
    });
  }
};

exports.removefcType = (req, res) => {
  try {
    const fctypeid = req.fctype._id;
    const fctypeName = req.fctype.name;
    console.log(fctypeName, "in backend");
    fcType.deleteOne({ name: fctypeName }, async (err, result) => {
      if (err) {
        res.status(401).json({
          err: "Unable to delete fcType",
        });
      } else {
        res.status(401).json({
          message: "deleted the fcType",
          deleted: fctypeName,
        });
      }
    });
  } catch {
    res.json({
      err: "Unable to delete fcType",
    });
  }
};
