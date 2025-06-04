// ✅ Initialize EmailJS
emailjs.init("nP3uTecuX7yRltzvW");

function sendEmail() {
    // ✅ Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    // ✅ Validate form input
    if (!name || !email || !message) {
        document.getElementById("confirmation").innerHTML = 
            "<p style='color: red;'>Please fill in all fields before sending.</p>";
        return;
    }

    // ✅ Send email through EmailJS
    emailjs.send("service_irt14bl", "template_wnlfnbh", {
        from_name: name,
        from_email: email,
        message: message
    })
    .then(function(response) {
        console.log("✅ Email sent successfully!", response);
        
        // ✅ Show success message
        document.getElementById("confirmation").innerHTML = 
            "<p style='color: green;'>Your email has been sent successfully!</p>";
        
        // ✅ Clear form fields after sending
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
    }, function(error) {
        console.log("❌ Failed to send email", error);
        
        // ❌ Show error message
        document.getElementById("confirmation").innerHTML = 
            "<p style='color: red;'>Oops! Something went wrong. Please try again.</p>";
    });
}

// ✅ Confirm script is loaded
console.log("sendEmail.js is loaded!");

// ✅ Scroll Event for Navbar Visibility Fix
window.addEventListener("scroll", function() {
    let navbar = document.querySelector("nav");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
        navbar.style.opacity = "1"; /* ✅ Keep opacity visible */
    } else {
        navbar.classList.remove("scrolled");
        navbar.style.opacity = "1"; /* ✅ Prevent disappearing */
    }
});

// ✅ Pop-Up Visibility Fix
document.addEventListener("scroll", function () {
    const elements = document.querySelectorAll(".hidden");
    
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && !el.classList.contains("show")) {
            el.classList.add("show");
        }
    });

    // ✅ Display alert only once after scrolling starts
    if (!window.alertTriggered) {
        alert("Welcome to the Climate Change Club Website!");
        window.alertTriggered = true;
    }
});

// ✅ Contact Form Alert
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents form submission

    alert("Thank you for reaching out! We'll get back to you soon.");
});
