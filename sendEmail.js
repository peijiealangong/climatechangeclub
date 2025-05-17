emailjs.init("nP3uTecuX7yRltzvW");

function sendEmail() {
    emailjs.send("service_irt14bl", "template_48kvt7e", {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        message: document.getElementById("message").value
    })
    .then(function(response) {
        console.log("Email sent successfully!", response);
    }, function(error) {
        console.log("Failed to send email", error);
    });
}