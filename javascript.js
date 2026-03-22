/**
 * CLIMATE CHANGE CLUB - MAIN CORE SCRIPT
 * Version: 1.3 (Update Popup System Active)
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. GLOBAL THEME INITIALIZATION
    // Restores the user's preferred background color from previous visits.
    const savedColor = localStorage.getItem("bgColor");
    if (savedColor) document.body.style.backgroundColor = savedColor;

    // 2. AMBIENT MUSIC SYSTEM
    // Handles play/pause states and UI button feedback.
    initAmbientMusic();

    // 3. ECO-GAME SESSION POPUP
    // Shows the download prompt once per browser session after 5 seconds.
    initEcoPopup();

    // 4. LIVE IMPACT TRACKER
    // Fetches the latest member data from the Google Apps Script API.
    updateMemberCount();

    // 5. NEWSLETTER PERSISTENCE
    // Remembers if the user joined the mailing list and triggers confetti.
    setupPersistentNewsletter();

    // 6. UPDATE NOTIFICATION (NEW VERSION-CONTROLLED SYSTEM)
    // Checks the server version against the local version to force popups.
    setupUpdateNotification();
    // 7. Initialize the Mini-Game
    initMiniGame();
});

/* ==========================================================================
   LOGIC MODULES
   ========================================================================== */

/**
 * MODULE 6: UPDATE NOTIFICATION (With Spinning Icon)
 * 🚨 COMMAND: Change "1.7" to "1.8" to trigger for everyone.
 */
function setupUpdateNotification() {
    const updatePopup = document.getElementById("updatePopup");
    const updateBtn = document.getElementById("updateBtn");

    const currentVersion = "1.7"; 

    if (!updatePopup || !updateBtn) return;

    const savedVersion = localStorage.getItem("appVersion");

    if (savedVersion !== currentVersion) {
        setTimeout(() => {
            updatePopup.classList.add("show");
        }, 2000);
    }

    updateBtn.addEventListener("click", () => {
        // PHASE 1: "Updating..." with Spinner (2 Seconds)
        // We use innerHTML to include the Font Awesome spinner icon
        updateBtn.innerHTML = `<i class="fas fa-spinner fa-spin-custom"></i> Updating...`;
        updateBtn.style.opacity = "0.7";
        updateBtn.style.cursor = "not-allowed";
        updateBtn.disabled = true; 
        
        setTimeout(() => {
            // PHASE 2: "Refreshing..." (2 Seconds)
            // We keep the spinner going for the refresh phase too
            updateBtn.innerHTML = `<i class="fas fa-sync-alt fa-spin-custom"></i> Refreshing...`;
            
            setTimeout(() => {
                // PHASE 3: Commit and reload
                localStorage.setItem("appVersion", currentVersion);
                window.location.reload();
            }, 2000); 
        }, 2000); 
    });
}
/**
 * MODULE 2: AMBIENT MUSIC
 */
function initAmbientMusic() {
    const music = document.getElementById("bgMusic");
    const mBtn = document.getElementById("musicBtn");
    const mText = document.getElementById("musicText");

    if (mBtn && music) {
        mBtn.addEventListener("click", () => {
            if (music.paused) {
                music.play().catch(() => console.log("Audio blocked: User interaction required."));
                mText.textContent = "Pause Music";
                mBtn.style.background = "var(--action-teal)";
            } else {
                music.pause();
                mText.textContent = "Play Ambient Music";
                mBtn.style.background = "var(--primary-green)";
            }
        });
    }
}

/**
 * MODULE 3: SESSION POPUP
 */
function initEcoPopup() {
    const popup = document.getElementById("promoPopup");
    if (popup && !sessionStorage.getItem("hasSeenEcoPopup")) {
        setTimeout(() => {
            popup.style.display = "flex";
            sessionStorage.setItem("hasSeenEcoPopup", "true");
        }, 5000);
    }
}

/**
 * MODULE 4: GOOGLE API MEMBER COUNTER
 */
