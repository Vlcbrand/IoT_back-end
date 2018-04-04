const mongoose = require('mongoose');

mongoose.connect('mongodb://user:admin@37.97.180.203:27017/admin');
db= mongoose.connection;

//check connection
db.once('open',function () {
    console.log('connected to mongoDB Meterkast');
});

//check for Db errors
db.on('error',function (err) {
    console.log(err)
});