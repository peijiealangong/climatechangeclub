// Restore Background on Load
document.addEventListener("DOMContentLoaded", () => {
    const savedColor = localStorage.getItem("bgColor");
    if (savedColor) document.body.style.backgroundColor = savedColor;
});

// Theme Switcher
function changeColor(color) {
    const target = color || '#f0f4f1';
    document.body.style.backgroundColor = target;
    localStorage.setItem("bgColor", target);
}

// Jump To Top Logic
const topBtn = document.getElementById("jumpToTop");

window.addEventListener("scroll", () => {
    const halfWay = document.documentElement.scrollHeight / 2;
    if (window.scrollY > halfWay) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Music Logic
const music = document.getElementById("bgMusic");
const mBtn = document.getElementById("musicBtn");
if (mBtn) {
    mBtn.addEventListener("click", () => {
        if (music.paused) { music.play(); mBtn.textContent = "⏸ Pause Music"; }
        else { music.pause(); mBtn.textContent = "🎵 Play Ambient Music"; }
    });
}