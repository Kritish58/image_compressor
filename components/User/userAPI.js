const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');
const { loginValidation, signupValidation } = require('./userValidation');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', loginValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors });
  }
  return jwt.sign({ _id: uuid() }, JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false, msg: err.msg });
    }
    return res.json({ success: true, token });
  });
});

router.post('/register', signupValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors });
  }
  return jwt.sign({ _id: uuid() }, JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
    if (err) {
      return res.status(400).json({ success: false, msg: err.msg });
    }
    return res.json({ success: true, token });
  });
});

module.exports = router;
