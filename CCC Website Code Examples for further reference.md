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

###### How to use it:

1\. Add a button with:

   class="beta-toggle"

   data-target="ID\_OF\_SECTION\_TO\_SHOW"



2\. Add a hidden section with:

   id="ID\_OF\_SECTION\_TO\_SHOW"

   class="hidden"

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

###### CSS

/\* Popup Fix - Perfectly Centered \& Blur \*/

/\* Update these in style.css \*/

/\* Perfectly Centered Popup Overlay \*/

.popup {

&#x20;   position: fixed;

&#x20;   top: 0;

&#x20;   left: 0;

&#x20;   width: 100vw;

&#x20;   height: 100vh;

&#x20;   background: rgba(0, 0, 0, 0.75);

&#x20;   backdrop-filter: blur(8px);

&#x20;   z-index: 9999;

&#x20;   display: none; /\* JS switches this to 'flex' \*/

&#x20;   align-items: center;     /\* Centers vertically \*/

&#x20;   justify-content: center;   /\* Centers horizontally \*/

}



.popup-content {

&#x20;   background: var(--white);

&#x20;   padding: 40px;

&#x20;   border-radius: 25px;

&#x20;   max-width: 450px;

&#x20;   width: 90%;

&#x20;   position: relative;

&#x20;   box-shadow: 0 20px 60px rgba(0,0,0,0.5);

&#x20;   text-align: center;

&#x20;   animation: popupSlideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

}



@keyframes popupSlideIn {

&#x20;   from { transform: translateY(50px) scale(0.9); opacity: 0; }

&#x20;   to { transform: translateY(0) scale(1); opacity: 1; }

}



.close-btn {

&#x20;   position: absolute;

&#x20;   top: 15px;

&#x20;   right: 20px;

&#x20;   font-size: 1.5rem;

&#x20;   cursor: pointer;

&#x20;   color: #888;

}



@keyframes popupSlideIn {

&#x20;   from { transform: translateY(50px) scale(0.9); opacity: 0; }

&#x20;   to { transform: translateY(0) scale(1); opacity: 1; }

}

@keyframes fadeIn {

  from { opacity: 0; transform: scale(0.9); }

  to { opacity: 1; transform: scale(1); }

}



###### JavaScript (Add at bottom of page)

<script>

function showPopup() {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&nbsp; document.getElementById("promoPopup").style.display = "flex";

}



function closePopup() {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&nbsp; document.getElementById("promoPopup").style.display = "none";

}



// Show popup after 5 seconds

window.addEventListener("load", () => {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&nbsp; setTimeout(showPopup, 5000);

});


🎨 WEB DESIGN REFERENCE NOTES  

Use these patterns to make any website look cleaner, more modern, and more appealing.



====================================================

