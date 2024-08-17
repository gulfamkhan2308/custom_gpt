document.getElementById("sendBtn").addEventListener("click", function() {
    const message = document.getElementById("textbox").value;

    if (message.trim() !== "") {
        // Send the message to the server or handle it as needed
        console.log("Message sent:", message);

        // Optionally, clear the textbox after sending the message
        document.getElementById("textbox").value = "";
    }
});
