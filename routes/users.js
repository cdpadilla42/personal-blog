var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Users here!');
});

router.post('/', (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  user.save((err, user) => {
    if (err) return next(err);
    res.json({
      user,
    });
  });
});

module.exports = router;