🌟 1. SPACING \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\& LAYOUT (The #1 design improvement)

====================================================



/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Add breathing room around sections \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

section {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; padding: 40px 20px;

}



/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Consistent spacing utilities \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

.spacing-lg { margin-bottom: 40px; }

.spacing-md { margin-bottom: 20px; }

.spacing-sm { margin-bottom: 10px; }



/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Keep content centered and readable \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

.container {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; max-width: 1100px;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; margin: auto;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; padding: 0 20px;

}



<!-- HTML -->

<section class="container spacing-lg">

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; <h2>Section Title</h2>

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; <p>Readable text stays around 50–75 characters per line.</p>

</section>





====================================================

🔤 2. TYPOGRAPHY (70% of good design)

====================================================



/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Clean, modern font + readable spacing \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

body {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; font-family: "Poppins", system-ui, sans-serif;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; line-height: 1.6;

}



/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Visual hierarchy \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

h1 { font-size: 2.2rem; font-weight: 700; }

h2 { font-size: 1.7rem; font-weight: 600; }

h3 { font-size: 1.3rem; font-weight: 600; }



p {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; font-size: 1rem;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; margin-bottom: 1rem;

}



<!-- HTML -->

<h1>Main Title</h1>

<p>Readable paragraph text goes here.</p>





====================================================

🎨 3. COLOR PALETTE (Use variables!)

====================================================



:root {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; --primary: #2a9d8f;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; --accent: #e63946;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; --dark: #2c3e50;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; --light: #f1faee;

}



/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Use variables everywhere \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

.btn {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; background: var(--primary);

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; color: white;

}



.highlight {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; background: var(--accent);

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; color: white;

}



<!-- HTML -->

<button class="btn">Click Me</button>

<div class="highlight">Important Notice</div>





====================================================

🟦 4. BUTTONS (Modern UI)

====================================================



.btn {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; padding: 12px 20px;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; border-radius: 8px;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; background: var(--primary);

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; color: white;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; text-decoration: none;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; display: inline-block;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; transition: 0.2s ease;

}



.btn:hover {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; background: #21867a;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; transform: translateY(-2px);

}



<!-- HTML -->

<a href="#" class="btn">Learn More</a>





====================================================

📦 5. CARDS (Professional content blocks)

====================================================



.card {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; background: white;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; padding: 20px;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; border-radius: 12px;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; box-shadow: 0 4px 12px rgba(0,0,0,0.1);

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; transition: transform 0.2s ease;

}



.card:hover {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; transform: translateY(-5px);

}



<!-- HTML -->

<div class="card">

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; <h3>Card Title</h3>

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; <p>Short description text.</p>

</div>





====================================================

🔲 6. RESPONSIVE GRID (Auto-fit magic)

====================================================



.grid {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; display: grid;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; gap: 20px;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

}



<!-- HTML -->

<div class="grid">

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; <div class="card">Item 1</div>

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; <div class="card">Item 2</div>

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; <div class="card">Item 3</div>

</div>





====================================================

📱 7. MOBILE NAVIGATION (Simple + effective)

====================================================



nav ul {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; display: flex;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; gap: 20px;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; flex-wrap: wrap;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; justify-content: center;

}



@media (max-width: 768px) {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; nav ul {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20;   flex-direction: column;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20;   text-align: center;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; }

}



<!-- HTML -->

<nav>

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; <ul>

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20;   <li><a href="#">Home</a></li>

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20;   <li><a href="#">Projects</a></li>

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20;   <li><a href="#">Contact</a></li>

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; </ul>

</nav>





====================================================

🌅 8. HERO SECTION (Instantly makes a site look pro)

====================================================



.hero {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; background: linear-gradient(135deg, var(--primary), var(--accent));

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; color: white;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; padding: 80px 20px;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; text-align: center;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; border-radius: 12px;

}



.hero h1 {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; font-size: 2.5rem;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; margin-bottom: 15px;

}



<!-- HTML -->

<section class="hero">

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; <h1>Welcome to Our Club</h1>

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; <p>Making a difference through climate action.</p>

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; <a class="btn" href="#">Join Us</a>

</section>





====================================================

✨ 9. ANIMATIONS (Subtle = classy)

====================================================



.fade-in {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; animation: fadeIn 0.8s ease forwards;

}



@keyframes fadeIn {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; from { opacity: 0; transform: translateY(10px); }

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; to   { opacity: 1; transform: translateY(0); }

}



<!-- HTML -->

<div class="card fade-in">Animated Card</div>





====================================================

🦶 10. FOOTER (Clean + simple)

====================================================



footer {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; background: var(--dark);

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; color: white;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; text-align: center;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; padding: 20px;

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; margin-top: 40px;

}



footer a {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; color: var(--accent);

}



<!-- HTML -->

<footer>

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&#x20; <p>© 2025 Climate Change Club</p>

</footer>

Even more!

/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* ================================================================
   CLIMATE CLUB DEVELOPER CHEAT SHEET
================================================================

1. GLOBAL THEMING (CSS Variables)
-------------------------------------------------- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/
:root {
  --primary-green: #2d6a4f;
  --action-teal: #2a9d8f;
  --glass-bg: rgba(255, 255, 255, 0.8);
  --glass-border: rgba(255, 255, 255, 0.3);
  --smooth: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* 2. MODERN LAYOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\& LOOK 
-------------------------------------------------- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Glassmorphism \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Responsive Grid (No Media Queries Needed) \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Perfect Centering (The "Holy Grail") \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/
.center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* 3. MOTION \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\& ANIMATION 
-------------------------------------------------- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Hover Lift \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/
.lift:hover {
  transform: translateY(-10px);
  transition: var(--smooth);
}

/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Pulsing Effect \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* 4. JAVASCRIPT LOGIC SNIPPETS
-------------------------------------------------- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* 🔒 DOM Safety Wrapper \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/
document.addEventListener("DOMContentLoaded", () => {
  // Your code runs safely here
});

/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* 💾 LocalStorage (Save/Load Data) \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/
localStorage.setItem("key", "value");       // Save
const data = localStorage.getItem("key");   // Load

/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* 🔄 Class Toggler (Beta Sections/Menus) \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/
element.classList.toggle("hidden");

/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* 5. QUICK LAYOUT REFERENCE
-------------------------------------------------- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/
/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*
  MARGIN:  Space outside the box
  BORDER:  The line around the box
  PADDING: Space inside the box (between text and border)
  INSET:   Shorthand for top/right/bottom/left: 0
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

### Additional Info:

\\\\\\\\\\\\\\\[Click Here (Or copy URL below)](read://https\\\\\\\\\\\\\\\_www.howtogeek.com/?url=https%253A%252F%252Fwww.howtogeek.com%252Fget-a-clean-attractive-site-with-lines-of-css%252F)

\\\\\\\\\\\\\\\*\\\\\\\\\\\\\\\*\\\\\\\\\\\\\\\*read://https\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\_www.howtogeek.com/?url=https%3A%2F%2Fwww.howtogeek.com%2Fget-a-clean-attractive-site-with-lines-of-css%2F\\\\\\\\\\\\\\\*\\\\\\\\\\\\\\\*\\\\\\\\\\\\\\\*

### Google Analytics Tag

<!-- Google tag (gtag.js) -->


<script>

\\\\\\\&#x20; window.dataLayer = window.dataLayer || \\\\\\\\\\\\\\\[];

\\\\\\\&#x20; function gtag(){dataLayer.push(arguments);}

\\\\\\\&#x20; gtag('js', new Date());



\\\\\\\&#x20; gtag('config', 'G-68D6N5XQ6D');



### How to make a button that goes to a specific part of the page

<!-- Use the content here -->

<div id="element\\\\\\\_target">Content</div>

<!-- Link to content -->

<a id="link" href="#element\\\\\\\_target">Go to content</a>

<!-- If on a different page -->

<a href="about.html#video-section" class="btn-primary">Watch Our Video 🎬</a>

<!-- If on same page -->

<a href="#video-section" class="btn-primary">Jump to Video ↓</a>

Give your video section the ID "video-section" (using id="video-section"); you can point any button directly to that spot.



##### Additional website tips

<h1 hidden>New York City</h1>

Only shows the text New York City when the mouse is over it.





<img src="http://website.jpg>

Use www.imgur.com to upload an image, then use link





strong is important text, bold

em is emphasized, italics

u marks as underlined

del marks as strikethrough

sup for text marked as superscript

sub for text marked as subscript

sup is like the 1 as a source

sub is like H20 (the 2 at the bottom)

Use <element name> Affected text </element name>




Ordered list:

<ol>

\\\&#x09;<li> List item </li>

</ol>



Unordered:

<ul>

\\\&#x09;<li> List item </li>

</ul>



Nesting list:

<ul>

\\\&#x09;<li>item</li>

\\\&#x09;<ol>

\\\&#x09;	<li>item</li>

\\\&#x09;</ol>

</ul>



Table:

Add <table> </table> tags

Divide table into rows with <tr> and </tr>

Divide rows into cells with <td>

Highlight cells that are headers with <th>



Example:

<table>

\\\&#x09;<tr>

\\\&#x09;	<th>Table header 1</th>

\\\&#x09;	<th>Table header 2</th>

\\\&#x09;</tr>

\\\&#x09;<tr>

\\\&#x09;	<td>Row #1, Cell #1</td>

\\\&#x09;	<td> Row #1, Cell #2</td>

\\\&#x09;</tr>

\\\&#x09;<tr>

\\\&#x09;	<td>Row #2, Cell #1</td>

\\\&#x09;	<td>Row #2, Cell #2</td>

\\\&#x09;</tr>

</table>



Span: colspan is set equal to the number of columns you want to span. <td colspan="2">

You can use <strong></strong> for bold



align left right center justify use align="right"

valign top middle bottom

width pixels(#) or %

height pixels(#) or %



Warning button:

\\\&#x20;   <h2>Warning Button Example</h2>

\\\&#x20;   <button id="warnBtn">Show Warning</button>



\\\&#x20;   <script>

\\\&#x20;       // Get the button element

\\\&#x20;       const warnBtn = document.getElementById('warnBtn');



\\\&#x20;       // Add a click event listener

\\\&#x20;       warnBtn.addEventListener('click', function () {

\\\&#x20;           // Show a warning message

\\\&#x20;           alert("⚠ Warning: Please proceed with caution!");

\\\&#x20;       });




Common CSS Properties and Values for Styling Lists

list-style-type (unordered) disc, circle, square, none

list-style-type (ordered list) decimal upper-roman lower-roman upper-alpha lower-alpha

list-style-image url("URL TYPE IN HERE")

Font family: Font name, or Generic.

p {

\&#x09;font-family: "Times New Roman", Times, serif;

}

Styling Links

color name, hex code, rgb value

text-decoration none, underline (sets links to have no/have underline)

a:link{

\&#x09;color: blue

\&#x09;text-decoration: none;

}







The onclick event in JavaScript is triggered when a user clicks on an HTML element. It is commonly used to execute a function when a button or any other clickable element is clicked.



Example



<button onclick="myFunction()">Click me</button>



<script>

function myFunction() {

alert("Button was clicked!");

}


Copy

In the example above, when the button is clicked, the myFunction is executed, displaying an alert message.



Using addEventListener



Another way to handle click events is by using the addEventListener method.



<button id="myBtn">Click me</button>



<script>

document.getElementById("myBtn").addEventListener("click", function() {

alert("Button was clicked!");

});


Copy

This method allows you to separate JavaScript from HTML, promoting cleaner code.



Changing Element Style



You can also use the onclick event to change the style of an element.



<h3 id="demo" onclick="changeColor()">Click me to change my color.</h3>



<script>

function changeColor() {

document.getElementById("demo").style.color = "red";

}


Copy

In this example, clicking on the <h3> element changes its text color to red.



Important Considerations



Bubbling and Cancelable: The onclick event bubbles up through the DOM and can be canceled.



Supported Elements: It can be used with almost all HTML elements except <base>, <bdo>, <br>, <head>, <html>, <iframe>, <meta>, <param>, <script>, <style>, and <title>.



Using onclick events effectively can enhance user interaction and improve the functionality of your web pages.



## \*\*\*Use Bootstrap to write HTML/CSS! https://getbootstrap.com\*\*\*

\*\*\*Update: Bootstrap code in website now\*\*\*

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">










# hCATCHPA keys

Secret: ES\_21d5e5e4aba24c8cace13ee7fc31be39

Site key: fa3ac6ba-bd48-4432-9618-c300f8ee79ee

<div class="h-captcha" data-sitekey="fa3ac6ba-bd48-4432-9618-c300f8ee79ee"></div> (Before button of form)

<script src="https://js.hcaptcha.com/1/api.js" async defer></script>

















































# JavaScript Cheat Codes!!! 🥳🎉

/\* ==========================================================================

&#x20;  1. DOM MANIPULATION (Interacting with HTML)

&#x20;  ========================================================================== \*/



// Select an element (Modern way)

const element = document.querySelector('.my-class'); 



// Change text or HTML inside an element

element.textContent = "Hello World"; // Safe (text only)

element.innerHTML = "<strong>Hello</strong>"; // Renders HTML



// Toggle a CSS class (Perfect for Popups!)

element.classList.add('show');

element.classList.remove('hide');

element.classList.toggle('active'); // Adds if missing, removes if present



// Listen for a click

element.addEventListener('click', () => {

&#x20;   console.log("Button was clicked!");

});



// Change styles directly (Use carefully!)

element.style.backgroundColor = "green";

element.style.display = "none"; // Hides element





/\* ==========================================================================

&#x20;  2. STORAGE \& PERSISTENCE (Memory)

&#x20;  ========================================================================== \*/



// LOCAL STORAGE: Stays even if you close the browser

localStorage.setItem('username', 'EcoWarrior'); // Save

const user = localStorage.getItem('username'); // Retrieve

localStorage.removeItem('username'); // Delete one

localStorage.clear(); // Wipe everything



// SESSION STORAGE: Disappears when the tab is closed

sessionStorage.setItem('hasSeenPopup', 'true');





/\* ==========================================================================

&#x20;  3. TIMERS \& DELAYS

&#x20;  ========================================================================== \*/



// Run once after a delay (1000ms = 1 second)

setTimeout(() => {

&#x20;   console.log("This happened after 2 seconds");

}, 2000);



// Run repeatedly every 5 seconds

const myInterval = setInterval(() => {

&#x20;   console.log("I happen every 5 seconds");

}, 5000);



// Stop a repeating interval

clearInterval(myInterval);





/\* ==========================================================================

&#x20;  4. ARRAY MAGIC (Handling Lists of Data)

&#x20;  ========================================================================== \*/



const members = \['Alice', 'Bob', 'Charlie'];



// Add/Remove items

members.push('Dave'); // Add to end

members.pop(); // Remove from end

members.unshift('Zoe'); // Add to start



// Loop through each item

members.forEach(name => console.log("Member: " + name));



// Create a NEW list based on logic (Filter)

const longNames = members.filter(name => name.length > 4);



// Check if a list contains something

const hasBob = members.includes('Bob'); // returns true





/\* ==========================================================================

&#x20;  5. NUMBERS \& MATH (Great for Games!)

&#x20;  ========================================================================== \*/



// Random number between 0 and 100

let randomNum = Math.floor(Math.random() \* 101);



// Rounding

Math.round(4.7); // 5

Math.ceil(4.1);  // 5 (Rounds UP)

Math.floor(4.9); // 4 (Rounds DOWN)



// Convert String to Number

const score = parseInt("50"); // "50" -> 50

const price = parseFloat("19.99"); // "19.99" -> 19.99





/\* ==========================================================================

&#x20;  6. STRINGS (Text Handling)

&#x20;  ========================================================================== \*/



let text = "  Climate Change Club  ";



text = text.trim(); // Removes spaces at start/end

text = text.toLowerCase(); // "climate change club"

text = text.toUpperCase(); // "CLIMATE CHANGE CLUB"



// Check if text contains a word

if (text.includes("climate")) {

&#x20;   console.log("Found it!");

}



// Replace a word

const newText = text.replace("Climate", "Green");





/\* ==========================================================================

&#x20;  7. NAVIGATION \& WINDOW

&#x20;  ========================================================================== \*/



// Redirect to another page

// window.location.href = "https://google.com";



// Reload the current page

// window.location.reload();



// Open a new tab

// window.open('https://forms.gle/xyz', '\_blank');



// Alert/Confirm/Prompt (Simple UI)

alert("Welcome!");

const choice = confirm("Are you sure?"); // returns true/false

const input = prompt("What is your name?"); // returns text typed





/\* ==========================================================================

&#x20;  8. MODERN ASYNC (Fetching Data/APIs)

&#x20;  ========================================================================== \*/



async function getData() {

&#x20;   try {

&#x20;       const response = await fetch('https://api.example.com/data');

&#x20;       const data = await response.json(); // Convert response to Javascript Object

&#x20;       console.log(data);

&#x20;   } catch (error) {

&#x20;       console.log("Something went wrong: ", error);

&#x20;   }

}
/\* ==========================================================================

&#x20;  9. INTERACTIVE UI UTILITIES

&#x20;  ========================================================================== \*/



// 🟢 SMOOTH SCROLL TO SECTION

// Great for "Jump to Video" buttons

function scrollToId(id) {

&#x20;   const element = document.getElementById(id);

&#x20;   if (element) {

&#x20;       element.scrollIntoView({ behavior: 'smooth', block: 'start' });

&#x20;   }

}



// 🟢 DYNAMIC PROGRESS BAR

// Updates your "Trees Planted" or "Funds Raised" bars

function updateProgress(barId, current, goal) {

&#x20;   const bar = document.getElementById(barId);

&#x20;   const percentage = (current / goal) \* 100;

&#x20;   if (bar) {

&#x20;       bar.style.width = percentage + "%";

&#x20;       // Optional: Change color if goal is met

&#x20;       if (percentage >= 100) bar.style.background = "#ffd700"; 

&#x20;   }

}



// 🟢 FORM VALIDATION (Simple)

// Checks if an email is valid before letting them click "Join"

function isValidEmail(email) {

&#x20;   const regex = /^\[^\\s@]+@\[^\\s@]+\\.\[^\\s@]+$/;

&#x20;   return regex.test(email); // Returns true or false

}



// 🟢 TYPEWRITER EFFECT

// Makes text appear one letter at a time for cool hero headers

function typeWriter(elementId, text, speed = 100) {

&#x20;   let i = 0;

&#x20;   const element = document.getElementById(elementId);

&#x20;   element.innerHTML = ""; // Clear existing text

&#x20;   

&#x20;   function type() {

&#x20;       if (i < text.length) {

&#x20;           element.innerHTML += text.charAt(i);

&#x20;           i++;

&#x20;           setTimeout(type, speed);

&#x20;       }

&#x20;   }

&#x20;   type();

}





/\* ==========================================================================

&#x20;  10. DATA \& DATE HELPERS

&#x20;  ========================================================================== \*/



// 🟢 GET CURRENT YEAR

// Perfect for your footer © 2026

const currentYear = new Date().getFullYear();



// 🟢 COUNTDOWN TIMER

// Use this for "Next Meeting In: 5 Days"

function daysUntil(targetDate) {

&#x20;   const today = new Date();

&#x20;   const eventDate = new Date(targetDate);

&#x20;   const diffTime = Math.abs(eventDate - today);

&#x20;   const diffDays = Math.ceil(diffTime / (1000 \* 60 \* 60 \* 24));

&#x20;   return diffDays;

}





/\* ==========================================================================

&#x20;  11. BROWSER \& TAB POWER

&#x20;  ========================================================================== \*/



// 🟢 DETECT MOBILE USERS

// Useful for hiding big games on small phones

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);



// 🟢 DARK MODE PREFERENCE

// Checks if the user's computer is set to Dark Mode automatically

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;



// 🟢 TAB TITLE CHANGER

// Changes the tab name when the user clicks away (funny/catchy)

document.addEventListener('visibilitychange', () => {

&#x20;   if (document.hidden) {

&#x20;       document.title = "🌍 Don't leave the planet!";

&#x20;   } else {

&#x20;       document.title = "Climate Change Club | Home";

&#x20;   }

});

/\* ==========================================================================

&#x20;  12. THE "USER EXPERIENCE" BOOSTERS

&#x20;  ========================================================================== \*/



// 1. DEBOUNCE (The Performance King)

// Stops a function from firing too fast (e.g., while window resizing)

function debounce(func, timeout = 300) {

&#x20; let timer;

&#x20; return (...args) => {

&#x20;   clearTimeout(timer);

&#x20;   timer = setTimeout(() => { func.apply(this, args); }, timeout);

&#x20; };

}



// 2. COPY TO CLIPBOARD

// Perfect for "Copy Join Link" buttons

function copyToClipboard(text) {

&#x20;   navigator.clipboard.writeText(text);

&#x20;   alert("Copied to clipboard! 📋");

}



// 3. GET URL PARAMETERS

// If link is site.com?user=Alex, this gets "Alex"

const getParam = (param) => new URLSearchParams(window.location.search).get(param);



// 4. RANDOM HEX COLOR GENERATOR

// Fun for randomizing UI elements

const getRandomColor = () => `#${Math.floor(Math.random()\*16777215).toString(16)}`;



// 5. DETECT SCROLL DIRECTION

// Hide navbar when scrolling down, show when scrolling up

let lastScroll = 0;

window.addEventListener("scroll", () => {

&#x20;   let currentScroll = window.pageYOffset;

&#x20;   if (currentScroll > lastScroll) { /\* Scrolling Down \*/ } 

&#x20;   else { /\* Scrolling Up \*/ }

&#x20;   lastScroll = currentScroll;

});





/\* ==========================================================================

&#x20;  13. DATA \& STRING UTILS

&#x20;  ========================================================================== \*/



// 6. CAPITALIZE FIRST LETTER

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);



// 7. TRUNCATE TEXT (The "Read More" logic)

const truncate = (str, len) => str.length > len ? str.substring(0, len) + "..." : str;



// 8. GENERATE UNIQUE ID

// Great for giving items in a list a unique "key"

const uid = () => Date.now().toString(36) + Math.random().toString(36).substr(2);



// 9. SHUFFLE AN ARRAY

// Perfect for randomizing quiz questions or member spotlights

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);



// 10. CHECK IF OBJECT IS EMPTY

const isEmpty = obj => Object.keys(obj).length === 0;





/\* ==========================================================================

&#x20;  14. ADVANCED UI \& ANIMATION

&#x20;  ========================================================================== \*/



// 11. REVEAL ON SCROLL

// Adds 'visible' class when element enters the screen

const observer = new IntersectionObserver((entries) => {

&#x20;   entries.forEach(entry => {

&#x20;       if (entry.isIntersecting) entry.target.classList.add('reveal');

&#x20;   });

});

// Usage: observer.observe(document.querySelector('.my-element'));



// 12. PREVENT SCROLL (For Open Modals)

const lockScroll = () => document.body.style.overflow = 'hidden';

const unlockScroll = () => document.body.style.overflow = '';



// 13. PLAY SOUND EFFECT

function playSound(url) {

&#x20;   new Audio(url).play();

}



// 14. TOGGLE FULLSCREEN

function toggleFullscreen() {

&#x20;   if (!document.fullscreenElement) document.documentElement.requestFullscreen();

&#x20;   else document.exitFullscreen();

}



// 15. DETECT MOUSE "LEAVE INTENT"

// Shows a popup when user moves mouse toward the 'X' to close the tab

document.addEventListener("mouseleave", (e) => {

&#x20;   if (e.clientY < 0) console.log("User is trying to leave!");

});





/\* ==========================================================================

&#x20;  15. TIME \& MATH PROS

&#x20;  ========================================================================== \*/



// 16. TIME AGO (e.g., "5 minutes ago")

function timeAgo(date) {

&#x20;   const seconds = Math.floor((new Date() - date) / 1000);

&#x20;   if (seconds < 60) return `${seconds}s ago`;

&#x20;   const minutes = Math.floor(seconds / 60);

&#x20;   if (minutes < 60) return `${minutes}m ago`;

&#x20;   return `${Math.floor(minutes / 60)}h ago`;

}



// 17. GET RANDOM ITEM FROM ARRAY

const getRandomItem = (arr) => arr\[Math.floor(Math.random() \* arr.length)];



// 18. FORMAT CURRENCY (If you ever do club donations)

const formatMoney = (amt) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amt);



// 19. PERCENTAGE CALCULATOR

const getPercent = (num, total) => Math.round((num / total) \* 100) + "%";



// 20. DETECT ONLINE/OFFLINE STATUS

window.addEventListener('online', () => alert("You're back online! 🌐"));

window.addEventListener('offline', () => alert("Connection lost. ⚠️"));

/\* ==========================================================================

&#x20;  16. THE CANVAS \& GRAPHICS (For Mini-Games)

&#x20;  ========================================================================== \*/



// 1. INITIALIZE CANVAS

const ctx = document.getElementById('myCanvas').getContext('2d');



// 2. DRAW RECTANGLE

const drawRect = (x, y, w, h, color) => { ctx.fillStyle = color; ctx.fillRect(x, y, w, h); };



// 3. DRAW CIRCLE

const drawCircle = (x, y, r, color) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI\*2); ctx.fillStyle = color; ctx.fill(); };



