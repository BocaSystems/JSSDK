//Dependencies 
const net = require('net');
const express = require('express');
const socketIO = require('socket.io');

//Globals
const PORT = process.env.PORT || 5050; 
const INDEX = '/index.html';

//Express server init
const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
//

//IO server init
const io = socketIO(server);





//server handlers
io.on('connection', (socket) => {
  console.log('A new client connected.');
  socket.send('Welcome to the WebSocket server!');
  
  socket.on('message', function incoming(message) {
    console.log('Received from client:', message);
    
    
    // Echo the message back to the client
    socket.send(`Sent to printer: ${message}`);
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
  
});








//time emission
setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

//successful creation of server
console.log('WebSocket server is running successfully');
