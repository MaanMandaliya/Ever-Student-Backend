const express = require('express');
const router = express.Router();

const CourseController = require('../controllers/course');

router.post('/create', CourseController.create);
router.get('/list', CourseController.list);
router.get('/:id', CourseController.get);
router.post('/update/:id', CourseController.update);
router.post('/delete/:id', CourseController.delete);

module.exports = router;
