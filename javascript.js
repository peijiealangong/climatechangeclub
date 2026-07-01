/**
 * CLIMATE CHANGE CLUB - MASTER CORE SCRIPT
 * Version: 4.0.0
 * Beta Version: 4.0
 */

const LATEST_BETA_VERSION = "4.0";
const SCRIPT_SOURCES = {
    confetti: "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js",
    elfsight: "https://elfsightcdn.com/platform.js",
    gofundme: "https://www.gofundme.com/static/js/embed.js"
};

const scriptLoaders = new Map();

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initMobileNav();
    initActiveNavigation();
    initBetaAuthNav();
    initBetaNotification();
    initAmbientMusic();
    initEcoPopup();
    initLazyEmbeds();
    initDonatePopup();
    scheduleMemberCount();
    setupPersistentNewsletter();
    initVideoPromo();
    initScrollReveal();
    setupUpdateNotification();
    setupUpdateNotificationBETA();
    initSmartStack();
    initClimateBuddy();
    initFieldNotes();
    initMiniGame();
    initClimateDefenderWhenReady();
    initBetaForm();
});

function loadScriptOnce(key, src, attributes = {}) {
    if (scriptLoaders.has(key)) return scriptLoaders.get(key);

    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
        const existingPromise = Promise.resolve(existingScript);
        scriptLoaders.set(key, existingPromise);
        return existingPromise;
    }

    const promise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        Object.entries(attributes).forEach(([name, value]) => {
            if (value === true) {
                script.setAttribute(name, "");
            } else if (value !== false && value != null) {
                script.setAttribute(name, String(value));
            }
        });
        script.onload = () => resolve(script);
        script.onerror = () => {
            scriptLoaders.delete(key);
            reject(new Error(`Could not load ${src}`));
        };
        document.head.appendChild(script);
    });

    scriptLoaders.set(key, promise);
    return promise;
}

function runWhenIdle(callback, timeout = 2200) {
    if ("requestIdleCallback" in window) {
        window.requestIdleCallback(callback, { timeout });
        return;
    }

    window.setTimeout(callback, Math.min(timeout, 1200));
}

function observeOnce(elements, callback, options = {}) {
    const targets = Array.from(elements).filter(Boolean);
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
        runWhenIdle(callback, 800);
        return;
    }

    let hasRun = false;
    const observer = new IntersectionObserver((entries) => {
        if (hasRun || !entries.some((entry) => entry.isIntersecting)) return;
        hasRun = true;
        observer.disconnect();
        callback();
    }, options);

    targets.forEach((target) => observer.observe(target));
}

function loadElfsightWidgets() {
    return loadScriptOnce("elfsight", SCRIPT_SOURCES.elfsight, { async: true }).then((script) => {
        document.querySelectorAll("[class*='elfsight-app-'][data-widget-pending]").forEach((widget) => {
            widget.removeAttribute("data-widget-pending");
        });
        return script;
    });
}

function loadGoFundMeEmbeds() {
    return loadScriptOnce("gofundme", SCRIPT_SOURCES.gofundme, { defer: true }).then((script) => {
        document.querySelectorAll(".gfm-embed[data-widget-pending]").forEach((embed) => {
            embed.removeAttribute("data-widget-pending");
        });
        return script;
    });
}

function initLazyEmbeds() {
    const elfsightWidgets = document.querySelectorAll("[class*='elfsight-app-']");
    const gfmEmbeds = document.querySelectorAll(".gfm-embed");

    if (elfsightWidgets.length) {
        elfsightWidgets.forEach((widget) => widget.setAttribute("data-widget-pending", "true"));

        const loadOnIntent = () => loadElfsightWidgets().catch(() => {});
        ["scroll", "pointerdown", "keydown"].forEach((eventName) => {
            window.addEventListener(eventName, loadOnIntent, { once: true, passive: true });
        });
        runWhenIdle(loadOnIntent, window.matchMedia("(max-width: 700px)").matches ? 6000 : 3600);
    }

    if (gfmEmbeds.length) {
        gfmEmbeds.forEach((embed) => embed.setAttribute("data-widget-pending", "true"));
        observeOnce(gfmEmbeds, () => loadGoFundMeEmbeds().catch(() => {}), {
            rootMargin: "700px 0px",
            threshold: 0.01
        });
    }
}