async function updateMemberCount() {
    const apiURL = "https://script.google.com/macros/s/AKfycbzI0GMc3wPGfZDQ4AhERrpn3n3rEFd4236RgRR_cLq3rLDEarUG_yA3uywRjIzWT3bvKg/exec";
    const countElement = document.getElementById("member-count");
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        if(countElement) countElement.innerText = data.count || "200+";
    } catch (e) {
        console.error("Member counter API unavailable.");
    }
}

/**
 * MODULE 5: NEWSLETTER PERSISTENCE & CONFETTI
 */
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
            confetti({ 
                particleCount: 150, 
                spread: 70, 
                origin: { y: 0.6 }, 
                colors: ['#2a9d8f', '#f4d35e', '#1b4332'] 
            });
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

/**
 * GLOBAL HELPERS (Color Theme & UI)
 */
function changeColor(color) {
    document.body.style.backgroundColor = color;
    localStorage.setItem("bgColor", color);
}

function closePopup() {
    document.getElementById("promoPopup").style.display = "none";
}
/**
 * MODULE 7: CARBON CATCHER (High Score & Easy-Click Edition)
 */
function initMiniGame() {
    const modal = document.getElementById("gameModal");
    const openBtn = document.getElementById("openGameBtn");
    const closeBtn = document.getElementById("closeGameBtn");
    const startBtn = document.getElementById("startGameBtn");
    const canvas = document.getElementById("game-canvas");
    const scoreDisplay = document.getElementById("game-score");
    const highDisplay = document.getElementById("high-score");

    let score = 0;
    let gameActive = false;

    // Load High Score from "Cookies" (localStorage)
    let highScore = localStorage.getItem("carbonHighScore") || 0;
    highDisplay.innerText = highScore;

    if (!modal || !openBtn) return;

    openBtn.onclick = () => {
        modal.style.display = "flex";
        // Update high score display when opening
        highDisplay.innerText = localStorage.getItem("carbonHighScore") || 0;
    };
    
    closeBtn.onclick = () => {
        modal.style.display = "none";
        gameActive = false;
        canvas.querySelectorAll('.carbon-cloud').forEach(c => c.remove());
    };

    startBtn.onclick = () => {
        score = 0;
        scoreDisplay.innerText = score;
        gameActive = true;
        startBtn.style.display = "none";
        spawnCarbon();
    };

    function spawnCarbon() {
        if (!gameActive) return;

        const cloud = document.createElement("div");
        cloud.className = "carbon-cloud";
        cloud.innerHTML = "☁️"; 
        
        // Random horizontal position
        const maxX = canvas.offsetWidth - 60;
        cloud.style.left = Math.floor(Math.random() * maxX) + "px";
        cloud.style.top = "-60px";
        canvas.appendChild(cloud);

        let topPos = -60;
        const fallInterval = setInterval(() => {
            if (!gameActive) {
                clearInterval(fallInterval);
                cloud.remove();
                return;
            }

            // Falling speed - stays manageable but speeds up slightly with score
            topPos += (2 + (score / 15)); 
            cloud.style.top = topPos + "px";

            if (topPos > canvas.offsetHeight) {
                clearInterval(fallInterval);
                cloud.remove();
                endGame();
            }
        }, 30);

        // Clicking the cloud (Enhanced Hitbox)
        cloud.addEventListener('mousedown', (e) => {
            e.stopPropagation(); // Prevents clicking the background
            score++;
            scoreDisplay.innerText = score;
            
            // Check for New High Score immediately
            if (score > highScore) {
                highScore = score;
                highDisplay.innerText = highScore;
                localStorage.setItem("carbonHighScore", highScore);
            }

            clearInterval(fallInterval);
            cloud.innerHTML = "🌿";
            cloud.style.pointerEvents = "none"; // Prevent double-clicking same cloud
            setTimeout(() => cloud.remove(), 250);
        });

        // Spawn timing
        const spawnRate = Math.max(1000 - (score * 20), 400);
        setTimeout(spawnCarbon, spawnRate);
    }

    function endGame() {
        gameActive = false;
        alert(`Game Over! Final Score: ${score}\nYour Best: ${highScore}`);
        startBtn.style.display = "inline-block";
        startBtn.innerText = "Try to Beat Record";
    }
}
/**
 * MODULE 8: VIDEO PROMO POPUP (Always Shows)
 */
