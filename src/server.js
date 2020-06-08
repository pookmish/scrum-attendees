const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);


io.on("connection", (socket) => {

  socket.on('connection', () => {
    io.emit('getData');
  })

  socket.on('returnData', (data) => {
    io.emit('getDataResponse', data)
  })

  socket.on('personGone', (a) => {
    io.emit('personGone', a);
  })

  socket.on('resetPerson', (a) => {
    io.emit('resetPerson', a);
  })
});

server.listen(port, () => console.log(`Listening on port ${port}`));