function fireConfetti(options) {
    return loadScriptOnce("confetti", SCRIPT_SOURCES.confetti, { async: true })
        .then(() => {
            if (typeof confetti === "function") confetti(options);
        })
        .catch(() => {});
}

window.showCelebration = function showCelebration() {
    alert("Time to celebrate. You reached the near end of the page, and less than 12% of viewers do that. Thank you for your support.");
    fireConfetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.7 }
    });
};

function initTheme() {
    const savedColor = localStorage.getItem("bgColor");
    if (savedColor) {
        document.documentElement.style.setProperty("--bg-color", savedColor);
    }
}

function changeColor(color) {
    if (color) {
        document.documentElement.style.setProperty("--bg-color", color);
        localStorage.setItem("bgColor", color);
    } else {
        document.documentElement.style.removeProperty("--bg-color");
        localStorage.removeItem("bgColor");
    }
}

function betaSignOut() {
    localStorage.removeItem("betaLoggedIn");
    sessionStorage.removeItem("betaLoggedIn");
    window.location.replace("index.html");
}

function initMobileNav() {
    const navButton = document.querySelector(".nav-toggle");
    const navList = document.getElementById("primary-navigation");
    const dropdownButtons = document.querySelectorAll(".nav-menu-button");

    if (!navButton || !navList) return;

    const setMenuOpen = (isOpen) => {
        navList.setAttribute("data-visible", String(isOpen));
        navButton.setAttribute("aria-expanded", String(isOpen));
        navButton.setAttribute("aria-label", isOpen ? "Close main menu" : "Open main menu");
        document.body.classList.toggle("nav-open", isOpen);
        if (!isOpen) closeDropdowns();
    };

    const closeDropdowns = () => {
        document.querySelectorAll(".nav-list .dropdown[data-open='true']").forEach((dropdown) => {
            dropdown.removeAttribute("data-open");
            const button = dropdown.querySelector(".nav-menu-button");
            if (button) button.setAttribute("aria-expanded", "false");
        });
    };

    navButton.addEventListener("click", () => {
        const isOpen = navList.getAttribute("data-visible") === "true";
        setMenuOpen(!isOpen);
    });

    dropdownButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const dropdown = button.closest(".dropdown");
            if (!dropdown) return;

            const willOpen = dropdown.getAttribute("data-open") !== "true";
            closeDropdowns();
            if (willOpen) {
                dropdown.setAttribute("data-open", "true");
                button.setAttribute("aria-expanded", "true");
            }
        });
    });

    navList.addEventListener("click", (event) => {
        const target = event.target;
        if (target instanceof HTMLElement && target.closest("a")) {
            setMenuOpen(false);
        }
    });

    document.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Node)) return;
        if (!navList.contains(target) && !navButton.contains(target)) {
            setMenuOpen(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenuOpen(false);
            navButton.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 980) {
            setMenuOpen(false);
        }
    });
}

function initActiveNavigation() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    const sectionByPage = {
        "index.html": "home",
        "about.html": "club",
        "projects.html": "club",
        "meetings.html": "club",
        "stages.html": "club",
        "notices.html": "resources",
        "articles.html": "resources",
        "climatechronicle.html": "resources",
        "download.html": "resources",
        "watch.html": "watch",
        "treeshapes.html": "resources",
        "egg.html": "resources",
        "screaming.html": "resources",
        "suma.html": "resources",
        "contact.html": "contact",
        "beta-test.html": "beta",
        "beta-docs.html": "beta",
        "beta-report.html": "beta"
    };

    const currentSection = sectionByPage[path];
    const currentPath = new URL(window.location.href).pathname.replace(/\/$/, "/index.html");

    document.querySelectorAll(".nav-list a[href]").forEach((link) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;
        const linkPath = new URL(href, window.location.href).pathname.replace(/\/$/, "/index.html");
        if (linkPath === currentPath) {
            link.classList.add("active");
        }
    });

    if (currentSection) {
        document.querySelectorAll(`[data-nav-section="${currentSection}"]`).forEach((item) => {
            item.classList.add("active");
        });
    }
}

function initBetaAuthNav() {
    const isBetaLoggedIn = Boolean(localStorage.getItem("betaLoggedIn") || sessionStorage.getItem("betaLoggedIn"));
    document.body.classList.toggle("beta-authenticated", isBetaLoggedIn);

    document.querySelectorAll("[data-beta-logout]").forEach((button) => {
        button.addEventListener("click", betaSignOut);
    });
}

