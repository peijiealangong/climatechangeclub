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

---

###### How to use it:

1\. Add a button with:

   class="beta-toggle"

   data-target="ID\_OF\_SECTION\_TO\_SHOW"



2\. Add a hidden section with:

   id="ID\_OF\_SECTION\_TO\_SHOW"

   class="hidden"

---

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

&nbsp; <div class="popup-content">

&nbsp;   <span class="close-btn" onclick="closePopup()">\&times;</span>

&nbsp;   <h2>🎮 Want games and extras for free?</h2>

&nbsp;   <p>Just download our ad-free simple game!</p>

&nbsp;   <a href="/downloads" class="popup-btn">Download Now</a>

&nbsp; </div>

</div>

---

###### CSS

/\* Popup CSS \*/

.popup {

&nbsp; position: fixed;

&nbsp; top: 0; left: 0;

&nbsp; width: 100%; height: 100%;

&nbsp; background: rgba(0,0,0,0.6);

&nbsp; display: none;

&nbsp; justify-content: center;

&nbsp; align-items: center;

&nbsp; z-index: 9999;

}



.popup-content {

&nbsp; background: linear-gradient(135deg, #ff5f6d, #ffc371);

&nbsp; padding: 30px;

&nbsp; border-radius: 12px;

&nbsp; text-align: center;

&nbsp; color: white;

&nbsp; box-shadow: 0 0 20px rgba(0,0,0,0.3);

&nbsp; animation: fadeIn 0.5s ease-in-out;

}



.popup-content h2 {

&nbsp; margin-top: 0;

&nbsp; font-size: 1.8em;

}



.popup-btn {

&nbsp; display: inline-block;

&nbsp; margin-top: 15px;

&nbsp; padding: 12px 24px;

&nbsp; background: white;

&nbsp; color: #ff5f6d;

&nbsp; font-weight: bold;

&nbsp; border-radius: 8px;

&nbsp; text-decoration: none;

&nbsp; transition: background 0.3s;

}



.popup-btn:hover {

&nbsp; background: #ffe0e0;

}



.close-btn {

&nbsp; position: absolute;

&nbsp; top: 15px; right: 20px;

&nbsp; font-size: 28px;

&nbsp; cursor: pointer;

}



@keyframes fadeIn {

&nbsp; from { opacity: 0; transform: scale(0.9); }

&nbsp; to { opacity: 1; transform: scale(1); }

}

---

###### JavaScript

// Popup JS

window.onload = function() {

&nbsp; setTimeout(showPopup, 5000);

};



function showPopup() {

&nbsp; document.getElementById("promoPopup").style.display = "flex";

}



function closePopup() {

&nbsp; document.getElementById("promoPopup").style.display = "none";

}



