var Admin = require('../models/admin');
var Attendance = require('../models/attendance');
var Promise = require("bluebird");

exports.getUser = function (req, res) {
    Admin.find({}, function (err, response) {
        if (err) {
            return res.json(req, res, err);
        }

        res.json(response);
    })
}


exports.postUser = function (req, res) {
    var user = new Admin({
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
    Attendance.findOne({ empId: attendance.empId, date: attendance.date }, function (err, response) {
        if (err) {
            res.json({
                status: "false",
                data: "server error"
            })
        }
        else if (response == null) {
            attendance.save(function (error, response1) {
                if (error) {
                    res.json({
                        "success": false,
                        "error": error
                    })

                }
                else {
                    res.json({
                        "success": true,
                        "body": response1
                    })
                }
            });

        }
        else {
            res.json({
                success: false,
                body: "Date Already exist"
            })
        }

    });
}


exports.getAttendance = function (req, res) {
    var empId = req.params.empId;
    Admin.find({ empId: empId }).exec()
        .then(function (admin) {
            var detailsarray = [];
            return Attendance.find({}).exec()
                .then(function (attendance) {
                    var test1 = admin.map(function (list) {
                        var test2 = attendance.map(function (mark) {
                            if (list.empId == mark.empId) {
                                let array = {};
                                array.firstname = list.firstname;
                                array.lastname = list.lastname;
                                array.date = mark.date;
                                detailsarray.push(array);
                            }
                            return mark;

                        });
                        return list;

                    });
                    return res.json(detailsarray);

                })
        })
}
