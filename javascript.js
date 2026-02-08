// 1. Unified Initialization
document.addEventListener("DOMContentLoaded", () => {
    // Restore Saved Theme
    const saved = localStorage.getItem("bgColor");
    if (saved) document.body.style.backgroundColor = saved;

    // Beta Feature Toggles
    document.querySelectorAll(".beta-toggle").forEach(btn => {
        btn.addEventListener("click", () => {
            const target = document.getElementById(btn.getAttribute("data-target"));
            if (target) target.classList.toggle("hidden");
        });
    });

    // Promo Popup Timer
    setTimeout(() => {
        const popup = document.getElementById("promoPopup");
        if (popup) popup.style.display = "flex";
    }, 5000);
});

// 2. Color Engine
function changeColor(color) {
    document.body.style.backgroundColor = color || '#f0f4f1';
    localStorage.setItem("bgColor", color);
}

// 3. Jump To Top Logic
const topBtn = document.getElementById("jumpToTop");
window.onscroll = () => {
    const halfWay = document.documentElement.scrollHeight / 2;
    if (window.scrollY > halfWay) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

// 4. Music & Helpers
function closePopup() { document.getElementById("promoPopup").style.display = "none"; }
const music = document.getElementById("bgMusic");
const mBtn = document.getElementById("musicBtn");
if (mBtn) {
    mBtn.onclick = () => {
        if (music.paused) { music.play(); mBtn.textContent = "⏸ Pause"; }
        else { music.pause(); mBtn.textContent = "🎵 Play Music"; }
    };
}