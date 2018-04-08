var mongoose = require('mongoose');

// user schema  WORKS!
var userSchema = mongoose.Schema({
    Name:{
        type: String,
        required : true
    },
    Password:{
        type: String,
        required : true
    }
});

var Users = module.exports = mongoose.model('Users', userSchema);