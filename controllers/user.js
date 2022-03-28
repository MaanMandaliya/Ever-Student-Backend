const GlobalError = require('../utils/GlobalError');
const User = require('../models/user');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            const err = new GlobalError(400, 'failed', 'Invalid Username');
            return err.sendError(res);
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            const err = new GlobalError(400, 'failed', 'Invalid Password');
            return err.sendError(res);
        }
        res.status(200).json({
            status: 'success',
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                id: user._id,
                token: Buffer.from(`${user._id}`).toString('base64'),
            },
        });
    } catch (error) {
        console.log(error);
        const err = new GlobalError(500, 'failed', 'Internal Server Error');
        return err.sendError(res);
    }
};

exports.signup = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const err = new GlobalError(400, 'failed', 'User already exists');
            return err.sendError(res);
        }
        const newUser = await User.create({
            email,
            password,
            name,
        });
        res.status(201).json({
            status: 'success',
            user: {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                id: newUser._id,
                token: Buffer.from(`${newUser._id}`).toString('base64'),
            },
        });
    } catch (error) {
        console.log(error);
        const err = new GlobalError(500, 'failed', 'Internal Server Error');
        return err.sendError(res);
    }
};
