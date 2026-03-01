document.addEventListener("DOMContentLoaded", () => {
    
    // 🎨 1. THEME MEMORY
    const savedColor = localStorage.getItem("bgColor");
    if (savedColor) document.body.style.backgroundColor = savedColor;

    // 🎵 2. MUSIC CONTROLLER
    const music = document.getElementById("bgMusic");
    const mBtn = document.getElementById("musicBtn");
    const mText = document.getElementById("musicText");

    if (mBtn && music) {
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

    // 🕒 3. ECO-POPUP (Once per session)
    const popup = document.getElementById("promoPopup");
    if (popup && !sessionStorage.getItem("hasSeenEcoPopup")) {
        setTimeout(() => {
            popup.style.display = "flex";
            sessionStorage.setItem("hasSeenEcoPopup", "true");
        }, 5000);
    }

    // ✊ 4. LIVE MEMBER COUNT (Google Sheets)
    updateMemberCount();

    // 🎉 5. CONFETTI + DELAYED FORM LINK
    setupNewsletter();
});

// Logic for Member Counter
async function updateMemberCount() {
    const apiURL = "https://script.google.com/macros/s/AKfycbzI0GMc3wPGfZDQ4AhERrpn3n3rEFd4236RgRR_cLq3rLDEarUG_yA3uywRjIzWT3bvKg/exec";
    const countElement = document.getElementById("member-count");

    if (!countElement) return;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        countElement.innerText = data.count || "Many";
    } catch (error) {
        console.error("Counter failed:", error);
        countElement.innerText = "Join us";
    }
}

// Logic for Confetti Celebration
function setupNewsletter() {
    const trigger = document.getElementById('confettiTrigger');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const url = trigger.getAttribute('data-url');

        if (typeof confetti === "function") {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#2a9d8f', '#f4d35e', '#1b4332']
            });
        }

        setTimeout(() => {
            window.open(url, '_blank');
        }, 1000);
    });
}

// Global UI Helpers
function changeColor(color) {
    document.body.style.backgroundColor = color;
    localStorage.setItem("bgColor", color);
}

function closePopup() {
    document.getElementById("promoPopup").style.display = "none";
}