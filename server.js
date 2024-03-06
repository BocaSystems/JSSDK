//Dependencies 
const WebSocket = require('ws');
const net = require('net');
const express = require('express');
const socketIO = require('socket.io');

//Globals
const PRINTER_IP = '10.0.2.126';
const PRINTER_PORT = 9100;
const PORT = process.env.PORT || 5050; 
const INDEX = '/index.html';




//Working standalone server
//const wss = new WebSocket.Server({ port: PORT });


const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
//

// const { Server } = require('ws');
// const wss = new Server({ server });

const io = socketIO(server);


io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});


setInterval(() => io.emit('time', new Date().toTimeString()), 1000);


//test
// wss.on('connection', (ws) => {
//   console.log('Client connected');
//   ws.on('close', () => console.log('Client disconnected'));
// });

// setInterval(() => {
//   wss.clients.forEach((client) => {
//     client.send(new Date().toTimeString());
//   });
// }, 1000);





//server handlers
// wss.on('connection', function connection(ws) {
//   console.log('A new client connected.');
  
//   ws.send('Welcome to the WebSocket server!');

//   ws.on('message', function incoming(message) {
//     console.log('Received from client:', message);
    
//     // Open a connection to the printer
//     const printerConnection = new net.Socket();

//     printerConnection.connect(PRINTER_PORT, PRINTER_IP, function() {
//       console.log('Connected to printer, sending message');
//       printerConnection.write(message + '\n'); // Sending the message to the printer
//     });

//     printerConnection.on('data', function(data) {
//         console.log('Raw data received from printer:', data);
        
//         const firstByte = data[0];
    
//         switch(firstByte) {
//             case 0x06: 
//                 console.log('ACK');
//                 break;
//             case 0x11: 
//                 console.log("X-On");
//                 break;
//             default:
//                 // Convert the buffer to a hexadecimal string for logging
//                 console.log('Received:', data.toString('hex'));
//         }
    
//         printerConnection.destroy(); // Close the connection after receiving the response
//     });

//     printerConnection.on('error', function(err) {
//       console.error('Printer connection error:', err);
//       ws.send('Error communicating with printer: ' + err.message); // Inform the client about the error
//     });

//     printerConnection.on('close', function() {
//       console.log('Connection to printer closed');
//     });
    
//     // Echo the message back to the client
//     ws.send(`Sent to printer: ${message}`);
//   });
// });

// console.log('WebSocket server is running successfully');
