const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

//CLOSE / DESTROY the user's session
router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({
      status: 200,
      message: 'logout complete'
    });
  });
});
//User LogIn
router.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (error, foundUser) => {
    if(bcrypt.compareSync(req.body.password, foundUser.password)){
      req.session.currentUser = foundUser;
      res.status(201).json({
        status: 201,
        message: 'Session Created',
        userData: foundUser
      });
    } else {
      res.status(401).json({
        status: 401,
        message: 'Login Failed'
      });
    }
  });
});
//EXPORT this file
module.exports = router;
