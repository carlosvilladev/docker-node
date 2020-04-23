const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const auth = require("../middleware/auth");

router.post("/authenticate", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user, User, req.body);
    if(!user) return res.json({ success: false, message: 'Authentication failed. User not found.' });
    if(user.password != req.body.password) return res.json({ success: false, message: 'Authentication failed. Wrong password.' });

    const token = user.generateAuthToken();
    res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/verify', auth, (req, res) => {
    res.json(req.user);
});

module.exports = router;
