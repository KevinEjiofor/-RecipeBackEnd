const User = require('../data/models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};


const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ username, email, password: hashedPassword });

    const subject = 'Welcome to Chargie Recipe App';
    const htmlContent = `
      <h1>Welcome, ${user.username}!</h1>
      <p>Thank you for signing up on our platform. We're excited to have you on board!</p>
    `;
    await sendEmail(user.email, subject, htmlContent);

    res.status(201).json({
      message: 'User registered successfully!',
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.json({
        message: 'Login successful!',
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const resetPin = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordPin = resetPin;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; 

    await user.save();

    const subject = 'Password Reset Request';
    const htmlContent = `
      <p>You requested a password reset</p>
      <p>Your reset pin is: <strong>${resetPin}</strong></p>
      <p>The pin is valid for 10 minutes.</p>
    `;

    await sendEmail(user.email, subject, htmlContent);

    res.status(200).json({ message: 'Password reset pin sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const validateResetPin = async (req, res) => {
  const { resetPin } = req.body;

 
  if (!resetPin) {
    return res.status(400).json({ message: 'Reset pin is required' });
  }

  try {
    const user = await User.findOne({
      resetPasswordPin: resetPin,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired pin' });
    }

    res.status(200).json({ message: 'Pin is valid', userId: user._id });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  const { resetPin } = req.params;
  const { newPassword } = req.body;

  if (!resetPin || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: 'Invalid reset pin or password' });
  }

  try {
    console.log(`Searching for user with resetPin: ${resetPin}`);
    const user = await User.findOne({
      resetPasswordPin: resetPin,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      console.log(`User not found or pin expired: ${resetPin}`);
      return res.status(400).json({ message: 'Invalid or expired pin' });
    }

    console.log(`User found: ${user.email}`);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.resetPasswordPin = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  validateResetPin,
  resetPassword,
};
