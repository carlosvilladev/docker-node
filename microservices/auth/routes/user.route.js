const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user.model");
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
});

router.get("/setup", async (req, res) => {
  // create a sample user
  const user = new User({
    username: "kardotjs",
    password: "cvilla!!",
    email: "carlos.villa@globant.com",
    isAdmin: true,
  });
  try {
    // save the sample user
    await user.save();
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
  res.json({success : true})
});


router.get("/current", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  // validate the request body first
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find an existing user
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    username: user.username,
    email: user.email
  });
});

module.exports = router;