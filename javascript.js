/**
 * Climate Change Club - Main JS 
 * Unified & Optimized
 */

// 1. Core State & Theme Logic
function changeColor(color) {
    const targetColor = color || '#f0f4f1';
    document.body.style.backgroundColor = targetColor;
    localStorage.setItem("bgColor", targetColor);
}

// 2. Global Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    // Restore Theme
    const savedColor = localStorage.getItem("bgColor");
    if (savedColor) document.body.style.backgroundColor = savedColor;

    // Promo Popup (Delayed)
    const popup = document.getElementById("promoPopup");
    if (popup) {
        setTimeout(() => { popup.style.display = "flex"; }, 5000);
    }

    // Beta Toggles
    document.querySelectorAll(".beta-toggle").forEach(btn => {
        btn.addEventListener("click", () => {
            const target = document.getElementById(btn.getAttribute("data-target"));
            if (target) target.classList.toggle("hidden");
        });
    });

    // Music Player
    const music = document.getElementById("bgMusic");
    const mBtn = document.getElementById("musicBtn");
    if (music && mBtn) {
        mBtn.addEventListener("click", () => {
            if (music.paused) {
                music.play();
                mBtn.textContent = "⏸ Pause Music";
            } else {
                music.pause();
                mBtn.textContent = "🎵 Play Ambient Music";
            }
        });
    }
});

// 3. Unified Scroll Logic (Combined JumpToTop + Navbar + Performance)
const topBtn = document.getElementById("jumpToTop");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Jump to Top Button Logic (Show after 50% scroll)
    if (topBtn) {
        if (scrollY > (totalHeight / 2)) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    }

    // Navbar Scrolled State
    const nav = document.querySelector("nav");
    if (nav) {
        scrollY > 50 ? nav.classList.add("scrolled") : nav.classList.remove("scrolled");
    }
});

// Scroll to Top Execution
if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function closePopup() {
    document.getElementById("promoPopup").style.display = "none";
}