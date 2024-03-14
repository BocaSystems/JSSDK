/* This file is intended to be deployed and served together with index.html.
you will find in package.json the dependencies of the app, other meta data and where this file 
is executed when the application is deployed and accessed over the web. This sample is very basic
and in no means supposed to be used in actual production.  
 */

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

//Server handlers
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

//Time emission
setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

//Successful creation of server
console.log('WebSocket server is running successfully');
