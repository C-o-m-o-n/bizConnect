const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('message', (data) => {
    console.log(`Message received: ${data}`);

    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});
server.listen(3000, () => {
  console.log('Server started on port 3000');
});
