const GlobalError = require('../utils/GlobalError');
const User = require('../models/user');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            const err = new GlobalError(400, 'failed', 'Invalid Username');
            return err.sendError(res);
        }

        // Check if password is correct
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            const err = new GlobalError(400, 'failed', 'Invalid Password');
            return err.sendError(res);
        }

        // Return JWT Token
        res.status(200).json({
            status: 'success',
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                id: user._id,
                age: user.age,
                gender: user.gender,
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
        const { email, password, name, role, gender, age } = req.body;
        const user = await User.findOne({ email });

        // Check if user exists
        if (user) {
            const err = new GlobalError(400, 'failed', 'User already exists');
            return err.sendError(res);
        }

        // Create new user
        const newUser = await User.create({
            email,
            password,
            name,
            role,
            gender,
            age,
        });

        // Return JWT Token
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

exports.test = async (req, res, next) => {
    try {
        res.status(200).json({
            status: 'success',
            message: 'This is a test',
        });
    } catch (error) {
        console.log(error);
        const err = new GlobalError(500, 'failed', 'Internal Server Error');
        return err.sendError(res);
    }
};

exports.enroll = async (req, res, next) => {
    try {
        const { courseId, userId } = req.body;
        const user = await User.findById(userId);

        // update query
        const update = {
            $push: {
                courses: courseId,
            },
        };

        // update options
        const options = {
            new: true,
        };

        // update user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            update,
            options
        );

        // return user
        res.status(200).json({
            status: 'success',
        });
    } catch (error) {
        console.log(error);
        const err = new GlobalError(500, 'failed', 'Internal Server Error');
        return err.sendError(res);
    }
};

exports.courses = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);

        // return user
        res.status(200).json({
            status: 'success',
            courses: user.courses,
        });
    } catch (error) {
        console.log(error);
        const err = new GlobalError(500, 'failed', 'Internal Server Error');
        return err.sendError(res);
    }
};