function initBetaNotification() {
    const dot = document.getElementById("updateDot");
    const betaButton = document.getElementById("betaNavBtn");
    if (!dot || !betaButton) return;

    const lastSeenVersion = localStorage.getItem("lastSeenBetaVersion");
    if (lastSeenVersion !== LATEST_BETA_VERSION) {
        dot.classList.add("is-visible");
    }

    betaButton.addEventListener("click", () => {
        dot.classList.remove("is-visible");
        localStorage.setItem("lastSeenBetaVersion", LATEST_BETA_VERSION);
    });
}

function triggerNewNotification() {
    const dot = document.getElementById("updateDot");
    if (dot) {
        dot.classList.add("is-visible");
    }
}

function handleUpdateSequence(btn, version, redirectUrl) {
    if (!btn) return;
    btn.innerHTML = "Updating...";
    btn.style.opacity = "0.7";
    btn.style.cursor = "not-allowed";
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = "Refreshing...";
        setTimeout(() => {
            localStorage.setItem("appVersion", version);
            window.location.href = redirectUrl;
        }, 900);
    }, 900);
}

function dismissUpdatePopup(popup) {
    if (!popup) return;
    popup.classList.remove("show");
}

function setupUpdateNotification() {
    const updatePopup = document.getElementById("updatePopup");
    const updateBtn = document.getElementById("updateBtn");
    const updateClose = updatePopup ? updatePopup.querySelector(".popup-close") : null;
    const currentVersion = "4.0.0";
    const dismissedKey = `dismissedUpdatePopup-${currentVersion}`;

    if (!updatePopup || !updateBtn) return;

    if (localStorage.getItem("appVersion") !== currentVersion && localStorage.getItem(dismissedKey) !== "true") {
        const delay = window.matchMedia("(max-width: 700px)").matches ? 12000 : 10000;
        window.setTimeout(() => updatePopup.classList.add("show"), delay);
    }

    if (updateClose) {
        updateClose.addEventListener("click", () => {
            dismissUpdatePopup(updatePopup);
            localStorage.setItem(dismissedKey, "true");
        });
    }

    updateBtn.addEventListener("click", () => {
        handleUpdateSequence(updateBtn, currentVersion, "index.html");
    });
}

function setupUpdateNotificationBETA() {
    const updatePopup = document.getElementById("updatePopupBETA");
    const updateBtn = updatePopup ? updatePopup.querySelector("button.btn-primary") : null;
    const updateClose = updatePopup ? updatePopup.querySelector(".popup-close") : null;
    const isBetaLoggedIn = localStorage.getItem("betaLoggedIn") || sessionStorage.getItem("betaLoggedIn");
    const currentVersion = "4.0";
    const dismissedKey = `dismissedUpdatePopup-${currentVersion}`;

    if (!isBetaLoggedIn || !updatePopup || !updateBtn) return;

    if (localStorage.getItem("appVersion") !== currentVersion && localStorage.getItem(dismissedKey) !== "true") {
        updatePopup.classList.add("show");
        updatePopup.style.bottom = "104px";
    }

    if (updateClose) {
        updateClose.addEventListener("click", () => {
            dismissUpdatePopup(updatePopup);
            localStorage.setItem(dismissedKey, "true");
        });
    }

    updateBtn.addEventListener("click", () => {
        handleUpdateSequence(updateBtn, currentVersion, "beta-login.html");
    });
}

function initAmbientMusic() {
    const music = document.getElementById("bgMusic");
    const musicButton = document.getElementById("musicBtn");
    const musicText = document.getElementById("musicText");

    if (!musicButton || !music) return;

    musicButton.addEventListener("click", () => {
        if (music.paused) {
            music.play().catch(() => console.log("Audio blocked until user interaction."));
            if (musicText) musicText.textContent = "Pause Music";
            musicButton.style.background = "#208f83";
        } else {
            music.pause();
            if (musicText) musicText.textContent = "Play Ambient Music";
            musicButton.style.background = "#173f2f";
        }
    });
}

function initEcoPopup() {
    const popup = document.getElementById("promoPopup");
    if (!popup || sessionStorage.getItem("hasSeenEcoPopup")) return;

    setTimeout(() => {
        popup.style.display = "flex";
        sessionStorage.setItem("hasSeenEcoPopup", "true");
    }, 5000);
}