// 4. CLEAR CANVAS (Essential for animations)

const clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);



// 5. DISTANCE BETWEEN TWO POINTS (Collision Detection)

const getDistance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);





/\* ==========================================================================

&#x20;  17. DEEP OBJECT \& ARRAY MANIPULATION

&#x20;  ========================================================================== \*/



// 6. DEEP CLONE (Copy an object without linking it to the original)

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));



// 7. SUM AN ARRAY

const sum = (arr) => arr.reduce((acc, val) => acc + val, 0);



// 8. GET UNIQUE VALUES (Remove duplicates from a list)

const unique = (arr) => \[...new Set(arr)];



// 9. GROUP BY (Groups members by their 'role')

const groupBy = (arr, key) => arr.reduce((acc, obj) => {

&#x20; const value = obj\[key];

&#x20; (acc\[value] = acc\[value] || \[]).push(obj);

&#x20; return acc;

}, {});



// 10. CHUNK ARRAY (Split a long list into pages of 10)

const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i \* size, i \* size + size));





/\* ==========================================================================

&#x20;  18. ADVANCED BROWSER \& HARDWARE APIs

&#x20;  ========================================================================== \*/



// 11. VIBRATE PHONE (Haptic feedback for games)

const vibrate = (ms) => navigator.vibrate(ms);



