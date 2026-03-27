/**
 * CLIMATE CHANGE CLUB - MASTER CORE SCRIPT
 * Version: 1.3
 * Contains: 
 * - Theme & Music Persistence
 * - Session-based Eco-Popups
 * - Live API Member Counter
 * - Newsletter Confetti & Persistence
 * - Dual Update Systems (Standard & Beta Redirect)
 * - Carbon Catcher Mini-Game (High Score Logic)
 * - Video Promo & Beta Form Handling
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. GLOBAL THEME INITIALIZATION
    // Checks localStorage to see if the user set a custom background color previously.
    const savedColor = localStorage.getItem("bgColor");
    if (savedColor) document.body.style.backgroundColor = savedColor;

    // 2. INITIALIZE ALL UI MODULES
    initAmbientMusic();        // Background audio controller
    initEcoPopup();           // Session-based download prompt
    updateMemberCount();       // Google Apps Script API fetcher
    setupPersistentNewsletter(); // Newsletter button & confetti
    initVideoPromo();          // 3-second delay video popup
    
    // 3. INITIALIZE UPDATE NOTIFICATIONS
    // We run both; they check their respective IDs in the HTML.
    setupUpdateNotification();     // Standard -> index.html
    setupUpdateNotificationBETA(); // Beta -> beta-login.html
    
    // 4. INITIALIZE INTERACTIVE MODULES
    initMiniGame();            // Carbon Catcher game engine
    initBetaForm();            // Formspree reporter (if on beta page)
});

/* ==========================================================================
   UPDATE & REDIRECT SYSTEM
   ========================================================================== */

/**
 * Reusable helper to handle the "Updating -> Refreshing" animation sequence.
 * @param {HTMLElement} btn - The button clicked.
 * @param {string} version - The target version to save.
 * @param {string} redirectUrl - Where to send the user after "updating".
 */
