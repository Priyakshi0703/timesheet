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
                                array.date=mark.date;
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


        // , function (err, response) {

//         if (err) {
//             return res.json(req, res, err);
//         }

//         res.json(response);
//     })
// }
//Use of promise to get the data in an array
// exports.getAlldetails = function (req, res) {
//     var name = req.params.name;
//     Users.find({ name: name }).exec()
//         .then(function (user) {
//             var detailsarray = [];
//             return Student.find({}).exec()
//                 .then(function (student) {

//                     return Universitydetails.find({}).exec()
//                         .then(function (universitydetails) {

//                             var test1 = universitydetails.map(function (university) {
//                                 //for (let university of universitydetails) { 
//                                 var test2 = user.map(function (list) {
//                                     //   for (let list of user) {
//                                     var test3 = student.map(function (details) {
//                                         // for (let details of student) {
//                                         if (details.student_id == list.user_id) {
//                                             if (details.university_id == university.university_id) {

//                                                 let array = {};

//                                                 array.name = list.name;
//                                                 array.father_name = list.father_name;
//                                                 array.email = list.email;
//                                                 array.address = list.address;
//                                                 array.phone_number = list.phone_number;
//                                                 array.student_id = details.student_id;
//                                                 array.stream = details.stream;
//                                                 array.section = details.section;
//                                                 array.universityName = university.university;
//                                                 array.university_state = university.state;
//                                                 detailsarray.push(array);
//                                             }
//                                         }
//                                         return details;
//                                     });
//                                     return list;
//                                 });
//                                 return university;
//                             });
//                             return res.json(detailsarray);
//                         })

//                 })
//         })
// }
