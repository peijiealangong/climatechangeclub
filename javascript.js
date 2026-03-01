/**
 * Climate Change Club - Unified JavaScript
 * Restored: Music Button, Color Persistence, and Once-per-session Popup
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

    // 👋 5. Show Welcome Modal (Optional, remove if you don't have the HTML for it anymore)
    // showModal(
    //    "🌱 Development Update",
    //    "The website is in the Alpha/Beta development stage. Thank you for your feedback!"
    // );
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
// Newsletter Submission Logic
const newsForm = document.getElementById("newsletterForm");
if (newsForm) {
    newsForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Stop page reload
        const email = document.getElementById("userEmail").value;
        
        // Show success message using your existing showModal function
        showModal(
            "Welcome to the Chronicle! 🌍",
            `Thank you for joining. We've sent a confirmation to ${email}.`
        );
        
        newsForm.reset();
    });
}
async function updateMemberCount() {
    const apiURL = "https://script.google.com/macros/s/AKfycbzI0GMc3wPGfZDQ4AhERrpn3n3rEFd4236RgRR_cLq3rLDEarUG_yA3uywRjIzWT3bvKg/exec";
    const countElement = document.getElementById("member-count");

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        countElement.innerText = data.count;
    } catch (error) {
        console.error("Error fetching count:", error);
        countElement.innerText = "Many"; // Backup if the script fails
    }
}

// Run it when the page loads
document.addEventListener("DOMContentLoaded", updateMemberCount);
// Confetti Animation for the Mailing List Button
const confettiBtn = document.getElementById('confettiTrigger');
if (confettiBtn) {
    confettiBtn.addEventListener('click', () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#2a9d8f', '#264653', '#e9c46a']
        });
    });
}