let device;

async function connectToDevice() {
    document.getElementById('device').addEventListener('click', async () => {
        try {
          // Request access to the USB device
          const device = await navigator.usb.requestDevice({ filters: [] });


          await device.deviceProtocol 
          // Open a session to the selected USB device
          await device.open();
          if (device.configuration === null)
            await device.selectConfiguration(1); // Select configuration #1 for the device
          await device.claimInterface(0); // Claim interface #0

          
          console.log('Device opened:', device);
        } catch (error) {
          console.error('Error:', error);
        }
      });
}

async function sendData() {
    const dataToSend = document.getElementById('dataToSend').value;
    if (!device) {
        console.log('No device connected, attempting to connect...');
        await connectToDevice();
    }

    if (device) {
        try {
            // Convert the string to a Uint8Array
            const encoder = new TextEncoder();
            const data = encoder.encode(dataToSend);

            // Send data to endpoint 1, adjust as needed
            await device.transferOut(1, data);
            console.log('Data sent');
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }
}

navigator.usb.addEventListener('connect', event => {
    console.log('Device connected:', event.device);
});

navigator.usb.addEventListener('disconnect', event => {
    console.log('Device disconnected:', event.device);
    if (device && event.device === device) {
        device = null;
    }
});


function Info(){
    navigator.usb.getDevices().then((devices) => {
        devices.forEach((device) => {
          console.log(device.productName); 
          console.log(device.manufacturerName); 
        });
      });
}