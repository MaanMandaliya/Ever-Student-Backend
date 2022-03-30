const GlobalError = require('../utils/GlobalError');
const Course = require('../models/course');

exports.create = async (req, res, next) => {
    try {
        const { name, description, duration, cost, images, videos } = req.body;

        // Create a new course
        const course = new Course({
            name,
            description,
            duration,
            cost,
            images,
            videos,
        });

        // Save the course
        await course.save();

        // Send the response
        res.status(201).json({
            status: 'success',
            message: 'Course created successfully',
        });
    } catch (error) {
        console.log(error);
        const err = new GlobalError(500, 'failed', 'Internal Server Error');
        return err.sendError(res);
    }
};

exports.list = async (req, res, next) => {
    try {
        // Get the courses
        const courses = await Course.find(
            {},
            {
                _id: 1,
                name: 1,
                description: 1,
                duration: 1,
                cost: 1,
                images: 1,
            }
        );

        // Send the response
        res.status(200).json({
            status: 'success',
            data: courses,
        });
    } catch (error) {
        console.log(error);
        const err = new GlobalError(500, 'failed', 'Internal Server Error');
        return err.sendError(res);
    }
};

exports.get = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Get the course
        const course = await Course.findById(id, {
            __v: 0,
        });

        // If the course doesn't exist
        if (!course) {
            const err = new GlobalError(404, 'failed', 'Course not found');
            return err.sendError(res);
        }

        // Send the response
        res.status(200).json({
            status: 'success',
            data: course,
        });
    } catch (error) {
        console.log(error);
        const err = new GlobalError(500, 'failed', 'Internal Server Error');
        return err.sendError(res);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, duration, cost, images, videos } = req.body;

        // Get the course
        const course = await Course.findById(id);

        // If the course doesn't exist
        if (!course) {
            const err = new GlobalError(404, 'failed', 'Course not found');
            return err.sendError(res);
        }

        // Update the course
        course.name = name;
        course.description = description;
        course.duration = duration;
        course.cost = cost;
        course.images = images;
        course.videos = videos;

        // Save the course
        await course.save();

        // Send the response
        res.status(200).json({
            status: 'success',
            message: 'Course updated successfully',
        });
    } catch (error) {
        console.log(error);
        const err = new GlobalError(500, 'failed', 'Internal Server Error');
        return err.sendError(res);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Get the course
        const course = await Course.findById(id);

        // If the course doesn't exist
        if (!course) {
            const err = new GlobalError(404, 'failed', 'Course not found');
            return err.sendError(res);
        }

        // Delete the course
        await course.remove();

        // Send the response
        res.status(200).json({
            status: 'success',
            message: 'Course deleted successfully',
        });
    } catch (error) {
        console.log(error);
        const err = new GlobalError(500, 'failed', 'Internal Server Error');
        return err.sendError(res);
    }
};
