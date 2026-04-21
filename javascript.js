/**
 * CLIMATE CHANGE CLUB - MASTER CORE SCRIPT
 * Version: 1.6
 * Beta Version: 3.1
 * Contains: 
 * - Theme & Music Persistence
 * - Session-based Eco-Popups
 * - Live API Member Counter
 * - Newsletter Confetti & Persistence
 * - Dual Update Systems (Standard & Beta Redirect) - NO DELAYS
 * - Carbon Catcher Mini-Game (High Score Logic)
 * - Video Promo & Beta Form Handling
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. GLOBAL THEME INITIALIZATION
    const savedColor = localStorage.getItem("bgColor");
    if (savedColor) document.body.style.backgroundColor = savedColor;

    // 2. INITIALIZE ALL UI MODULES
    initAmbientMusic();        
    initEcoPopup();           
    updateMemberCount();       
    setupPersistentNewsletter(); 
    initVideoPromo();          
    
    // 3. INITIALIZE UPDATE NOTIFICATIONS
    setupUpdateNotification();     
    setupUpdateNotificationBETA(); 
    
    // 4. INITIALIZE INTERACTIVE MODULES
    initMiniGame();            
    initBetaForm();            
});

/* ==========================================================================
   UPDATE & REDIRECT SYSTEM
   ========================================================================== */

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

// Standard Update: Just refreshes the current page (Delay Removed!)
function setupUpdateNotification() {
    const updatePopup = document.getElementById("updatePopup");
    const updateBtn = document.getElementById("updateBtn");
    const currentVersion = "1.6"; 

    if (!updatePopup || !updateBtn) return;

    if (localStorage.getItem("appVersion") !== currentVersion) {
        // Removed the setTimeout here so it shows instantly
        updatePopup.classList.add("show");
    }

    updateBtn.addEventListener("click", () => {
        handleUpdateSequence(updateBtn, currentVersion, "index.html");
    });
}

// BETA Update: Specifically redirects users to the Beta Login
function setupUpdateNotificationBETA() {
    const updatePopup = document.getElementById("updatePopupBETA");	
    const updateBtn = updatePopup ? updatePopup.querySelector("button") : null;
    const currentVersion = "3.1"; 

    // 1. Check if the user is actually logged into the Beta
    const isBetaLoggedIn = localStorage.getItem('betaLoggedIn') || sessionStorage.getItem('betaLoggedIn');

    // If they aren't logged in, or the popup doesn't exist, stop right here.
    if (!isBetaLoggedIn || !updatePopup || !updateBtn) return;

    if (localStorage.getItem("appVersion") !== currentVersion) {
        updatePopup.classList.add("show");
        
        // 2. Push the Beta popup higher so it doesn't cover the standard popup
        updatePopup.style.bottom = "130px"; 
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
            
            if (score > highScore) {
                highScore = score;
                highDisplay.innerText = highScore;
                localStorage.setItem("carbonHighScore", highScore);
            }

            clearInterval(fallInterval);
            cloud.innerHTML = "🌿";
            cloud.style.pointerEvents = "none"; 
            setTimeout(() => cloud.remove(), 250);
        });

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

/* ADD THIS TO YOUR JAVASCRIPT */

document.addEventListener("DOMContentLoaded", function() {
    const navButton = document.getElementById('betaNavBtn');
    const dot = document.getElementById('updateDot');

    // 1. Hide the dot when the user clicks the button
    if (navButton && dot) {
        navButton.addEventListener('click', function() {
            dot.style.display = 'none';
        });
    }
});

// 2. Global function to resend the notification 
// Call this function anywhere in your app when a new update arrives
function triggerNewNotification() {
    const dot = document.getElementById('updateDot');
    if (dot) {
        dot.style.display = 'inline-block';
    }
}

// --- Optional Test ---
// If you want to test it, uncomment the line below. 
// It will bring the red dot back 5 seconds after you click it away.
// setTimeout(triggerNewNotification, 5000);

/* --- VERSION CONTROL SYSTEM v1.1 --- */

// 1. CHANGE THIS NUMBER to resend the notification to all users
const LATEST_BETA_VERSION = "1.5.2"; 

document.addEventListener("DOMContentLoaded", function() {
    const dot = document.getElementById('updateDot');
    const navButton = document.getElementById('betaNavBtn');
    
    // Check if the user has already seen this specific version
    const lastSeenVersion = localStorage.getItem('lastSeenBetaVersion');

    // 2. Logic: If the version in the code is newer than the browser's memory, show the dot
    if (lastSeenVersion !== LATEST_BETA_VERSION) {
        dot.style.display = 'inline-block';
    }

    // 3. When the user clicks the button, mark THIS version as "seen"
    if (navButton) {
        navButton.addEventListener('click', function() {
            dot.style.display = 'none';
            localStorage.setItem('lastSeenBetaVersion', LATEST_BETA_VERSION);
        });
    }
});



























// THE SAFETY NET: Prevents one small error from crashing the whole site KEEP THIS AT THE BOTTOM OF THE FILE AT ALL TIMES
window.onerror = function(message, source, lineno, colno, error) {
    console.log(`%c 🛡️ Shield Active: Caught an error at line ${lineno}`, 'color: #ff4d4d; font-weight: bold;');
    return true; // This stops the error from showing up in the user's face
};