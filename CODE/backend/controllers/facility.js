const { facility, facilityfcType } = require("../models/facility");
const fcType = require("../models/facilityType");

exports.createFacility = (req, res) => {
  try {
    const { name, description, location } = req.body;

    if (!(name && description && location)) {
      res.status(200).json({
        err: "All Feilds REquired",
      });
    } else {
      facility.findOne({ name: name }, async (err, facilityFound) => {
        if (err) {
          res.status(401).json({
            err: "Something Went Wrong",
          });
        } else if (facilityFound) {
          res.status(401).json({
            err: "Facility with same name already exits",
          });
        } else {
          const newFacility = await facility.create({
            name,
            facilities: [],
            description,
            location,
          });
          res.status(200).json({
            newFacility: newFacility,
          });
        }
      });
    }
  } catch (err) {
    res.status(401).json({
      err: "Unable to create a facility ",
    });
    console.log(`err ---`, err);
  }
};

exports.getAllFacilities = (req, res) => {
  try {
    facility.find().exec((err, facilities) => {
      if (err) {
        res.status(401).json({
          err: "Unable to get all facilities",
        });
      }
      res.json(facilities);
    });
  } catch {
    res.json({
      err: "Unable to get all facilities ",
    });
  }
};

exports.getAllFacilitiesFctypes = async (req, res) => {
  const facility = req.facility;
  const fclts = facility.facilities;
  let updatedfaciltyfctypes = [];
  if (facility) {
    for (let i = 0; i < fclts.length; i++) {
      const update = await facilityfcType.findById(fclts[i]._id);
      if (update) {
        fclts[i].status = update.status;
      }
      const fctype = await fcType.findById(fclts[i].fctype);
      if (fctype) {
        fclts[i].set("type", fctype.name, { strict: false });
      }
      updatedfaciltyfctypes.push(fclts[i]);
    }
    res.status(200).json(updatedfaciltyfctypes);
  } else {
    res.status(401).json({
      err: "No Facility exists with that name",
    });
  }
};

exports.appendtoFacility = (req, res) => {
  try {
    const appendList = req.body.list;
    const facilityfound = req.facility;
    let facilities = facilityfound.facilities;
    appendList.forEach((fc) => {
      let count = fc.count;
      fcType.findOne({ name: fc.name }, async (err, fcTypeFound) => {
        if (err) {
          res.status(401).json({
            err: "Unable to find fcType in db ",
          });
        } else {
          for (let i = 0; i < count; i++) {
            const sample = await facilityfcType.create({
              fctype: fcTypeFound._id,
            });
            facilities.push(sample);
          }
        }
        let update = { facilities: facilities };
        const updatedfacility = await facility.findOneAndUpdate(
          { name: facilityfound.name },
          update,
          {
            new: true,
          }
        );
      });
    });
    facility.findOne({ name: facilityfound.name }, async (err, result) => {
      if (err) {
        res.status(401).json({
          err: "Error in retreiving updated facility",
        });
      } else {
        res.status(200).json({
          message: "Updated Sucessfully",
          updatedFacility: result,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      err: "Unable to append facilities ",
    });
  }
};

exports.updateFacilityfcType = (req, res) => {
  const facilityFcTypeFound = req.facilityFcType;
  const { status } = req.body;
  try {
    const update = { status: status };
    const id = facilityFcTypeFound._id;
    facilityfcType.findByIdAndUpdate(id, update, (err, result) => {
      if (err) {
        res.status(401).json({
          err: "Unable to update facility fctype",
        });
      } else {
        res.status(200).json({
          message: "fcType status updated",
          result,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.removeFacility = (req, res) => {
  try {
    console.log(req.facility, "facility");
    const facilityName = req.facility.name;
    facility.deleteOne({ name: facilityName }, async (err, result) => {
      if (err) {
        res.status(401).json({
          err: "Error in deleting facility",
        });
      } else {
        res.status(401).json({
          message: "deleted the facility",
          deleted: facilityName,
        });
      }
    });
  } catch {
    res.json({
      err: "Unable to delete facility",
    });
  }
};
