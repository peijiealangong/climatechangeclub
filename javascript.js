/**
 * Climate Change Club - Main JavaScript
 * 100% Functional & Optimized
 */

// ==========================================
// 1. UTILITY FUNCTIONS
// ==========================================

// ✅ Reusable Modal Logic
function showModal(title, message, duration = 6000) {
  const modal = document.getElementById("customModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");

  if (modal && modalTitle && modalMessage) {
    modalTitle.textContent = title;
    // Replace newlines with break tags for HTML rendering
    modalMessage.innerHTML = message.replace(/\n/g, "<br>");
    modal.style.display = "flex";

    // Auto-hide after duration (default 6s)
    setTimeout(() => {
      // Only hide if the user hasn't already closed it manually
      if (modal.style.display === "flex") {
        modal.style.display = "none";
      }
    }, duration);
  }
}

function closeModal() {
  const modal = document.getElementById("customModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// ✅ Background Color Logic
function changeColor(color) {
  if (document.body) {
    document.body.style.backgroundColor = color;
    localStorage.setItem("bgColor", color);
  }
}

// ==========================================
// 2. MAIN EXECUTION (On Load)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  
  // 🔒 Apply Captcha Lock (Safety: ensures body exists first)
  document.body.classList.add('captcha-lock');

  // 🎨 Restore Background Color
  const savedColor = localStorage.getItem("bgColor");
  if (savedColor) {
    document.body.style.backgroundColor = savedColor;
  }

  // 🔗 Navigation Link Handling
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", function(event) {
      // If it's a standard link (not an anchor #), navigate manually
      if (this.getAttribute("href") && !this.getAttribute("href").includes("#")) {
        event.preventDefault();
        window.location.href = this.href;
      }
    });
  });

  // 👋 Show Welcome Modal
  showModal(
    "🌱 Development Stage Update",
    `The climate change club website is back into development stage.\n\n💡 Please suggest changes via the contact form.\n\n🔧 Current stages:\n• Alpha stage – basic building blocks.\n• Beta stage (aka the lover stage) – major changes incoming.\n• Development beta – chill zone for feedback.\n• Published stage – coder retires... or reactivates for more quests!\n\nWe’ll post updates as we change stages. Thank you!`
  );

  // 📧 Email Form Submission
  const emailForm = document.getElementById("emailForm");
  if (emailForm) {
    emailForm.addEventListener("submit", function(event) {
      event.preventDefault();
      
      const userEmail = document.getElementById("email").value;
      const msgBox = document.getElementById("emailMessage");

      fetch("/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail })
      })
      .then(response => response.json())
      .then(data => {
        if (msgBox) msgBox.innerText = data.message;
      })
      .catch(error => {
        console.error("Error:", error);
        if (msgBox) msgBox.innerText = "Something went wrong. Please try again.";
      });
    });
  }
});

// ==========================================
// 3. SCROLL HANDLERS (Unified for Performance)
// ==========================================

document.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  // A. Navbar Effect
  const navbar = document.querySelector("nav");
  if (navbar) {
    if (scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // B. Reveal Elements on Scroll
  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    // Reveal if element is within 90% of the viewport height
    if (rect.top < windowHeight * 0.9 && !el.classList.contains("show")) {
      el.classList.add("show");
    }
  });
});
// Force-unlock scrolling on load
document.body.style.overflowY = "auto";
document.body.style.height = "auto";
// Jump to Top Logic
const topBtn = document.getElementById("jumpToTop");

window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  // Calculate 50% of the total scrollable height
  const halfWay = document.documentElement.scrollHeight / 2;

  if (document.body.scrollTop > halfWay || document.documentElement.scrollTop > halfWay) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
}

// When the user clicks, scroll to the top
topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});