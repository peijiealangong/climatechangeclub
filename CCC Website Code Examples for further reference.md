# CCC Website Code Examples for further reference

##### Reusable Beta Button Function

###### Reusable Beta Reveal System Javascript

document.addEventListener("DOMContentLoaded", () => {

  const toggles = document.querySelectorAll(".beta-toggle");



  toggles.forEach(btn => {

    btn.addEventListener("click", () => {

      const targetId = btn.getAttribute("data-target");

      const target = document.getElementById(targetId);



      if (target) {

        target.classList.toggle("hidden");

      }

    });

  });

});

\---

###### How to use it:

1\. Add a button with:

   class="beta-toggle"

   data-target="ID\_OF\_SECTION\_TO\_SHOW"



2\. Add a hidden section with:

   id="ID\_OF\_SECTION\_TO\_SHOW"

   class="hidden"

\---

###### Example:

<button class="beta-toggle" data-target="beta-example">

  Show Beta Feature (Warning: unstable/demo)

</button>

<div id="beta-example" class="hidden">

  <p>This is a beta feature!</p>

</div>

The reusable JS will automatically toggle visibility.

##### Reusable Pop-up promotion offers

###### HTML (Put just before closing </html> tag)

<!-- Popup HTML -->

<div id="promoPopup" class="popup">

  <div class="popup-content">

    <span class="close-btn" onclick="closePopup()">\&times;</span>

    <h2>🎮 Want games and extras for free?</h2>

    <p>Just download our ad-free simple game!</p>

    <a href="/download" class="popup-btn">Download Now</a>

  </div>

</div>

\---

###### CSS

/\* Popup CSS \*/

.popup {

  position: fixed;

  top: 0; left: 0;

  width: 100%; height: 100%;

  background: rgba(0,0,0,0.6);

  display: none;

  justify-content: center;

  align-items: center;

  z-index: 9999;

}



.popup-content {

  background: linear-gradient(135deg, #ff5f6d, #ffc371);

  padding: 30px;

  border-radius: 12px;

  text-align: center;

  color: white;

  box-shadow: 0 0 20px rgba(0,0,0,0.3);

  animation: fadeIn 0.5s ease-in-out;

}



.popup-content h2 {

  margin-top: 0;

  font-size: 1.8em;

}



.popup-btn {

  display: inline-block;

  margin-top: 15px;

  padding: 12px 24px;

  background: white;

  color: #ff5f6d;

  font-weight: bold;

  border-radius: 8px;

  text-decoration: none;

  transition: background 0.3s;

}



.popup-btn:hover {

  background: #ffe0e0;

}



.close-btn {

  position: absolute;

  top: 15px; right: 20px;

  font-size: 28px;

  cursor: pointer;

}



@keyframes fadeIn {

  from { opacity: 0; transform: scale(0.9); }

  to { opacity: 1; transform: scale(1); }

}

\---

###### JavaScript (Add at bottom of page)

<script>

function showPopup() {

\&nbsp; document.getElementById("promoPopup").style.display = "flex";

}



function closePopup() {

\&nbsp; document.getElementById("promoPopup").style.display = "none";

}



// Show popup after 5 seconds

window.addEventListener("load", () => {

\&nbsp; setTimeout(showPopup, 5000);

});


