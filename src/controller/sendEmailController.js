const sendEmail = require('../utils/sendEmail');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        const subject = 'Welcome to Our App';
        const htmlContent = `
      <h1>Welcome, ${username}!</h1>
      <p>Thank you for registering with us.</p>
    `;
        await sendEmail(email, subject, htmlContent);

        res.status(201).json({
            message: 'User registered successfully!',

        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
