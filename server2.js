const WebSocket = require('ws');
const net = require('net');
const http = require('http');

// Replace these with your printer's IP and port
const PRINTER_IP = '10.0.2.126';
const PRINTER_PORT = 9100;

// Create an HTTP server
var server = http.createServer();

// Initialize a WebSocket server instance
var wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    console.log('A new client connected.');
    
    ws.send('Welcome to the WebSocket server!');

    ws.on('message', function incoming(message) {
        console.log('Received from client:', message);
        
        // Open a connection to the printer
        const printerConnection = new net.Socket();
        printerConnection.connect(PRINTER_PORT, PRINTER_IP, function() {
            console.log('Connected to printer, sending message');
            printerConnection.write(message + '\n'); // Sending the message to the printer
        });

        printerConnection.on('data', function(data) {
            console.log('Received:', data.toString('hex'));
            printerConnection.destroy(); // Close the connection after receiving the response
        });

        printerConnection.on('error', function(err) {
            console.error('Printer connection error:', err);
            ws.send('Error communicating with printer: ' + err.message);
        });

        printerConnection.on('close', function() {
            console.log('Connection to printer closed');
        });
        
        // Echo the message back to the client
        ws.send(`Sent to printer: ${message}`);
    });
});

// The server starts listening on port 8123
server.listen(8123, function() {
    console.log('Server is running on http://localhost:8123');
});
