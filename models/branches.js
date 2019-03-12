const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Branch = new Schema({
    branchId : 
    {
        type : Number,
        required : true
    },
    branchName :
    {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('branch',Branch);