// 12. GET BATTERY STATUS

navigator.getBattery().then(batt => console.log(`Battery: ${batt.level \* 100}%`));



// 13. SHARE CONTENT (Native mobile share menu)

const share = (title, text, url) => navigator.share({ title, text, url });



// 14. COPY IMAGE TO CLIPBOARD (Experimental)

const copyImg = async (url) => {

&#x20;   const data = await fetch(url);

&#x20;   const blob = await data.blob();

&#x20;   await navigator.clipboard.write(\[new ClipboardItem({\[blob.type]: blob})]);

};



// 15. DETECT DEVICE ORIENTATION (Portrait vs Landscape)

const isLandscape = () => window.matchMedia("(orientation: landscape)").matches;





/\* ==========================================================================

&#x20;  19. STRING \& REGEX PROS

&#x20;  ========================================================================== \*/



// 16. STRIP HTML (Remove tags from a string)

const stripHTML = (str) => str.replace(/<\[^>]\*>?/gm, '');



// 17. SLUGIFY (Turn "Hello World" into "hello-world" for URLs)

const slugify = (str) => str.toLowerCase().trim().replace(/\[^\\w\\s-]/g, '').replace(/\[\\s\_-]+/g, '-');



// 18. ESTIMATE READING TIME

const readTime = (text) => Math.ceil(text.trim().split(/\\s+/).length / 200);



