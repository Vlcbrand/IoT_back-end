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
const mqttClient = mqtt.connect( mqttBroker );
mqttClient.subscribe(mqttTopic);

//receive MQTT data and put it in the database
mqttClient.on('message', function (topic, message) {
    var newData = new Sensormodel({
        data:message,
        timestamp: Date.now()
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

router.post('/testUser',function (req,res) {

    var testuser = new UserModel({
        Name:'user3',
        password: 'password3'
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