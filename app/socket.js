const io = global.io;
const serial = global.serial;
const settings = global.settings;

let clients = {};

socket = {
  emitSensorData() {
    io.emit('sensors', serial.sensors);
  },
  emitSettings() {
    io.emit('settings', serial.settings);
  }
};

io.on('connection', function(client) {

  clients[client.id] = client;
  console.log("Total clients connected:", Object.keys(clients).length);

  socket.emitSensorData();
  socket.emitSettings();

  client.on('disconnect', function() {
    delete clients[client.id];
    console.log("Client disconnected");
  });

  client.on('relayOn', function(relay) {
    serial.activateRelay(relay);
  });

  client.on('relayOff', function(relay) {
    serial.deactivateRelay(relay);
  });

});

setInterval(socket.emitSensorData, 2000);