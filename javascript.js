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
});

/* ==========================================================================
   LOGIC MODULES
   ========================================================================== */

/**
 * MODULE 6: UPDATE NOTIFICATION (With Spinning Icon)
 * 🚨 COMMAND: Change "1.3" to "1.4" to trigger for everyone.
 */
function setupUpdateNotification() {
    const updatePopup = document.getElementById("updatePopup");
    const updateBtn = document.getElementById("updateBtn");

    const currentVersion = "1.5"; 

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