function initDonatePopup() {
    const popup = document.getElementById("donatePopup");
    const donateButton = document.getElementById("donateButton");
    if (!popup) return;

    const closeButton = popup.querySelector(".popup-close");
    const showPopup = () => {
        popup.classList.add("show");
        popup.setAttribute("aria-hidden", "false");
        loadGoFundMeEmbeds().catch(() => {});
    };
    const hidePopup = () => {
        popup.classList.remove("show");
        popup.setAttribute("aria-hidden", "true");
        sessionStorage.setItem("hasDismissedDonatePopup", "true");
    };

    if (donateButton) {
        donateButton.addEventListener("click", showPopup);
    }

    if (closeButton) {
        closeButton.addEventListener("click", hidePopup);
    }

    popup.addEventListener("click", (event) => {
        if (event.target === popup) {
            hidePopup();
        }
    });

    if (!sessionStorage.getItem("hasDismissedDonatePopup")) {
        setTimeout(() => {
            if (!popup.classList.contains("show")) {
                showPopup();
            }
        }, 12000);
    }
}

async function updateMemberCount() {
    const countElement = document.getElementById("member-count");
    if (!countElement) return;

    const apiURL = "https://script.google.com/macros/s/AKfycbzI0GMc3wPGfZDQ4AhERrpn3n3rEFd4236RgRR_cLq3rLDEarUG_yA3uywRjIzWT3bvKg/exec";

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        countElement.innerText = data.count || "200+";
    } catch (error) {
        countElement.innerText = "200+";
    }
}

function scheduleMemberCount() {
    const countElement = document.getElementById("member-count");
    if (!countElement) return;

    const newsletter = countElement.closest(".newsletter-section") || countElement;
    let hasUpdated = false;
    const updateOnce = () => {
        if (hasUpdated) return;
        hasUpdated = true;
        updateMemberCount();
    };

    observeOnce([newsletter], updateOnce, {
        rootMargin: "500px 0px",
        threshold: 0.01
    });
    runWhenIdle(updateOnce, 5000);
}

function setupPersistentNewsletter() {
    const trigger = document.getElementById("confettiTrigger");
    if (!trigger) return;

    if (localStorage.getItem("isSubscribed") === "true") {
        trigger.innerHTML = "Subscribed";
        trigger.classList.add("btn-subscribed");
    }

    trigger.addEventListener("click", (event) => {
        const url = trigger.getAttribute("data-url");
        if (!url) return;

        if (localStorage.getItem("isSubscribed") === "true") {
            window.open(url, "_blank");
            return;
        }

        event.preventDefault();
        fireConfetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        localStorage.setItem("isSubscribed", "true");
        trigger.innerHTML = "Subscribed";
        trigger.classList.add("btn-subscribed");
        setTimeout(() => window.open(url, "_blank"), 900);
    });
}

function initSmartStack() {
    const tabs = Array.from(document.querySelectorAll("[data-stack-target]"));
    const cards = Array.from(document.querySelectorAll("[data-stack-card]"));
    const donateShortcuts = document.querySelectorAll("[data-open-donate]");
    const donateButton = document.getElementById("donateButton");

    if (!tabs.length || !cards.length) {
        donateShortcuts.forEach((button) => {
            button.addEventListener("click", () => {
                if (donateButton) donateButton.click();
            });
        });
        return;
    }

    let activeIndex = Math.max(0, tabs.findIndex((tab) => tab.classList.contains("is-active")));
    let stackTimer = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const activate = (target) => {
        tabs.forEach((tab, index) => {
            const isActive = tab.getAttribute("data-stack-target") === target;
            tab.classList.toggle("is-active", isActive);
            tab.setAttribute("aria-selected", String(isActive));
            if (isActive) activeIndex = index;
        });

        cards.forEach((card) => {
            card.classList.toggle("is-active", card.getAttribute("data-stack-card") === target);
        });
    };

    const startAutoRotate = () => {
        if (reduceMotion) return;
        window.clearInterval(stackTimer);
        stackTimer = window.setInterval(() => {
            activeIndex = (activeIndex + 1) % tabs.length;
            const nextTarget = tabs[activeIndex].getAttribute("data-stack-target");
            if (nextTarget) activate(nextTarget);
        }, 6500);
    };

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = tab.getAttribute("data-stack-target");
            if (!target) return;
            activate(target);
            startAutoRotate();
        });
    });

    cards.forEach((card) => {
        card.addEventListener("pointerenter", () => window.clearInterval(stackTimer));
        card.addEventListener("pointerleave", startAutoRotate);
    });

    donateShortcuts.forEach((button) => {
        button.addEventListener("click", () => {
            if (donateButton) donateButton.click();
        });
    });

    startAutoRotate();
}