// 19. GENERATE RANDOM STRING (Password/Token)

const randomStr = (len) => Math.random().toString(36).substring(2, 2 + len);



// 20. COUNT WORDS

const countWords = (str) => str.trim().split(/\\s+/).length;





/\* ==========================================================================

&#x20;  20. DOM \& CSS TRICKS

&#x20;  ========================================================================== \*/



// 21. GET ELEMENT INDEX (Which list item was clicked?)

const getIndex = (el) => \[...el.parentNode.children].indexOf(el);



// 22. SET CSS VARIABLE VIA JS (Change --main-color dynamically)

const setCSSVar = (name, val) => document.documentElement.style.setProperty(name, val);



// 23. TRIGGER A REFLOW (Fixes animation glitches)

const reflow = (el) => el.offsetHeight;



// 24. DETECT IF ELEMENT IS IN VIEWPORT (Simple version)

const isInViewport = (el) => el.getBoundingClientRect().top < window.innerHeight;



// 25. GET SCROLL PERCENTAGE (For "Read Progress" bars)

const getScrollPercent = () => (window.scrollY / (document.body.scrollHeight - window.innerHeight)) \* 100;





/\* ==========================================================================

&#x20;  21. EVENT \& LOGIC SHORTCUTS

&#x20;  ========================================================================== \*/



