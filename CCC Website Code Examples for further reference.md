# CCC Website Code Examples for further reference

##### Reusable Beta Button Function

###### Reusable Beta Reveal System Javascript

document.addEventListener("DOMContentLoaded", () => {

&nbsp; const toggles = document.querySelectorAll(".beta-toggle");



&nbsp; toggles.forEach(btn => {

&nbsp;   btn.addEventListener("click", () => {

&nbsp;     const targetId = btn.getAttribute("data-target");

&nbsp;     const target = document.getElementById(targetId);



&nbsp;     if (target) {

&nbsp;       target.classList.toggle("hidden");

&nbsp;     }

&nbsp;   });

&nbsp; });

});

------------------------------------------------------------------------------------------------------------------------------------------------------------

###### How to use it:

1\. Add a button with:

&nbsp;  class="beta-toggle"

&nbsp;  data-target="ID\_OF\_SECTION\_TO\_SHOW"



2\. Add a hidden section with:

&nbsp;  id="ID\_OF\_SECTION\_TO\_SHOW"

&nbsp;  class="hidden"

------------------------------------------------------------------------------------------------------------------------------------------------------------

###### Example:

<button class="beta-toggle" data-target="beta-example">

&nbsp; Show Beta Feature (Warning: unstable/demo)

</button>

<div id="beta-example" class="hidden">

&nbsp; <p>This is a beta feature!</p>

</div>

The reusable JS will automatically toggle visibility.



