
const express  = require('express');
const router   = express.Router();

const validate = require('../validate/User');

const {
  registerController,
  loginController
} = require('../controller/auth');

router
  .post('/register', validate, registerController)
  .post('/login',    loginController);

module.exports = router;
