emailjs.init("nP3uTecuX7yRltzvW");

function sendEmail() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    emailjs.send("service_irt14bl", "template_48kvt7e", {
        from_name: name,
        from_email: email,
        message: message
    })
    .then(function(response) {
        console.log("Email sent successfully!", response);
        
        // ✅ Display a success message on the page
        document.getElementById("confirmation").innerHTML = 
            "<p style='color: green;'>Your email has been sent successfully!</p>";
    }, function(error) {
        console.log("Failed to send email", error);
        
        // ❌ Display an error message on the page
        document.getElementById("confirmation").innerHTML = 
            "<p style='color: red;'>Oops! Something went wrong. Try again.</p>";
    });
}

console.log("sendEmail.js is loaded!");