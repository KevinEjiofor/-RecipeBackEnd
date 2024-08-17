const express = require('express');
const { registerUser, loginUser, verifyEmail } = require('../controller/authController');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

// router.get('/verify-email', verifyEmail);

module.exports = router;
