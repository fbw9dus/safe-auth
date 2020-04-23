
const { check } = require('express-validator');

const User = require('../model/User');

const checkUserExists = async (value)=> {
  if ( await User.findOne({userName:value}) )
    throw new Error('user exists')
}

const checkEmailExists = async (value)=> {
  const matches = await User.find({email:value});
  if ( matches && matches.length > 0 )
    throw new Error('email exists')
}

module.exports = [
  check('email')
    .isEmail()
    .custom(checkEmailExists)
    .normalizeEmail(),
  check('name')
    .exists()
    .notEmpty()
    .custom(checkUserExists)
    .isLength({min:3})
]
