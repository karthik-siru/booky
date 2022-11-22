const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!(email && password && name)) {
      res.status(400).send("All the feilds are required");
    }

    user.findOne({ email: email }, async function (err, result) {
      if (result) {
        res.status(401).json({
          err: "User exists",
        });
      } else {
        const myEncPassword = await bcrypt.hash(password, 10);

        const newUser = await user.create({
          name: name,
          email: email.toLowerCase(),
          password: myEncPassword,
        });
        newUser.password = undefined;

        // token
        const token = jwt.sign(
          {
            user_id: newUser._id,
            email,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "5h",
          }
        );
        newUser.token = token;
        // seding user info here
        res.status(201).json(newUser);
      }
    });
  } catch (error) {
    res.status(401).json({
      err: "Something Went Wrong",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).json({
        err: "Feilds are missing",
      });
    }

    user.findOne({ email: email }, async (err, userFound) => {
      if (userFound && (await bcrypt.compare(password, userFound.password))) {
        //token
        const token = jwt.sign(
          {
            user_id: userFound._id,
            email,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "5h",
          }
        );
        userFound.token = token;
        userFound.password = undefined;
        // res.status(200).send({ userFound });
        // sending token in cookie
        const options = {
          expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
          httpOnly: true,
        };

        res.status(200).cookie("token", token, options).json({
          success: true,
          token,
          user: userFound,
        });
      } else {
        res.status(400).json({
          err: "User not found",
        });
      }
    });
  } catch (error) {
    res.status(401).json({
      err: "Something Went Wrong",
    });
  }
};

exports.logout = (req, res) => {
  // clear the cookie
  res.clearCookie("token");
  res.json({
    err: "User Logged Out",
  });
};
