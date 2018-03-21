var mongoose = require('mongoose');

//sensordata schema
var sensorSchema = mongoose.Schema({
    data:{
        type: Number,
        required : true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

var Sensor = module.exports = mongoose.model('Sensor', sensorSchema);