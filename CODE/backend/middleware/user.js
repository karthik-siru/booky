const user = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  user.findById(id).exec((err, userFound) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = userFound;
    next();
  });
};
