let users = [
    {
        id: "1",
        username: "Michal_Dev",
        email: "michal@example.com",
        password: "hashed_password_123", // 
        borrowedBooks: [] //
    }
];

const registerUser = (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "נא למלא שם משתמש, אימייל וסיסמה" });
    }

    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: "משתמש עם אימייל זה כבר קיים במערכת" });
    }

    const newUser = {
        id: (users.length + 1).toString(),
        username,
        email,
        password,
        borrowedBooks: []
    };

    users.push(newUser);
    res.status(201).json({ message: "המשתמש נרשם בהצלחה!", user: { id: newUser.id, username: newUser.username, email: newUser.email } });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "אימייל או סיסמה לא נכונים" });
    }

    res.json({ message: "התחברת בהצלחה!", user: { id: user.id, username: user.username, email: user.email } });
};

const getAllUsers = (req, res) => {
    const safeUsers = users.map(({ password, ...rest }) => rest);
    res.json(safeUsers);
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers
};