function initClimateBuddy() {
    const message = document.getElementById("coachMessage");
    const button = document.getElementById("coachRefresh");
    if (!message || !button) return;

    const prompts = [
        "Check one club update, then choose one action you can complete today.",
        "Invite one person to the mailing list and ask what climate topic they care about.",
        "Open the project page and pick one idea that could work at your school or neighborhood.",
        "Watch one climate video, then write down the strongest fact you want to remember.",
        "Share the tree planting goal with someone who might support the fundraiser.",
        "Save a field note before you leave so your next action is waiting when you come back."
    ];

    let index = new Date().getDate() % prompts.length;
    message.textContent = prompts[index];

    button.addEventListener("click", () => {
        index = (index + 1) % prompts.length;
        message.textContent = prompts[index];
    });
}

function initFieldNotes() {
    const input = document.getElementById("climateNoteInput");
    const saveButton = document.getElementById("saveClimateNote");
    const clearButton = document.getElementById("clearClimateNote");
    const status = document.getElementById("climateNoteStatus");
    if (!input || !saveButton || !clearButton || !status) return;

    const noteKey = "cccClimateActionNote";
    const savedNote = localStorage.getItem(noteKey);
    if (savedNote) {
        input.value = savedNote;
        status.textContent = "Saved note loaded.";
    }

    saveButton.addEventListener("click", () => {
        const note = input.value.trim();
        if (!note) {
            status.textContent = "Write an action first.";
            input.focus();
            return;
        }
        localStorage.setItem(noteKey, note);
        status.textContent = "Saved for your next visit.";
    });

    clearButton.addEventListener("click", () => {
        input.value = "";
        localStorage.removeItem(noteKey);
        status.textContent = "Note cleared.";
        input.focus();
    });
}

function initVideoPromo() {
    const popup = document.getElementById("videoPromoPopup");
    const close = document.getElementById("closeVideoPromo");
    if (!popup) return;
    if (window.matchMedia("(max-width: 700px)").matches) return;

    setTimeout(() => popup.classList.add("show"), 10000);
    if (close) {
        close.addEventListener("click", () => popup.classList.remove("show"));
    }
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    if (!("IntersectionObserver" in window) || !revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.18,
        rootMargin: "0px 0px -90px 0px"
    });

    revealElements.forEach((element) => {
        element.classList.add("reveal-start");
        observer.observe(element);
    });
}

function initMiniGame() {
    const modal = document.getElementById("gameModal");
    const openBtn = document.getElementById("openGameBtn");
    const closeBtn = document.getElementById("closeGameBtn");
    const startBtn = document.getElementById("startGameBtn");
    const canvas = document.getElementById("game-canvas");
    const scoreDisplay = document.getElementById("game-score");
    const highDisplay = document.getElementById("high-score");

    if (!modal || !openBtn || !closeBtn || !startBtn || !canvas || !scoreDisplay || !highDisplay) return;

    let score = 0;
    let gameActive = false;
    let spawnTimer = 0;
    let highScore = Number(localStorage.getItem("carbonHighScore") || 0);

    highDisplay.innerText = String(highScore);

    const clearClouds = () => {
        canvas.querySelectorAll(".carbon-cloud").forEach((cloud) => cloud.remove());
        window.clearTimeout(spawnTimer);
    };

    const closeGame = () => {
        modal.setAttribute("aria-hidden", "true");
        gameActive = false;
        startBtn.style.display = "inline-flex";
        clearClouds();
    };

    openBtn.addEventListener("click", () => {
        modal.setAttribute("aria-hidden", "false");
        startBtn.focus();
    });

    closeBtn.addEventListener("click", closeGame);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
            closeGame();
        }
    });

    startBtn.addEventListener("click", () => {
        clearClouds();
        score = 0;
        scoreDisplay.innerText = "0";
        gameActive = true;
        startBtn.style.display = "none";
        spawnCarbon();
    });

    function spawnCarbon() {
        if (!gameActive) return;

        const cloud = document.createElement("button");
        cloud.type = "button";
        cloud.className = "carbon-cloud";
        cloud.textContent = "CO2";
        cloud.style.left = `${Math.random() * Math.max(canvas.offsetWidth - 70, 20)}px`;
        cloud.style.top = "-45px";
        canvas.appendChild(cloud);

        let topPos = -45;
        const fallInterval = window.setInterval(() => {
            if (!gameActive) {
                window.clearInterval(fallInterval);
                cloud.remove();
                return;
            }

            topPos += 2 + score / 18;
            cloud.style.top = `${topPos}px`;

            if (topPos > canvas.offsetHeight) {
                window.clearInterval(fallInterval);
                cloud.remove();
                endGame();
            }
        }, 30);

        cloud.addEventListener("pointerdown", (event) => {
            event.stopPropagation();
            score += 1;
            scoreDisplay.innerText = String(score);
            if (score > highScore) {
                highScore = score;
                highDisplay.innerText = String(highScore);
                localStorage.setItem("carbonHighScore", String(highScore));
            }
            window.clearInterval(fallInterval);
            cloud.textContent = "OK";
            cloud.style.background = "#208f83";
            cloud.style.pointerEvents = "none";
            window.setTimeout(() => cloud.remove(), 180);
        });

        spawnTimer = window.setTimeout(spawnCarbon, Math.max(900 - score * 18, 360));
    }

    function endGame() {
        gameActive = false;
        startBtn.style.display = "inline-flex";
        startBtn.innerText = "Try Again";
        clearClouds();
        alert(`Game Over! Final Score: ${score}`);
    }
}

