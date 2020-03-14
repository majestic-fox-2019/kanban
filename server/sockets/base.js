const socketio = require('socket.io');

module.exports = function(server) {
  const io = socketio(server);
  io.on("connect", function (socket) {
    socket.on("dbChange", function () {
      socket.emit("reRender");
      socket.broadcast.emit("reRender");
    })
  })
}