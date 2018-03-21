const mongoose = require('mongoose');

mongoose.connect('mongodb://37.97.180.203:27017/admin');
db= mongoose.connection;

//check connection
db.once('open',function () {
    console.log('connected to mongoDB nodesensor');
});

//check for Db errors
db.on('error',function (err) {
    console.log(err)
});

// Check Production vs Development mode
// let dbUrl = '';
// if( process.env.DOTMATRIX_NODE_SERVER === 'production') {
//     const user = process.env.DOTMATRIX_MONGODB_USER;
//     const pwd = process.env.DOTMATRIX_MONGODB_PASSWORD;
//     dbUrl = 'mongodb://' + user + ':' + pwd + '@localhost:27017/dotmatrix';
// } else {
//     dbUrl = 'mongodb://localhost/dotmatrix';
// }

// Export connection
// dbConnector = function(mongoUri) {
//
//     return mongoose.connect( mongoUri, {
//         //useMongoClient: true,
//     })
//         .then( db => {
//         console.log('Connected ' + dbUrl);
// })
// .catch( error => {
//         console.warn('Warning', error.toString());
//     throw error;
// });
//
// }(dbUrl);

//module.exports = dbConnector;