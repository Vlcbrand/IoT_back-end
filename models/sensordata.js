var mongoose = require('mongoose');

//sensordata schema
var sensorSchema = mongoose.Schema({
    data:{
        type: Number,
        default:0.1
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

var Sensor = module.exports = mongoose.model('Sensor', sensorSchema);