const express = require('express');
const { registerUser, loginUser, forgotPassword, resetPassword, validateResetPin,verifyEmail } = require('../controller/authController');

const router = express.Router();


router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/forgotpassword', forgotPassword);

router.put('/validate-reset-pin', validateResetPin);

router.put('/resetPassword/:token', resetPassword);

// Uncomment this line to enable email verification route
// router.get('/verify-email', (req, res, next) => {
//     console.log("Verify Email route hit");
//     next();
// }, verifyEmail);

module.exports = router;
