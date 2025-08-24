// ✅ Scroll Event for Navbar Background Change
window.addEventListener("scroll", function() {
    let navbar = document.querySelector("nav");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ✅ Contact Form Alert
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Thank you for reaching out! We'll get back to you soon.");
});

// ✅ Restore Smooth Scrolling Effects
document.addEventListener("scroll", function () {
    const elements = document.querySelectorAll(".hidden");
    
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && !el.classList.contains("show")) {
            el.classList.add("show");
        }
    });
});

// ✅ Restore Pop-Up Box (Without Animation)
document.getElementById("popup-box").style.animation = "none";

// ✅ Email Form Submission Logic
document.getElementById("emailForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload

    const userEmail = document.getElementById("email").value; // Get user input

    fetch("/send-email", { // Calls your backend API
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail })
    })
    .then(response => response.json())
    .then(data => document.getElementById("emailMessage").innerText = data.message)
    .catch(error => console.error("Error:", error));
}); 

document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            if (!this.href.includes("#")) {
                event.preventDefault();
                window.location.href = this.href;
            }
        });
    });
});
function changeColor(color) {
  document.body.style.backgroundColor = color;
}
