document.addEventListener("scroll", function () {
    const elements = document.querySelectorAll(".hidden");
    
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && !el.classList.contains("show")) {
            el.classList.add("show");
        }
    });

    // Display alert only once after scrolling starts
    if (!window.alertTriggered) {
        alert("Welcome to the Climate Change Club Website!");
        window.alertTriggered = true; // Prevent multiple alerts
    }
});

document.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        nav.style.opacity = "1";
        nav.style.transform = "translateY(0)";
    } else {
        nav.style.opacity = "0";
        nav.style.transform = "translateY(-20px)";
    }
});

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents form from actually submitting

    alert("Thank you for reaching out! We'll get back to you soon.");
});


 <!-- Floating Earth Animation -->
    <div id="earth"></div>

document.addEventListener("mousemove", function(event) {
    let earth = document.getElementById("earth");
    earth.style.left = event.pageX + "px";
    earth.style.top = event.pageY + "px";
    earth.style.opacity = 1; // Make the Earth visible
});

   