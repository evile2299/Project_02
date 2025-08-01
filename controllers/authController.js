// controllers/authController.js
import User from '../models/User.js';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
            });
        }

        const user = await User.authenticate(email, password);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials or not HR employee',
            });
        }

        res.json({
            success: true,
            user: {
                id: user.employeeId,
                name: user.name,
                email: user.contact,
                department: user.departmentName,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

export default login;
