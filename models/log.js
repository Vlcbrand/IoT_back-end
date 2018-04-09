var mongoose = require('mongoose');

//sensordata schema
var logSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

var Log = module.exports = mongoose.model('Log', logSchema);