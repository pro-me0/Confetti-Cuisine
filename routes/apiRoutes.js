"use strict";

const router = require('express').Router(),
courseC = require('../controllers/coursesController'),
chatC = require('../controllers/chatController'),
userC = require('../controllers/usersController');

router.delete('/chat/:m/delete', chatC.delete, chatC.respondJSON);
// router.use(userC.verifyJWT)
router.get('/courses/:id/join', courseC.join, courseC.respondJSON);
router.get('/courses', courseC.index, courseC.filterUserCourses, courseC.respondJSON);


router.use(courseC.errorJSON);

module.exports = router;

