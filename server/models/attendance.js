var mongoose = require('mongoose');

// Define our admin schema
var AttendanceSchema= new mongoose.Schema({     
   empId : {type:Number},  
   date : {type:Date}            
    
 });
module.exports = mongoose.model('Attendance',AttendanceSchema);