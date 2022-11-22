const jwt = require("jsonwebtoken");

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      err: "YOU ARE NOT ADMIN",
    });
  }
  next();
};

exports.isAuthenticated = (req, res, next) => {
  const token =
    req.cookies.token ||
    req.body.token ||
    req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("You are not signed in");
  }
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};
