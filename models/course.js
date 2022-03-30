const mongoose = require('mongoose');

// Course Schema
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    duration: {
        type: Number,
    },
    cost: {
        type: Number,
    },
    images: {
        type: Array,
    },
    videos: {
        type: Array,
    },
});

// Course Model
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
