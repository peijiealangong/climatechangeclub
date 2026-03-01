document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Restore Color Theme
    const savedColor = localStorage.getItem("bgColor");
    if (savedColor) document.body.style.backgroundColor = savedColor;

    // 2. Ambient Music Controller
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

    // 3. One-Time Popup (Session based)
    const popup = document.getElementById("promoPopup");
    if (popup && !sessionStorage.getItem("hasSeenEcoPopup")) {
        setTimeout(() => {
            popup.style.display = "flex";
            sessionStorage.setItem("hasSeenEcoPopup", "true");
        }, 5000);
    }

    // 4. Update Live Member Count
    updateMemberCount();

    // 5. Subscription Persistence
    setupPersistentNewsletter();
});

// Fetch Count from Google Apps Script
async function updateMemberCount() {
    const apiURL = "https://script.google.com/macros/s/AKfycbzI0GMc3wPGfZDQ4AhERrpn3n3rEFd4236RgRR_cLq3rLDEarUG_yA3uywRjIzWT3bvKg/exec";
    const countElement = document.getElementById("member-count");
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        if(countElement) countElement.innerText = data.count || "200+";
    } catch (e) { console.error("Counter failed"); }
}

// Subscription Logic with LocalStorage
function setupPersistentNewsletter() {
    const trigger = document.getElementById('confettiTrigger');
    if (!trigger) return;

    if (localStorage.getItem("isSubscribed") === "true") {
        applySubscribedUI(trigger);
    }

    trigger.addEventListener('click', (e) => {
        const url = trigger.getAttribute('data-url');
        if (localStorage.getItem("isSubscribed") === "true") {
            window.open(url, '_blank');
            return;
        }

        e.preventDefault();
        if (typeof confetti === "function") {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#2a9d8f', '#f4d35e', '#1b4332'] });
        }
        localStorage.setItem("isSubscribed", "true");
        applySubscribedUI(trigger);
        setTimeout(() => { window.open(url, '_blank'); }, 1200);
    });
}

function applySubscribedUI(el) {
    el.innerHTML = `✓ Subscribed <i class="fas fa-check-circle"></i>`;
    el.classList.add('btn-subscribed');
}

// Global Helpers
function changeColor(color) {
    document.body.style.backgroundColor = color;
    localStorage.setItem("bgColor", color);
}

function closePopup() {
    document.getElementById("promoPopup").style.display = "none";
}