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
    }, function(error) {
        console.log("Failed to send email", error);
    });
}

console.log("sendEmail.js is loaded!");