// Function to connect to a Bluetooth device and send 8 bits of data
async function connectAndSendData() {
    try {
      // Request a Bluetooth device
      const device = await navigator.bluetooth.requestDevice({
        // filters: [{}], // You might need to uncomment and use filters based on your requirements
        acceptAllDevices: true, // Accepts all devices. For specific devices, use filters
        optionalServices: ['service_uuid'] // Replace 'service_uuid' with the UUID of the service you want to use
      });
  
      // Connect to the device
      console.log('Connecting to the device...');
      const server = await device.gatt.connect();
      console.log('Connected to the device');
  
      // Get the service
      const service = await server.getPrimaryService('service_uuid'); // Replace 'service_uuid' with the UUID of the service
  
      // Get the characteristic
      const characteristic = await service.getCharacteristic('characteristic_uuid'); // Replace 'characteristic_uuid' with the UUID of the characteristic
  
      // Data to send (8 bits). For example, 0xFF
      const data = new Uint8Array([0xFF]);
  
      // Send data
      await characteristic.writeValue(data);
      console.log('Data sent');
    } catch(error) {
      console.error('Error:', error);
    }
  }
  
  // Call the function
  connectAndSendData();
  