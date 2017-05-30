var global = require('./global');
var io = global.io;
var serial = global.serial;
var sockets = {};

io.on('connection', function(socket) {

  sockets[socket.id] = socket;
  console.log("Total clients connected:", Object.keys(sockets).length);

  socket.on('disconnect', function() {
    delete sockets[socket.id];
    console.log("Client disconnected");
  });

  socket.on('hello', function(data) {
    console.log(data);
  });

  socket.on('relayOn', function(relay) {
    serial.activateRelay(relay);
  });

  socket.on('relayOff', function(relay) {
    serial.deactivateRelay(relay);
  });
});

function emitSensorData() {
  io.emit('sensors', serial.sensors);
}

setInterval(emitSensorData, 2000);

// app.get('/arduino/relay/on/:port', function(req, res) {
//   var port = req.params.port;
//   var command = 'o'+port;
//   serialPort.write(command);
//   res.send('relay on');
// });

// app.get('/arduino/relay/off/:port', function(req, res) {
//   var port = req.params.port;
//   var command = 'c'+port;
//   serialPort.write(command);
//   res.send('relay off');
// });
