/**
 * Climate Change Club - Unified JavaScript
 * Fixes: Music Button, Color Persistence, and Once-per-session Popup
 */

// ==========================================
// 1. GLOBAL FUNCTIONS (Accessible by HTML onclick)
// ==========================================

// ✅ Reusable Modal Logic
function showModal(title, message, duration = 6000) {
    const modal = document.getElementById("customModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalMessage = document.getElementById("modalMessage");

    if (modal && modalTitle && modalMessage) {
        modalTitle.textContent = title;
        modalMessage.innerHTML = message.replace(/\n/g, "<br>");
        modal.style.display = "flex";
        setTimeout(() => {
            if (modal.style.display === "flex") modal.style.display = "none";
        }, duration);
    }
}

function closeModal() {
    const modal = document.getElementById("customModal");
    if (modal) modal.style.display = "none";
}

// ✅ Color Theme Switcher with Memory
function changeColor(color) {
    const targetColor = color || '#f0f4f1';
    document.body.style.backgroundColor = targetColor;
    localStorage.setItem("bgColor", targetColor);
}

// ✅ Popup Close Logic
function closePopup() {
    const popup = document.getElementById("promoPopup");
    if (popup) popup.style.display = "none";
}

// ==========================================
// 2. MAIN EXECUTION (On Page Load)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 🎨 1. Restore Saved Background Color
    const savedColor = localStorage.getItem("bgColor");
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
    }

    // 🕒 2. Once-Per-Session Popup Logic
    const popup = document.getElementById("promoPopup");
    const hasSeenPopup = sessionStorage.getItem("hasSeenEcoPopup");

    if (popup && !hasSeenPopup) {
        setTimeout(() => {
            popup.style.display = "flex"; // Shows centered via CSS
            sessionStorage.setItem("hasSeenEcoPopup", "true");
        }, 5000);
    }

    // 🎵 3. Ambient Music Player Fix
    const music = document.getElementById("bgMusic");
    const mBtn = document.getElementById("musicBtn");
    const mText = document.getElementById("musicText");

    if (mBtn && music && mText) {
        mBtn.addEventListener("click", () => {
            if (music.paused) {
                music.play();
                mText.textContent = "Pause Music";
                mBtn.style.background = "var(--action-teal)";
            } else {
                music.pause();
                mText.textContent = "Play Ambient Music";
                mBtn.style.background = "var(--primary-green)";
            }
        });
    }

    // 🧪 4. Beta Features Toggle
    const betaBtns = document.querySelectorAll(".beta-toggle");
    betaBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            const target = document.getElementById(targetId);
            if (target) target.classList.toggle("hidden");
        });
    });

    // 👋 5. Show Welcome Modal
    showModal(
        "🌱 Development Update",
        "The website is in the Alpha/Beta development stage. Thank you for your feedback!"
    );
});

// ==========================================
// 3. SCROLL EFFECTS
// ==========================================
document.addEventListener("scroll", () => {
    const navbar = document.querySelector("nav");
    if (navbar) {
        window.scrollY > 50 ? navbar.classList.add("scrolled") : navbar.classList.remove("scrolled");
    }
});