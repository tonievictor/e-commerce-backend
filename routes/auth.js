const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const response = require("../utility/response.js");
//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    response(res, 201, true, 'User successfully registered', savedUser);
  } catch (err) {
    response(res, 500, false, 'Internal Sever Error', err.message);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(res, 401, false, "Username doesnt Exist");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      response(res, 401, false, 'Wrong Password');

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3 days" }
    );

    const { password, ...others } = user._doc;

    response(res, 400, true, "Login successful", {accessToken, ...others});
  } catch (err) {
    response(res, 500, false, 'Internal Sever Error', err.message);
  }
});

module.exports = router;
