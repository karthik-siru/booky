const occupiedfc = require("../models/occupiedfc");
const { facility, facilityfcType } = require("../models/facility");

exports.getAllBookings = async (req, res) => {
  try {
    occupiedfc.find({}, async (err, result) => {
      if (err) {
        res.status(401).json({
          err: "Unable to get bookings",
        });
      } else {
        // console.log(fac.name, fafc, ti, to);
        for (let i = 0; i < result.length; i++) {
          const fac = await facility.findById(result[i].facility);
          const fafc = await facilityfcType.findById(result[i].facilityfcType);
          // const fct = await fcType.findById(fafc.fctype);
          const ti = result[i].timeIn.getHours();
          const to = result[i].timeOut.getHours();

          // result[0].timeIn = ti + ": 00";
          // result[0].timeOut = to + ": 00";
          result[i].set("facilityname", fac.name, { strict: false });
          result[i].set("timeinhrs", ti + ": 00", { strict: false });
          result[i].set("timeouthrs", to + ": 00", { strict: false });
        }

        res.status(200).json(result);
      }
    });
  } catch {
    res.status(401).json({
      err: "Error in fetching bookings",
    });
  }
};
