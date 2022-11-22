const { facility, facilityfcType } = require("../models/facility");
const occupiedfc = require("../models/occupiedfc");
const { reservation, reservationfcType } = require("../models/reservation");

exports.createReservation = async (req, res) => {
  try {
    const list = req.body.list;
    const userId = req.profile._id;
    const { timeIn, timeOut } = req.body;
    console.log(`((((((()))))))`);
    console.log(list, userId, timeIn, timeOut);
    console.log(`))))))))))`);
    const reservationfctypes = [];
    for (let i = 0; i < list.length; i++) {
      const sampleresfctype = await reservationfcType.create({
        facilityfcType: list[i].facilityfcType,
        facility: list[i].facility,
      });
      reservationfctypes.push(sampleresfctype);
    }
    // creating a reservation ...
    const newReservation = await reservation.create({
      facilityfctypes: reservationfctypes,
      timeIn,
      timeOut,
      user: userId,
    });
    // creating a occupied facilityFcType
    const newoccfclist = [];
    for (let i = 0; i < list.length; i++) {
      const newoccupiedfc = occupiedfc.create({
        facilityfcType: list[i].facilityfcType,
        facility: list[i].facility,
        reservation: newReservation._id,
        timeIn,
        timeOut,
        user: userId,
      });
      newoccfclist.push(newoccupiedfc);
    }
    res.status(200).json({
      message: "reservation created sucessfully",
      newoccfclist: newoccfclist,
      res: newReservation,
    });
  } catch {
    res.status(401).json({
      err: "Error while creating booking",
    });
  }
};
