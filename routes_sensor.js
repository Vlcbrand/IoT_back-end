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
router.get('/getBetweenTime/:time1/:time2',function (req, res) {
    if(req.params.time1 === "1"){
        res.json({test: 'test'});
    }

    if(req.params.time1 === "2"){
        res.json({test: 'test1'});
    }

});

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
    UserModel.find({"Name":"superadmin"}, function(err, response) {
        res.json(({response:response}));
    })
})


/**
 * catch all
 */
router.all('*', (req, res) => {
    res.status(500);
    res.json({});
});

module.exports = router;