function handleUpdateSequence(btn, version, redirectUrl) {
    // PHASE 1: Spinner Start
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Updating...`;
    btn.style.opacity = "0.7";
    btn.style.cursor = "not-allowed";
    btn.disabled = true; 

    setTimeout(() => {
        // PHASE 2: Change icon to Refresh
        btn.innerHTML = `<i class="fas fa-sync-alt fa-spin"></i> Refreshing...`;
        
        setTimeout(() => {
            // PHASE 3: Save version to localStorage and redirect
            localStorage.setItem("appVersion", version);
            window.location.href = redirectUrl; 
        }, 2000); 
    }, 2000); 
}

// Standard Update: Just refreshes the current page
function setupUpdateNotification() {
    const updatePopup = document.getElementById("updatePopup");
    const updateBtn = document.getElementById("updateBtn");
    const currentVersion = "1.3"; 

    if (!updatePopup || !updateBtn) return;

    if (localStorage.getItem("appVersion") !== currentVersion) {
        setTimeout(() => { updatePopup.classList.add("show"); }, 2000);
    }

    updateBtn.addEventListener("click", () => {
        handleUpdateSequence(updateBtn, currentVersion, "index.html");
    });
}

// BETA Update: Specifically redirects users to the Beta Login
function setupUpdateNotificationBETA() {
    const updatePopup = document.getElementById("updatePopupBETA");
    // Looks for the button inside the Beta-specific popup
    const updateBtn = updatePopup ? updatePopup.querySelector("button") : null;
    const currentVersion = "1.4"; 

    if (!updatePopup || !updateBtn) return;

    if (localStorage.getItem("appVersion") !== currentVersion) {
        setTimeout(() => { updatePopup.classList.add("show"); }, 2500);
    }

    updateBtn.addEventListener("click", () => {
        handleUpdateSequence(updateBtn, currentVersion, "beta-login.html");
    });
}

/* ==========================================================================
   CORE UTILITIES (Music, Counter, Newsletter)
   ========================================================================== */

function initAmbientMusic() {
    const music = document.getElementById("bgMusic");
    const mBtn = document.getElementById("musicBtn");
    const mText = document.getElementById("musicText");

    if (mBtn && music) {
        mBtn.addEventListener("click", () => {
            if (music.paused) {
                music.play().catch(() => console.log("Audio blocked: Interaction required."));
                mText.textContent = "Pause Music";
                mBtn.style.background = "#2a9d8f"; // Teal
            } else {
                music.pause();
                mText.textContent = "Play Ambient Music";
                mBtn.style.background = "#1b4332"; // Dark Green
            }
        });
    }
}

// Session Popup: Shows once per browser tab session
function initEcoPopup() {
    const popup = document.getElementById("promoPopup");
    if (popup && !sessionStorage.getItem("hasSeenEcoPopup")) {
        setTimeout(() => {
            popup.style.display = "flex";
            sessionStorage.setItem("hasSeenEcoPopup", "true");
        }, 5000);
    }
}

async function updateMemberCount() {
    const apiURL = "https://script.google.com/macros/s/AKfycbzI0GMc3wPGfZDQ4AhERrpn3n3rEFd4236RgRR_cLq3rLDEarUG_yA3uywRjIzWT3bvKg/exec";
    const countElement = document.getElementById("member-count");
    if (!countElement) return;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        countElement.innerText = data.count || "200+";
    } catch (e) {
        countElement.innerText = "200+";
    }
}

function setupPersistentNewsletter() {
    const trigger = document.getElementById('confettiTrigger');
    if (!trigger) return;

    // Check if user is already in the "Subscribed" state
    if (localStorage.getItem("isSubscribed") === "true") {
        trigger.innerHTML = `✓ Subscribed <i class="fas fa-check-circle"></i>`;
        trigger.classList.add('btn-subscribed');
    }

    trigger.addEventListener('click', (e) => {
        const url = trigger.getAttribute('data-url');
        if (localStorage.getItem("isSubscribed") === "true") {
            window.open(url, '_blank');
            return;
        }

        e.preventDefault();
        if (typeof confetti === "function") {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        }
        localStorage.setItem("isSubscribed", "true");
        trigger.innerHTML = `✓ Subscribed <i class="fas fa-check-circle"></i>`;
        setTimeout(() => { window.open(url, '_blank'); }, 1200);
    });
}

/* ==========================================================================
   CARBON CATCHER GAME ENGINE
   ========================================================================== */

function initMiniGame() {
    const modal = document.getElementById("gameModal");
    const openBtn = document.getElementById("openGameBtn");
    const closeBtn = document.getElementById("closeGameBtn");
    const startBtn = document.getElementById("startGameBtn");
    const canvas = document.getElementById("game-canvas");
    const scoreDisplay = document.getElementById("game-score");
    const highDisplay = document.getElementById("high-score");

    let score = 0, gameActive = false;
    let highScore = localStorage.getItem("carbonHighScore") || 0;
    
    if (highDisplay) highDisplay.innerText = highScore;
    if (!modal || !openBtn) return;

    openBtn.onclick = () => { modal.style.display = "flex"; };
    closeBtn.onclick = () => { 
        modal.style.display = "none"; 
        gameActive = false; 
        // Cleanup remaining clouds
        canvas.querySelectorAll('.carbon-cloud').forEach(c => c.remove());
    };

    startBtn.onclick = () => {
        score = 0; 
        scoreDisplay.innerText = "0";
        gameActive = true; 
        startBtn.style.display = "none";
        spawnCarbon();
    };

    function spawnCarbon() {
        if (!gameActive) return;
        const cloud = document.createElement("div");
        cloud.className = "carbon-cloud";
        cloud.innerHTML = "☁️";
        cloud.style.left = Math.random() * (canvas.offsetWidth - 60) + "px";
        cloud.style.top = "-60px";
        canvas.appendChild(cloud);

        let topPos = -60;
        const fallInterval = setInterval(() => {
            if (!gameActive) { clearInterval(fallInterval); cloud.remove(); return; }
            
            // Difficulty increases with score
            topPos += (2 + (score / 15));
            cloud.style.top = topPos + "px";

            if (topPos > canvas.offsetHeight) {
                clearInterval(fallInterval);
                cloud.remove();
                endGame();
            }
        }, 30);

        cloud.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            score++;
            scoreDisplay.innerText = score;
            
            // Update High Score
            if (score > highScore) {
                highScore = score;
                highDisplay.innerText = highScore;
                localStorage.setItem("carbonHighScore", highScore);
            }

            clearInterval(fallInterval);
            cloud.innerHTML = "🌿";
            cloud.style.pointerEvents = "none"; // Disable double clicks
            setTimeout(() => cloud.remove(), 250);
        });

        // Loop spawn
        setTimeout(spawnCarbon, Math.max(1000 - (score * 20), 400));
    }

    function endGame() {
        gameActive = false;
        alert(`Game Over! Final Score: ${score}`);
        startBtn.style.display = "inline-block";
        startBtn.innerText = "Try Again";
    }
}

/* ==========================================================================
   MISC: FORMS, VIDEO, & GLOBAL HELPERS
   ========================================================================== */

function initBetaForm() {
    const form = document.getElementById("betaForm");
    const submitBtn = document.getElementById("submitBetaBtn");
    const successMsg = document.getElementById("formSuccessMessage");
    if (!form) return;

    form.onsubmit = async (e) => {
        e.preventDefault();
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;
        submitBtn.disabled = true;

        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            form.reset();
            submitBtn.style.display = "none";
            successMsg.style.display = "block";
            setTimeout(() => {
                successMsg.style.display = "none";
                submitBtn.style.display = "block";
                submitBtn.innerHTML = "Send Report 🚀";
                submitBtn.disabled = false;
            }, 5000);
        }
    };
}

function initVideoPromo() {
    const popup = document.getElementById("videoPromoPopup");
    const close = document.getElementById("closeVideoPromo");
    if (popup) {
        setTimeout(() => popup.classList.add("show"), 3000);
        close.onclick = () => popup.classList.remove("show");
    }
}

function changeColor(color) {
    document.body.style.backgroundColor = color;
    localStorage.setItem("bgColor", color);
}

function betaSignOut() {
    localStorage.removeItem('betaLoggedIn');
    sessionStorage.removeItem('betaLoggedIn');
    window.location.replace("index.html");
}