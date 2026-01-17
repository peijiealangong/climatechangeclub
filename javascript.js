
document.body.classList.add('captcha-lock');


// ✅ Reusable Modal Logic
function showModal(title, message, duration = 6000) {
  const modal = document.getElementById("customModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");

  modalTitle.textContent = title;
  modalMessage.innerHTML = message.replace(/\n/g, "<br>");
  modal.style.display = "flex";

  setTimeout(() => {
    modal.style.display = "none";
  }, duration);
}

function closeModal() {
  document.getElementById("customModal").style.display = "none";
}

// ✅ Background Color Persistence
function changeColor(color) {
  document.body.style.backgroundColor = color;
  localStorage.setItem("bgColor", color);
}

// ✅ Restore Background on Load
window.addEventListener("DOMContentLoaded", () => {
  const savedColor = localStorage.getItem("bgColor");
  if (savedColor) {
    document.body.style.backgroundColor = savedColor;
  }

  // ✅ Navigation Link Handling
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", function(event) {
      if (!this.href.includes("#")) {
        event.preventDefault();
        window.location.href = this.href;
      }
    });
  });

  // ✅ Show Welcome Modal
  showModal(
    "🌱 Development Stage Update",
    `The climate change club website is back into development stage.\n\n💡 Please suggest changes via the contact form.\n\n🔧 Current stages:\n• Alpha stage – basic building blocks.\n• Beta stage (aka the lover stage) – major changes incoming.\n• Development beta – chill zone for feedback.\n• Published stage – coder retires... or reactivates for more quests!\n\nWe’ll post updates as we change stages. Thank you!`
  );
});

// ✅ Scroll-triggered Reveal
document.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(".hidden");
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9 && !el.classList.contains("show")) {
      el.classList.add("show");
    }
  });
});

// ✅ Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ✅ Email Form Submission
document.getElementById("emailForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const userEmail = document.getElementById("email").value;

  fetch("/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: userEmail })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById("emailMessage").innerText = data.message;
  })
  .catch(error => {
    console.error("Error:", error);
    document.getElementById("emailMessage").innerText = "Something went wrong. Please try again.";
  });
});

