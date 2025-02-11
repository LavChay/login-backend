const { getDB } = require("../config/db");

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        res.status(400).json({ message: 'Invalid email' });
    }
    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long and include at least one letter, one number, and one special character' });
    }
    const db = getDB();
    const collection = db.collection('Profile');
    const user = await collection.findOne({ email, password });

    if(!user) {
        res.status(400).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful' });

}
module.exports = { loginUser };