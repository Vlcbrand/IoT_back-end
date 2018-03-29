var mongoose = require('mongoose');

//sensordata schema
var sensorSchema = mongoose.Schema({
    timestamp:{
        type: Date,
        default: Date.now
    }
});

var Sensor = module.exports = mongoose.model('Sensor', sensorSchema);