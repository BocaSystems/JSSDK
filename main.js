//Boca 
function readFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0]; // Get the selected file

    if (!file) {
        document.getElementById('statusBox').innerText = 'Please select a file first.';
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        // Display file content or some information about the file
        document.getElementById('statusBox').innerText = event.target.result;

    };
    reader.onerror = function(event) {
        document.getElementById('statusBox').innerText = 'Error reading file: ' + event.target.error.code;
    };

    reader.readAsArrayBuffer(file);


}

// function Connect() {
//     document.getElementById("Connect").addEventListener("click", async () => {
//         try {

//         }
//     });
// }