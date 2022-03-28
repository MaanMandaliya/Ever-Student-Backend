const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    },
    role: {
        type: String,
        enum: ['admin', 'instructor', 'learner'],
        default: 'learner',
    },
});

// match password
userSchema.methods.matchPassword = function (password) {
    return password === this.password;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