function initVideoPromo() {
    const popup = document.getElementById("videoPromoPopup");
    const closeBtn = document.getElementById("closeVideoPromo");

    if (!popup) return;

    // Triggers every single time the page loads, waiting 3 seconds
    setTimeout(() => {
        popup.classList.add("show");
    }, 3000);

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            // Simply hides the popup when clicked, without saving any memory
            popup.classList.remove("show");
        });
    }
}
/* --- Initialize on Load --- */
document.addEventListener("DOMContentLoaded", () => {
    initVideoPromo();
    initMiniGame();
});

/* --- Video Promo Logic --- */
function initVideoPromo() {
    const popup = document.getElementById("videoPromoPopup");
    const close = document.getElementById("closeVideoPromo");
    if (popup) {
        setTimeout(() => popup.classList.add("show"), 3000);
        close.onclick = () => popup.classList.remove("show");
    }
}

/* --- Game Logic with High Score --- */
function initMiniGame() {
    const modal = document.getElementById("gameModal");
    const openBtn = document.getElementById("openGameBtn");
    const startBtn = document.getElementById("startGameBtn");
    const canvas = document.getElementById("game-canvas");
    const scoreDisplay = document.getElementById("game-score");
    const highDisplay = document.getElementById("high-score");

    let score = 0;
    let gameActive = false;
    let highScore = localStorage.getItem("carbonHighScore") || 0;
    highDisplay.innerText = highScore;

    if(openBtn) openBtn.onclick = () => modal.style.display = "flex";
    
    startBtn.onclick = () => {
        score = 0;
        scoreDisplay.innerText = "0";
        gameActive = true;
        startBtn.style.display = "none";
        spawnCloud();
    };

    function spawnCloud() {
        if (!gameActive) return;
        const cloud = document.createElement("div");
        cloud.className = "carbon-cloud";
        cloud.innerHTML = "☁️";
        cloud.style.left = Math.random() * (canvas.offsetWidth - 50) + "px";
        cloud.style.top = "-50px";
        canvas.appendChild(cloud);

        let top = -50;
        const fall = setInterval(() => {
            if (!gameActive) { clearInterval(fall); cloud.remove(); return; }
            top += (2 + (score / 10));
            cloud.style.top = top + "px";
            if (top > canvas.offsetHeight) { clearInterval(fall); cloud.remove(); endGame(); }
        }, 30);

        cloud.onclick = () => {
            score++;
            scoreDisplay.innerText = score;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem("carbonHighScore", highScore);
                highDisplay.innerText = highScore;
            }
            clearInterval(fall);
            cloud.innerHTML = "🌿";
            setTimeout(() => cloud.remove(), 200);
        };
        setTimeout(spawnCloud, Math.max(1000 - (score * 20), 400));
    }

    function endGame() {
        gameActive = false;
        alert("Game Over! Score: " + score);
        startBtn.style.display = "inline-block";
    }
}
function initBetaForm() {
    const form = document.getElementById("betaForm");
    const submitBtn = document.getElementById("submitBetaBtn");
    const successMsg = document.getElementById("formSuccessMessage");

    if (!form) return;

    form.onsubmit = async (e) => {
        e.preventDefault(); // Stop page refresh
        
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin-custom"></i> Sending...`;
        submitBtn.disabled = true;

        const data = new FormData(form);
        
        // Sending the data to Formspree
        const response = await fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            form.reset();
            submitBtn.style.display = "none";
            successMsg.style.display = "block";
            
            // Re-enable button after 5 seconds
            setTimeout(() => {
                successMsg.style.display = "none";
                submitBtn.style.display = "block";
                submitBtn.innerHTML = "Send Report 🚀";
                submitBtn.disabled = false;
            }, 5000);
        } else {
            alert("Oops! There was a problem sending your report.");
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Send Report 🚀";
        }
    };
}
/* Add this to your javascript.js */
function betaSignOut() {
    localStorage.removeItem('betaLoggedIn');
    sessionStorage.removeItem('betaLoggedIn');
    window.location.replace("index.html");
}