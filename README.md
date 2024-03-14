# Websocket printing over the web.

This application enables real-time communication between a web client and a printer using WebSockets, facilitated by Socket.IO. It's designed to demonstrate sending messages from the client to a WebSocket server. The server then forwards this message to the printer connected to a relay server.

The relay server must be hosted on a device that is constantly running on the network where the printer is located. This relay server will need to be served online so that the WebSocket server can reach the printer. I have used Heroku to deploy my application and tunneled the relay network through NGROK so that the relay could be exposed online and reached by the WebSocket server.

There are various ways of doing this, I simply relied on NGROK as it was the most efficient and free to use. You could forward a port on your local router, or you may also set up a VPN.

*Please note that there is only basic logic involved in this sample code, so be advised that this code is not meant to be used in release versions of your application. It is only meant to provide insight into one of the many possible ways of interfacing with the Boca printer over a browser via Ethernet/Wireless.*

Dependencies

    Node.JS: open-source JavaScript runtime environment 
    Express: Used to create a simple HTTP server.
    Net: Facilitates TCP connections to the printer.
    Socket.io-client: Establishes WebSocket connections to the cloud-hosted socket.io server.

## Client-Side Usage

The HTML page serves as the client interface, allowing users to send messages to the server.

Key Elements:

    Text Field: Where users input their message (e.g., text to print).
    Send Button: Submits the message to the server when clicked.
    Server Time Display: Shows the current time received from the server, demonstrating real-time communication.

JavaScript:

    Establishes connection to the WebSocket server.
    Listens for the time event to update the display with the server's current time.
    Sends messages to the server upon clicking the "Send to Printer" button.

## Web Server

The server is built with Express and Socket.IO. It listens for connections on the specified port (default is 5050) and handles incoming messages from clients. Quickly passing all data on to the relay server.

Key Components:

    Express Server: Serves the HTML file to clients.
    Socket.IO Integration: Handles WebSocket connections for real-time communication.

Event Handlers:

    Connection: On a new client connection, the server sends a welcome message.
    Message: Handles incoming messages (e.g., text data) and echoes a response back to the client.
    Disconnect: Logs when a client disconnects.

## Relay Server

This relay server acts as an intermediary between the web server hosted on your cloud platform and a local network printer, enabling remote print jobs to be sent from a web application through your cloud platform to the local printer.

### Configuration

    DEPLOYMENT_SOCKET_IO_SERVER_URL: The URL of the websocket server hosted on Heroku. This should be updated with your server's URL.
    PRINTER_IP: The IP address of the local network printer.
    PORT: The port number on which the relay server listens for incoming HTTP connections.

Upon starting, the relay server establishes a connection to the socket.io server hosted on Heroku. It listens for the following events:

    connect: Indicates a successful connection to the socket.io server. Upon connection, a test message ("hello world <p>") is sent to the printer as an initial demonstration.

    disconnect: Logs when the relay server has been disconnected from the socket.io server.

    data: Receives data (print jobs) from the socket.io server and forwards them to the printer.

## Handling Print Jobs

The sendToPrinter function manages the connection to the printer. It opens a TCP connection to the printer's IP address and port, sends the received message, and listens for any response from the printer.

    Upon receiving data from the printer, the function logs the response and emits a printerResponse event back to the socket.io server on Heroku, allowing for bidirectional communication.

    In case of an error with the printer connection, an error message is emitted back to the socket.io server using a printerError event.


# Security Considerations

    Consider implementing authentication and encryption for the connections between the app, relay server, and printer to ensure secure communication. 

# Heroku and NGROK

    ##Below you will find links to the deployment guides for both Heroku and NGROK which are the two services used to test the sample code online. Theoretically may be served and exposed by and cloud service platform as long as the servers are configured appropriately.

    https://ngrok.com/docs/getting-started/
    https://devcenter.heroku.com/articles/github-integration

