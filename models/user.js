const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    branchId :
    {
        type : Number,
        required : true
    },
    userId :
    {
        type : Number,
        required : true
    },
    username : 
    {
        type : String,
        required : true
    },
    password :
    {
        type : String,
        required : true
    },
    userrole :
    {
        type : String,
        required : true
    },
    supervisorId :
    {
        type : Number
    }
});

module.exports = mongoose.model('user', User);