// 26. ONCE (Run an event listener only ONE time)

const runOnce = (el, type, fn) => el.addEventListener(type, fn, { once: true });



// 27. WAIT (The modern async delay)

const wait = (ms) => new Promise(res => setTimeout(res, ms));



// 28. TOGGLE BOOLEAN (Switch true/false)

let isActive = false;

const toggle = () => isActive = !isActive;



// 29. DETECT TOUCH DEVICE

const isTouch = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;



// 30. PREVENT DEFAULT (Quick shortcut)

const stop = (e) => { e.preventDefault(); e.stopPropagation(); };



/\* ==========================================================================

&#x20;  22. BROWSER SECURITY \& DATA SANITY

&#x20;  ========================================================================== \*/



// 1. ESCAPE HTML (Prevents XSS attacks in comments)

const escapeHTML = (str) => str.replace(/\[\&<>"']/g, m => ({'\&':'\&amp;','<':'\&lt;','>':'\&gt;','"':'\&quot;',"'":"\&#39;"}\[m]));



// 2. IS VALID URL

const isURL = (str) => { try { new URL(str); return true; } catch { return false; } };



// 3. BASE64 ENCODE/DECODE (For simple data obfuscation)

const toBase64 = (str) => btoa(str);

const fromBase64 = (str) => atob(str);



// 4. MASK SENSITIVE DATA (e.g., "em\*\*\*@mail.com")

const mask = (str, num = 3) => str.slice(0, num) + "\*".repeat(str.length - num);





/\* ==========================================================================

&#x20;  23. PERFORMANCE \& OPTIMIZATION (Speed)

&#x20;  ========================================================================== \*/



// 5. THROTTLE (Limit a function to run only once per X ms)

const throttle = (fn, wait) => {

&#x20; let last = 0;

&#x20; return (...args) => {

&#x20;   const now = Date.now();

&#x20;   if (now - last >= wait) { last = now; fn(...args); }

&#x20; };

};



// 6. MEMOIZE (Caches function results for faster repeats)

const memoize = (fn) => {

&#x20; const cache = {};

&#x20; return (n) => n in cache ? cache\[n] : (cache\[n] = fn(n));

};



// 7. PRELOAD IMAGE (Background loading)

const preloadImage = (url) => { const img = new Image(); img.src = url; };



// 8. DETECT CPU CORES (For heavy logic optimization)

const cores = navigator.hardwareConcurrency || 4;





/\* ==========================================================================

&#x20;  24. ADVANCED MATH \& PHYSICS (For Games/Charts)

&#x20;  ========================================================================== \*/



// 9. LERP (Linear Interpolation - Smooth movement)

const lerp = (start, end, amt) => (1 - amt) \* start + amt \* end;



// 10. CLAMP (Keep a number between a Min and Max)

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);



// 11. RADIANS TO DEGREES

const radToDeg = (rad) => (rad \* 180) / Math.PI;



// 12. DEGREES TO RADIANS

const degToRad = (deg) => (deg \* Math.PI) / 180;



// 13. GET MIDPOINT

const midpoint = (p1, p2) => ({ x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 });





/\* ==========================================================================

&#x20;  25. DYNAMIC UI \& STYLE

&#x20;  ========================================================================== \*/



// 14. GET CONTRASTING TEXT COLOR (Black or White based on BG)

const getContrast = (hex) => parseInt(hex.slice(1), 16) > 0xffffff / 2 ? '#000' : '#fff';



// 15. IS ELEMENT HIDDEN?

const isHidden = (el) => el.offsetParent === null;



// 16. ANIMATE COUNTER (0 to 100 effect)

function animateValue(id, start, end, duration) {

&#x20;   let startTimestamp = null;

&#x20;   const step = (timestamp) => {

&#x20;       if (!startTimestamp) startTimestamp = timestamp;

&#x20;       const progress = Math.min((timestamp - startTimestamp) / duration, 1);

&#x20;       document.getElementById(id).innerHTML = Math.floor(progress \* (end - start) + start);

&#x20;       if (progress < 1) window.requestAnimationFrame(step);

&#x20;   };

&#x20;   window.requestAnimationFrame(step);

}



// 17. TOGGLE ATTRIBUTE (e.g., aria-expanded)

const toggleAttr = (el, attr) => el.setAttribute(attr, el.getAttribute(attr) === 'true' ? 'false' : 'true');





/\* ==========================================================================

&#x20;  26. SYSTEM \& ENVIRONMENT

&#x20;  ========================================================================== \*/



// 18. GET BROWSER NAME

const getBrowser = () => {

&#x20;   if (navigator.userAgent.includes("Chrome")) return "Chrome";

&#x20;   if (navigator.userAgent.includes("Firefox")) return "Firefox";

&#x20;   return "Unknown";

};



// 19. DETECT INCORRECT SYSTEM TIME

const isTimeWrong = () => Math.abs(new Date().getTime() - Date.now()) > 60000;



// 20. GET COOKIE VALUE

const getCookie = (name) => document.cookie.match(`(^|;)\\\\s\*${name}\\\\s\*=\\\\s\*(\[^;]+)`)?.pop();





/\* ==========================================================================

&#x20;  27. ARRAY \& OBJECT "SHORTHANDS"

&#x20;  ========================================================================== \*/



// 21. FLATTEN ARRAY (Nested list to one list)

const flatten = (arr) => arr.flat(Infinity);



// 22. SORT BY PROPERTY (Sort members by name)

const sortBy = (arr, prop) => arr.sort((a, b) => a\[prop] > b\[prop] ? 1 : -1);



// 23. FIND OBJECT IN ARRAY

const findObj = (arr, key, val) => arr.find(o => o\[key] === val);



// 24. REMOVE NULL/UNDEFINED FROM LIST

const compact = (arr) => arr.filter(Boolean);





/\* ==========================================================================

&#x20;  28. MISC POWER-USER TOOLS

&#x20;  ========================================================================== \*/



// 25. REDIRECT WITH DELAY

const delayedRedirect = (url, ms) => setTimeout(() => window.location.href = url, ms);



// 26. CLICK OUTSIDE TO CLOSE

document.addEventListener('click', (e) => {

&#x20;   if (!myPopup.contains(e.target)) myPopup.style.display = 'none';

});



// 27. GET TEXT FROM CLIPBOARD

const getPaste = async () => await navigator.clipboard.readText();



// 28. DISABLE RIGHT CLICK (Use sparingly!)

// document.addEventListener('contextmenu', e => e.preventDefault());



// 29. RELOAD ON RESIZE (Fixes canvas scaling issues)

window.onresize = () => window.location.reload();



// 30. LOG WITH STYLE (Rainbow console logs!)

const rainbowLog = (msg) => console.log(`%c ${msg}`, 'background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); color: white; padding: 5px;');



// 31. DETECT CAPS LOCK

window.addEventListener('keydown', e => { if (e.getModifierState('CapsLock')) alert('Caps Lock is ON'); });



// 32. GENERATE RGB STRING

const rgb = (r, g, b) => `rgb(${r},${g},${b})`;



// 33. PERCENTAGE TO HEX (Alpha transparency)

const opacityToHex = (p) => Math.round(p \* 255).toString(16).padStart(2, '0');



// 34. CONVERT JSON TO MAP

const jsonToMap = (json) => new Map(Object.entries(JSON.parse(json)));



// 35. MAP TO JSON

const mapToJson = (map) => JSON.stringify(Object.fromEntries(map));



// 36. DETECT PAGE VISIBILITY

const isTabActive = () => !document.hidden;



// 37. GET TEXT CONTENT OF CLIPBOARD (One-liner)

const readClip = () => navigator.clipboard.readText().then(console.log);



// 38. NO-OP (The "Do Nothing" function - useful for placeholders)

const noop = () => {};



// 39. IS DATE VALID?

const isValidDate = (d) => d instanceof Date \&\& !isNaN(d);



// 40. THE "YOU DID IT" LOG

rainbowLog("100 FUNCTIONS COMPLETE!");





