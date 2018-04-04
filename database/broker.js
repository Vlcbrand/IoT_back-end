//creates MQTT broker on IP 37.97.180.203

var mosca = require('mosca');
var settings = {
    port:1883
}

var server = new mosca.Server(settings);

server.on('ready', function(){
    console.log("ready");
});