/*This file is included in the directory but must be deployed on a machine connected to the same network where your printer
is located. For the application to never lose functionality the server must always be online. I used NGROK as a secure 
tunneling service simply for testing purposes but I would recommend to configure your router to forward the requests to 
your server or setting up a VPN.
*/

//Dependencies 
const express = require('express');
const app = express();
const net = require('net');
const socketIoClient = require('socket.io-client');

//Globals
const DEPLOYMENT_SOCKET_IO_SERVER_URL = ''; //must be assigned url of deployed application 
const PRINTER_IP = '';                      //must be assigned the printers local ip
const PRINTER_PORT = 9100;                  
const PORT = 3000;                          


//Connection to IOServer using the url of 
const ioClient = socketIoClient(DEPLOYMENT_SOCKET_IO_SERVER_URL);

// Event listeners for socket.io client
ioClient.on('connect', () => {
    console.log('Connected to socket.io server');
});

ioClient.on('disconnect', () => {
    console.log('Disconnected from socket.io server');
});

ioClient.on('data', function(data) {
    console.log(data);
    sendToPrinter(data);
});

//Send message to printer and error handlers
function sendToPrinter(message) {
    const printerConnection = new net.Socket();

    printerConnection.connect(PRINTER_PORT, PRINTER_IP, () => {
        console.log('Connected to printer, sending message');
        printerConnection.write(message + '\n'); // Sending the message to the printer
    });

    printerConnection.on('data', (data) => {
        console.log('Raw data received from printer:', data);
        
        // Here you might want to relay printer's response back to the socket.io server
        ioClient.emit('printerResponse', data.toString());

        printerConnection.destroy(); // Close the connection after receiving the response
    });

    printerConnection.on('error', (err) => {
        console.error('Printer connection error:', err);
        // Informing the socket.io server about the printer error
        ioClient.emit('printerError', err.message);
    });

    printerConnection.on('close', () => {
        console.log('Connection to printer closed');
    });
}


//Server listener
app.listen(PORT, () => console.log(`Local Server Relay running on port ${PORT}`));
