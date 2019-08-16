const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

//Post route for user creation
router.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (error, createdUser) => {
    res.status(201).json({
      status: 201,
      message: "User Created"
    });
  });
});
//Export this file
module.exports = router;
