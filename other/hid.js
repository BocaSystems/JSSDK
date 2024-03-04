document.getElementById('connect').addEventListener('click', async () => {
    try {
        // Request access to the USB device
        const device = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x0a43 }] });
        await device.open(); // Open session
        if (device.configuration === null)
            await device.selectConfiguration(1); // Select configuration #1
        await device.claimInterface(0); // Claim interface #0
        console.log('Device opened:', device);

        // Enable other buttons
        document.getElementById('send').disabled = false;
        document.getElementById('disconnect').disabled = false;
        document.getElementById('dataToSend').disabled = false;

        // Event listener for sending data
        document.getElementById('send').addEventListener('click', async () => {
            const dataToSend = document.getElementById('dataToSend').value;
            const encoder = new TextEncoder();
            const data = encoder.encode(dataToSend);
            await device.transferOut(1, data); // Adjust the endpoint number
            console.log('Data sent');
        });

        // Event listener for disconnecting the device
        document.getElementById('disconnect').addEventListener('click', async () => {
            await device.close();
            console.log('Device closed');

            // Disable buttons after disconnect
            document.getElementById('send').disabled = true;
            document.getElementById('disconnect').disabled = true;
            document.getElementById('dataToSend').disabled = true;
        });
    } catch (error) {
        console.error('Error:', error);
    }
});
