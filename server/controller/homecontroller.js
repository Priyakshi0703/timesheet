var User = require('../models/admin');
var Attendance = require('../models/attendance');
var Promise = require("bluebird");

exports.getUser = function (req, res) {
    User.find({}, function (err, response) {
        if (err) {
            return res.json(req, res, err);
        }

        res.json(response);
    })
}
exports.getAttendance = function (req, res) {
    var empId = req.params.empId;
    Attendance.find({ empId: empId }, function (err, response) {
        if (err) {
            return res.json(req, res, err);
        }

        res.json(response);
    })
}

exports.postUser = function (req, res) {
    var user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        empId: req.body.empId,
        password: req.body.password,
        role: req.body.role
    });
    user.save(function (err, response) {
        if (err) {
            console.log(err)
            res.json(err);
        }
        else {
            res.json({
                success: true,
                body: response
            })
        }
    })
}
exports.postAttendance = function (req, res) {
    var attendance = new Attendance({
        empId: req.body.empId,
        date: req.body.date

    });

    attendance.save(function (err, response) {
        if (err) {
            console.log(err)
            res.json(err);
        }
        else {
            res.json({
                success: true,
                body: response
            })
        }
    })
}

