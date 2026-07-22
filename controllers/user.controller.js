const User = require('../models/user.model');

const registerUser = async (req, res) => {
    try {
        const { name, username, email, phone, password } = req.body;

        const userName = name || username;

        if (!userName || !email || !password) {
            return res.status(400).json({ message: "נא למלא שם משתמש, אימייל וסיסמה" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "משתמש עם אימייל זה כבר קיים במערכת" });
        }

        const newUser = new User({
            name: userName,
            email,
            phone: phone || "0500000000", 
            password
        });

        await newUser.save();

        res.status(201).json({ 
            message: "המשתמש נרשם בהצלחה!", 
            user: newUser 
        });
    } catch (error) {
        res.status(400).json({ message: "שגיאה בהרשמה", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "אימייל או סיסמה לא נכונים" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "אימייל או סיסמה לא נכונים" });
        }

        res.json({ 
            message: "התחברת בהצלחה!", 
            user 
        });
    } catch (error) {
        res.status(500).json({ message: "שגיאה בהתחברות", error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "שגיאה בשליפת המשתמשים", error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers
};