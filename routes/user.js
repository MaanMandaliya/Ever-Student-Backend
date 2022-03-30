const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

router.post('/login', UserController.login);
router.post('/signup', UserController.signup);
router.post('/test', UserController.test);

module.exports = router;
