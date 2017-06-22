var global = require('./global');
var io = global.io;
var serial = global.serial;
var sockets = {};

function emitSensorData() {
  io.emit('sensors', serial.sensors);
}

io.on('connection', function(socket) {

  sockets[socket.id] = socket;
  console.log("Total clients connected:", Object.keys(sockets).length);

  emitSensorData();

  socket.on('disconnect', function() {
    delete sockets[socket.id];
    console.log("Client disconnected");
  });

  socket.on('relayOn', function(relay) {
    serial.activateRelay(relay);
  });

  socket.on('relayOff', function(relay) {
    serial.deactivateRelay(relay);
  });
});

setInterval(emitSensorData, 2000);