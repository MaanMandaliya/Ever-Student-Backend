const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

router.post('/login', UserController.login);
router.post('/signup', UserController.signup);
router.post('/test', UserController.test);
router.post('/enroll', UserController.enroll);
router.post('/getCourses', UserController.courses);

module.exports = router;
