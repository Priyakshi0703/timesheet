var mongoose = require('mongoose');

// Define our admin schema
var AdminSchema= new mongoose.Schema({     
   empId : {type:Number,unique:true},               
    password: {type: String},
    firstname: {type: String},
    lastname: {type: String},
    role:{type:Number}
 });
module.exports = mongoose.model('Admin',AdminSchema);