function initClimateDefenderWhenReady() {
    const canvas = document.getElementById("defenderCanvas");
    if (!canvas) return;

    const target = canvas.closest(".defender-section") || canvas;
    let initialized = false;
    const initialize = () => {
        if (initialized) return;
        initialized = true;
        initClimateDefender();
    };

    observeOnce([target], initialize, {
        rootMargin: "650px 0px",
        threshold: 0.01
    });
    runWhenIdle(initialize, 6500);
}

function initClimateDefender() {
    const canvas = document.getElementById("defenderCanvas");
    const startBtn = document.getElementById("defenderStart");
    const pauseBtn = document.getElementById("defenderPause");
    const resetBtn = document.getElementById("defenderReset");
    const scoreEl = document.getElementById("defenderScore");
    const livesEl = document.getElementById("defenderLives");
    const bestEl = document.getElementById("defenderBest");
    const levelEl = document.getElementById("defenderLevel");
    const statusEl = document.getElementById("defenderStatus");

    if (!canvas || !startBtn || !pauseBtn || !resetBtn || !scoreEl || !livesEl || !bestEl || !levelEl || !statusEl) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 720;
    const height = 420;
    canvas.width = width;
    canvas.height = height;
    canvas.tabIndex = 0;

    const keys = new Set();
    let best = Number(localStorage.getItem("climateDefenderHighScore") || 0);
    let animationFrame = 0;
    let lastTime = 0;
    let running = false;
    let paused = false;
    let gameOver = false;
    let score = 0;
    let lives = 3;
    let level = 1;
    let cleanTimer = 0;
    let hazardTimer = 0;
    let player = { x: width / 2, y: height - 58, r: 18 };
    let cleanItems = [];
    let hazards = [];

    bestEl.textContent = String(best);

    function resetState() {
        score = 0;
        lives = 3;
        level = 1;
        cleanTimer = 0;
        hazardTimer = 0;
        cleanItems = [];
        hazards = [];
        player = { x: width / 2, y: height - 58, r: 18 };
        running = false;
        paused = false;
        gameOver = false;
        lastTime = 0;
        updateHud();
        statusEl.textContent = "Ready. Collect clean energy and avoid pollution.";
        draw();
    }

    function updateHud() {
        scoreEl.textContent = String(score);
        livesEl.textContent = String(lives);
        levelEl.textContent = String(level);
        bestEl.textContent = String(best);
    }

    function startGame() {
        if (gameOver || (!running && score === 0)) {
            resetState();
        }
        running = true;
        paused = false;
        statusEl.textContent = "Defending the climate.";
        canvas.focus();
        window.cancelAnimationFrame(animationFrame);
        animationFrame = window.requestAnimationFrame(loop);
    }

    function togglePause() {
        if (!running && !paused) return;
        paused = !paused;
        running = !paused;
        statusEl.textContent = paused ? "Paused." : "Defending the climate.";
        if (running) {
            lastTime = 0;
            animationFrame = window.requestAnimationFrame(loop);
        }
        draw();
    }

    function endGame() {
        running = false;
        paused = false;
        gameOver = true;
        if (score > best) {
            best = score;
            localStorage.setItem("climateDefenderHighScore", String(best));
        }
        updateHud();
        statusEl.textContent = `Game over. Final score: ${score}.`;
        draw();
    }

    function loop(timestamp) {
        if (!running) return;
        const delta = Math.min((timestamp - (lastTime || timestamp)) / 1000, 0.04);
        lastTime = timestamp;
        update(delta);
        draw();
        animationFrame = window.requestAnimationFrame(loop);
    }

    function update(delta) {
        const movementSpeed = 260 + level * 14;
        const objectSpeed = 110 + level * 16;

        if (keys.has("ArrowLeft") || keys.has("a")) player.x -= movementSpeed * delta;
        if (keys.has("ArrowRight") || keys.has("d")) player.x += movementSpeed * delta;
        if (keys.has("ArrowUp") || keys.has("w")) player.y -= movementSpeed * delta;
        if (keys.has("ArrowDown") || keys.has("s")) player.y += movementSpeed * delta;
        clampPlayer();

        cleanTimer -= delta;
        hazardTimer -= delta;

        if (cleanTimer <= 0) {
            cleanItems.push(makeObject("clean"));
            cleanTimer = Math.max(0.55, 1.1 - level * 0.04);
        }

        if (hazardTimer <= 0) {
            hazards.push(makeObject("hazard"));
            hazardTimer = Math.max(0.65, 1.45 - level * 0.05);
        }

        cleanItems.forEach((item) => item.y += objectSpeed * delta);
        hazards.forEach((hazard) => hazard.y += (objectSpeed + 30) * delta);

        cleanItems = cleanItems.filter((item) => {
            if (isColliding(player, item)) {
                score += 10;
                level = Math.floor(score / 80) + 1;
                if (score > best) {
                    best = score;
                    localStorage.setItem("climateDefenderHighScore", String(best));
                }
                updateHud();
                return false;
            }
            return item.y < height + 40;
        });

        hazards = hazards.filter((hazard) => {
            if (isColliding(player, hazard)) {
                lives -= 1;
                updateHud();
                if (lives <= 0) {
                    endGame();
                }
                return false;
            }
            return hazard.y < height + 50;
        });
    }

    function makeObject(type) {
        return {
            type,
            x: 28 + Math.random() * (width - 56),
            y: -26,
            r: type === "clean" ? 15 : 18,
            variant: Math.floor(Math.random() * 3)
        };
    }

    function isColliding(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < a.r + b.r;
    }

    function clampPlayer() {
        player.x = Math.max(player.r, Math.min(width - player.r, player.x));
        player.y = Math.max(player.r, Math.min(height - player.r, player.y));
    }

    function draw() {
        drawBackground();
        cleanItems.forEach(drawCleanItem);
        hazards.forEach(drawHazard);
        drawPlayer();
        if (!running) {
            drawOverlay();
        }
    }

    function drawBackground() {
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, "#bdeee7");
        gradient.addColorStop(1, "#f4fbf2");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "rgba(23, 63, 47, 0.08)";
        for (let i = 0; i < 8; i += 1) {
            ctx.beginPath();
            ctx.arc(90 + i * 92, height - 4, 80, Math.PI, 0);
            ctx.fill();
        }
    }

    function drawPlayer() {
        ctx.save();
        ctx.translate(player.x, player.y);
        ctx.fillStyle = "#173f2f";
        ctx.beginPath();
        ctx.moveTo(0, -22);
        ctx.lineTo(22, 18);
        ctx.lineTo(0, 10);
        ctx.lineTo(-22, 18);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#f2c94c";
        ctx.beginPath();
        ctx.arc(0, -2, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function drawCleanItem(item) {
        ctx.save();
        ctx.translate(item.x, item.y);
        if (item.variant === 0) drawSolar();
        if (item.variant === 1) drawWind();
        if (item.variant === 2) drawLeaf();
        ctx.restore();
    }

    function drawSolar() {
        ctx.strokeStyle = "#f2c94c";
        ctx.lineWidth = 3;
        for (let i = 0; i < 8; i += 1) {
            const angle = (Math.PI * 2 * i) / 8;
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * 15, Math.sin(angle) * 15);
            ctx.lineTo(Math.cos(angle) * 22, Math.sin(angle) * 22);
            ctx.stroke();
        }
        ctx.fillStyle = "#f2c94c";
        ctx.beginPath();
        ctx.arc(0, 0, 11, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawWind() {
        ctx.strokeStyle = "#208f83";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, 4);
        ctx.lineTo(0, 22);
        ctx.stroke();
        ctx.fillStyle = "#208f83";
        for (let i = 0; i < 3; i += 1) {
            ctx.rotate((Math.PI * 2) / 3);
            ctx.beginPath();
            ctx.ellipse(0, -12, 5, 16, 0.2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function drawLeaf() {
        ctx.fillStyle = "#2f6f53";
        ctx.beginPath();
        ctx.ellipse(0, 0, 11, 22, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-8, 8);
        ctx.lineTo(8, -8);
        ctx.stroke();
    }

    function drawHazard(hazard) {
        ctx.save();
        ctx.translate(hazard.x, hazard.y);
        ctx.fillStyle = "#58616a";
        ctx.beginPath();
        ctx.arc(-9, 4, 13, 0, Math.PI * 2);
        ctx.arc(5, -2, 16, 0, Math.PI * 2);
        ctx.arc(18, 6, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(217, 79, 69, 0.85)";
        ctx.fillRect(-16, 8, 34, 5);
        ctx.restore();
    }

    function drawOverlay() {
        ctx.fillStyle = "rgba(13, 40, 29, 0.58)";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.font = "700 26px Poppins, Arial";
        const title = gameOver ? "Climate Defender Complete" : paused ? "Paused" : "Climate Defender";
        ctx.fillText(title, width / 2, height / 2 - 12);
        ctx.font = "500 15px Poppins, Arial";
        ctx.fillText("Use arrows, WASD, touch, or drag to move.", width / 2, height / 2 + 20);
        ctx.textAlign = "start";
    }

    function movePlayer(direction, isPressed) {
        const keyByDirection = {
            left: "ArrowLeft",
            right: "ArrowRight",
            up: "ArrowUp",
            down: "ArrowDown"
        };
        const key = keyByDirection[direction];
        if (!key) return;
        if (isPressed) {
            keys.add(key);
        } else {
            keys.delete(key);
        }
    }

    window.addEventListener("keydown", (event) => {
        const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "a", "d", "w", "s"].includes(key)) {
            keys.add(key);
            if (key.startsWith("Arrow")) event.preventDefault();
        }
    });

    window.addEventListener("keyup", (event) => {
        const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
        keys.delete(key);
    });

    canvas.addEventListener("pointermove", (event) => {
        if (!running) return;
        const rect = canvas.getBoundingClientRect();
        player.x = ((event.clientX - rect.left) / rect.width) * width;
        player.y = ((event.clientY - rect.top) / rect.height) * height;
        clampPlayer();
    });

    document.querySelectorAll("[data-defender-move]").forEach((button) => {
        const direction = button.getAttribute("data-defender-move");
        button.addEventListener("pointerdown", () => movePlayer(direction, true));
        button.addEventListener("pointerup", () => movePlayer(direction, false));
        button.addEventListener("pointerleave", () => movePlayer(direction, false));
        button.addEventListener("click", () => {
            if (!running) return;
            const step = 28;
            if (direction === "left") player.x -= step;
            if (direction === "right") player.x += step;
            if (direction === "up") player.y -= step;
            if (direction === "down") player.y += step;
            clampPlayer();
            draw();
        });
    });

    document.addEventListener("visibilitychange", () => {
        if (document.hidden && running) {
            togglePause();
        }
    });

    startBtn.addEventListener("click", startGame);
    pauseBtn.addEventListener("click", togglePause);
    resetBtn.addEventListener("click", resetState);

    resetState();
}

function initBetaForm() {
    const form = document.getElementById("betaForm");
    if (!form) return;

    const submitBtn = form.querySelector('[type="submit"]');
    const successMsg = document.getElementById("formSuccessMessage");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (submitBtn) {
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;
        }

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: { Accept: "application/json" }
            });

            if (!response.ok) {
                throw new Error("Form submission failed");
            }

            form.reset();
            if (successMsg) {
                successMsg.style.display = "block";
            } else {
                alert("Thanks. Your report was sent.");
            }
        } catch (error) {
            alert("Sorry, the report could not be sent. Please try again.");
        } finally {
            if (submitBtn) {
                submitBtn.textContent = "Send Report";
                submitBtn.disabled = false;
            }
        }
    });
}
 
