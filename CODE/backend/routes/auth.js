const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

//controllers
const { register, login, logout } = require("../controllers/auth");

//Requests
router.post("/register", [
  check("name", "name should be at least 5 chars long").isLength({ min: 3 }),
  check("email", "Please provide a valid email ").isEmail(),
  check("password", "password must be atleast 8 char long").isLength({
    min: 8,
  }),
  register,
]);

router.post(
  "/login",
  [
    // validators
    check("email", "Please provide a valid email ").isEmail(),
    check("password", "Please check your password").isLength({ min: 8 }),
  ],
  login
);

router.get("/logout", logout);

router.get("/test", () => {
  res.send("Hello working fine ");
});

module.exports = router;
