const { check } = require('express-validator');

const signupValidation = [
  check('email', 'email is not valid').isEmail(),
  check('password', 'password should be 5 characters minimum').isLength({ min: 5 }),
  check('password', 'password can be maximum 15 characters long').isLength({ max: 15 }),
];

const loginValidation = [check('email', 'email is not valid').isEmail()];

module.exports = {
  loginValidation: loginValidation,
  signupValidation: signupValidation,
};
