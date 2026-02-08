// 1. Restore Original Color Logic
function changeColor(val) { 
    document.body.style.background = val || '#f0f4f1'; 
    localStorage.setItem("savedBg", val);
}

// 2. Add Jump to Top Functionality
const topBtn = document.getElementById("jumpToTop");

window.onscroll = function() {
    // Only show if user scrolled past 50% of the page
    if (window.scrollY > (document.body.scrollHeight / 2)) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

topBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 3. Restore Music Persistence
window.onload = () => {
    const saved = localStorage.getItem("savedBg");
    if (saved) document.body.style.background = saved;
};