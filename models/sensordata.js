let mongoose = require('mongoose');

//sensordata schema
let sensorSchema = mongoose.Schema({
    data:{
        type: Number,
        required : true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

let Sensor = module.exports = mongoose.model('Sensor', sensorSchema);