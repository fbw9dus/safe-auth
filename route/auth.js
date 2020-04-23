
const express = require('express');
const router  = express.Router();

const {
  registerController,
  loginController
} = require('../controller/auth');

router
  .get('/register', registerController)
  .get('/login',    loginController);

module.exports = router;
