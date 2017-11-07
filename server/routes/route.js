var express = require('express');
var router = express.Router();

var homeController = require('../controller/homecontroller');


router.route('/user')
 .get(homeController.getUser)
 .post(homeController.postUser);

 router.route('/attendance')
 .post(homeController.postAttendance);
 router.route('/attendance/:empId')
 .get(homeController.getAttendance);
 

module.exports = router;