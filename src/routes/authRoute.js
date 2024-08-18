const express = require('express');
const { registerUser, loginUser, forgotPassword, resetPassword ,verifyEmail } = require('../controller/authController');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/forgotPassword', forgotPassword);

router.post('/resetPassword/:token', resetPassword);

// router.get('/verify-email', verifyEmail);

module.exports = router;
