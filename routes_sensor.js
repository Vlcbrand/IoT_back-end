const express = require('express');
const router = express.Router();

//init mongoose & models
const mongoose = require('mongoose');

require('./models/sensordata');
var Sensormodel = mongoose.model('Sensor');

require('./models/users');
var UserModel = mongoose.model('Users');

//init MQTT
const mqtt = require('mqtt');
const mqttTopic = require('./config.json').mqttTopic;
const mqttBroker = require('./config.json').mqttBroker;
//connect to MQTT broker an subscribe on topic
const mqttClient = mqtt.connect(mqttBroker);
mqttClient.subscribe(mqttTopic);

//receive MQTT data and put it in the database
mqttClient.on('message', function (topic, message) {

    var newData = new Sensormodel({
    });

    newData.save(function (err, data) {
        if (err) console.log(err);
        else console.log('Saved : ', data );
    });
});


//
router.all('*', (req, res, next) => {
    next();
});

//test for parameters in URL *works*
router.get('/getBetweenDates/:time1/:time2/:hours',function (req, res) {
    var data;
    var increment = req.params.hours / 5;
    Sensormodel.find({"timestamp": {$gt: req.params.time1, $lt: req.params.time2}}, function (err, response) {
        data = response;
    });
    var beginDate = data[0].timestamp;

    res.json({
        response: {
            time0: data[0].timestamp,
            data0: 0,
            time1: data[calculateDataFromTimestamp(beginDate, increment)-1].timestamp,
            data1: calculateDataFromTimestamp(beginDate, increment),
            time2: data[calculateDataFromTimestamp(beginDate, increment * 2)-1].timestamp,
            data2: calculateDataFromTimestamp(beginDate, increment * 2),
            time3: data[calculateDataFromTimestamp(beginDate, increment * 3)-1].timestamp,
            data3: calculateDataFromTimestamp(beginDate, increment * 3),
            time4: data[data.length-1].timestamp,
            data4: data.length
        }
    });
}

function calculateDataFromTimestamp(oldDate, increment){
    newDate = new Date(oldDate + increment*60*60 * 1000);
    var data;

    Sensormodel.find({"timestamp":{$gt:oldDate, $lt:newDate}},function (err, response) {
        response = data;
    })

    return data.length
}

router.get('/getLast12Hours', function (req,res) {
    Sensormodel.find({"timestamp":{$gt:new Date(Date.now() - 24*60*60 * 1000)}}, function (err, response) {
        res.json(({response:response}));
    })
});


router.get('/getAllSensorData',function (req, res) {
    Sensormodel.find({},function (err, response) {
        res.json(({response:response}));
    });




});

//
router.get('/getUsers', (req, res) => {
    UserModel.find({},function (err, a) {
        res.json({data:a});
    })

});

router.get('/message', (req, res) => {
    res.json({test: "test"});
});

router.get('/getUser',function (req,res) {

    var testUser = new UserModel({
        Name:'superadmin',
        password: 'superadmin'
    });

    testuser.save(function (err,data) {
        if (err) console.log(err);
        else console.log('Saved : ', data );
    });

    res.status(300);
})


/**
 * catch all
 */
router.all('*', (req, res) => {
    res.status(500);
    res.json({});
});

module.exports = router;