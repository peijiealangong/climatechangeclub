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

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&nbsp; document.getElementById("promoPopup").style.display = "flex";

}



function closePopup() {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&nbsp; document.getElementById("promoPopup").style.display = "none";

}



// Show popup after 5 seconds

window.addEventListener("load", () => {

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\&nbsp; setTimeout(showPopup, 5000);

});


🎨 WEB DESIGN REFERENCE NOTES  

Use these patterns to make any website look cleaner, more modern, and more appealing.



====================================================

🌟 1. SPACING \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\& LAYOUT (The #1 design improvement)

====================================================



/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Add breathing room around sections \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

section {

\\\\\\\\\\\\\\\&#x20; padding: 40px 20px;

}



/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Consistent spacing utilities \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

.spacing-lg { margin-bottom: 40px; }

.spacing-md { margin-bottom: 20px; }

.spacing-sm { margin-bottom: 10px; }



/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Keep content centered and readable \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

.container {

\\\\\\\\\\\\\\\&#x20; max-width: 1100px;

\\\\\\\\\\\\\\\&#x20; margin: auto;

\\\\\\\\\\\\\\\&#x20; padding: 0 20px;

}



<!-- HTML -->

<section class="container spacing-lg">

\\\\\\\\\\\\\\\&#x20; <h2>Section Title</h2>

\\\\\\\\\\\\\\\&#x20; <p>Readable text stays around 50–75 characters per line.</p>

</section>





====================================================

🔤 2. TYPOGRAPHY (70% of good design)

====================================================



/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Clean, modern font + readable spacing \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

body {

\\\\\\\\\\\\\\\&#x20; font-family: "Poppins", system-ui, sans-serif;

\\\\\\\\\\\\\\\&#x20; line-height: 1.6;

}



/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Visual hierarchy \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

h1 { font-size: 2.2rem; font-weight: 700; }

h2 { font-size: 1.7rem; font-weight: 600; }

h3 { font-size: 1.3rem; font-weight: 600; }



p {

\\\\\\\\\\\\\\\&#x20; font-size: 1rem;

\\\\\\\\\\\\\\\&#x20; margin-bottom: 1rem;

}



<!-- HTML -->

<h1>Main Title</h1>

<p>Readable paragraph text goes here.</p>





====================================================

🎨 3. COLOR PALETTE (Use variables!)

====================================================



:root {

\\\\\\\\\\\\\\\&#x20; --primary: #2a9d8f;

\\\\\\\\\\\\\\\&#x20; --accent: #e63946;

\\\\\\\\\\\\\\\&#x20; --dark: #2c3e50;

\\\\\\\\\\\\\\\&#x20; --light: #f1faee;

}



/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\* Use variables everywhere \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

.btn {

\\\\\\\\\\\\\\\&#x20; background: var(--primary);

\\\\\\\\\\\\\\\&#x20; color: white;

}



.highlight {

\\\\\\\\\\\\\\\&#x20; background: var(--accent);

\\\\\\\\\\\\\\\&#x20; color: white;

}



<!-- HTML -->

<button class="btn">Click Me</button>

<div class="highlight">Important Notice</div>





====================================================

🟦 4. BUTTONS (Modern UI)

====================================================



.btn {

\\\\\\\\\\\\\\\&#x20; padding: 12px 20px;

\\\\\\\\\\\\\\\&#x20; border-radius: 8px;

\\\\\\\\\\\\\\\&#x20; background: var(--primary);

\\\\\\\\\\\\\\\&#x20; color: white;

\\\\\\\\\\\\\\\&#x20; text-decoration: none;

\\\\\\\\\\\\\\\&#x20; display: inline-block;

\\\\\\\\\\\\\\\&#x20; transition: 0.2s ease;

}



.btn:hover {

\\\\\\\\\\\\\\\&#x20; background: #21867a;

\\\\\\\\\\\\\\\&#x20; transform: translateY(-2px);

}



<!-- HTML -->

<a href="#" class="btn">Learn More</a>





====================================================

📦 5. CARDS (Professional content blocks)

====================================================



.card {

\\\\\\\\\\\\\\\&#x20; background: white;

\\\\\\\\\\\\\\\&#x20; padding: 20px;

\\\\\\\\\\\\\\\&#x20; border-radius: 12px;

\\\\\\\\\\\\\\\&#x20; box-shadow: 0 4px 12px rgba(0,0,0,0.1);

\\\\\\\\\\\\\\\&#x20; transition: transform 0.2s ease;

}



.card:hover {

\\\\\\\\\\\\\\\&#x20; transform: translateY(-5px);

}



<!-- HTML -->

<div class="card">

\\\\\\\\\\\\\\\&#x20; <h3>Card Title</h3>

\\\\\\\\\\\\\\\&#x20; <p>Short description text.</p>

</div>





====================================================

🔲 6. RESPONSIVE GRID (Auto-fit magic)

====================================================



.grid {

\\\\\\\\\\\\\\\&#x20; display: grid;

\\\\\\\\\\\\\\\&#x20; gap: 20px;

\\\\\\\\\\\\\\\&#x20; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

}



<!-- HTML -->

<div class="grid">

\\\\\\\\\\\\\\\&#x20; <div class="card">Item 1</div>

\\\\\\\\\\\\\\\&#x20; <div class="card">Item 2</div>

\\\\\\\\\\\\\\\&#x20; <div class="card">Item 3</div>

</div>





====================================================

📱 7. MOBILE NAVIGATION (Simple + effective)

====================================================



nav ul {

\\\\\\\\\\\\\\\&#x20; display: flex;

\\\\\\\\\\\\\\\&#x20; gap: 20px;

\\\\\\\\\\\\\\\&#x20; flex-wrap: wrap;

\\\\\\\\\\\\\\\&#x20; justify-content: center;

}



@media (max-width: 768px) {

\\\\\\\\\\\\\\\&#x20; nav ul {

\\\\\\\\\\\\\\\&#x20;   flex-direction: column;

\\\\\\\\\\\\\\\&#x20;   text-align: center;

\\\\\\\\\\\\\\\&#x20; }

}



<!-- HTML -->

<nav>

\\\\\\\\\\\\\\\&#x20; <ul>

\\\\\\\\\\\\\\\&#x20;   <li><a href="#">Home</a></li>

\\\\\\\\\\\\\\\&#x20;   <li><a href="#">Projects</a></li>

\\\\\\\\\\\\\\\&#x20;   <li><a href="#">Contact</a></li>

\\\\\\\\\\\\\\\&#x20; </ul>

</nav>





====================================================

🌅 8. HERO SECTION (Instantly makes a site look pro)

====================================================



.hero {

\\\\\\\\\\\\\\\&#x20; background: linear-gradient(135deg, var(--primary), var(--accent));

\\\\\\\\\\\\\\\&#x20; color: white;

\\\\\\\\\\\\\\\&#x20; padding: 80px 20px;

\\\\\\\\\\\\\\\&#x20; text-align: center;

\\\\\\\\\\\\\\\&#x20; border-radius: 12px;

}



.hero h1 {

\\\\\\\\\\\\\\\&#x20; font-size: 2.5rem;

\\\\\\\\\\\\\\\&#x20; margin-bottom: 15px;

}



<!-- HTML -->

<section class="hero">

\\\\\\\\\\\\\\\&#x20; <h1>Welcome to Our Club</h1>

\\\\\\\\\\\\\\\&#x20; <p>Making a difference through climate action.</p>

\\\\\\\\\\\\\\\&#x20; <a class="btn" href="#">Join Us</a>

</section>





====================================================

✨ 9. ANIMATIONS (Subtle = classy)

====================================================



.fade-in {

\\\\\\\\\\\\\\\&#x20; animation: fadeIn 0.8s ease forwards;

}



@keyframes fadeIn {

\\\\\\\\\\\\\\\&#x20; from { opacity: 0; transform: translateY(10px); }

\\\\\\\\\\\\\\\&#x20; to   { opacity: 1; transform: translateY(0); }

}



<!-- HTML -->

<div class="card fade-in">Animated Card</div>





====================================================

🦶 10. FOOTER (Clean + simple)

====================================================



footer {

\\\\\\\\\\\\\\\&#x20; background: var(--dark);

\\\\\\\\\\\\\\\&#x20; color: white;

\\\\\\\\\\\\\\\&#x20; text-align: center;

\\\\\\\\\\\\\\\&#x20; padding: 20px;

\\\\\\\\\\\\\\\&#x20; margin-top: 40px;

}



footer a {

\\\\\\\\\\\\\\\&#x20; color: var(--accent);

}



<!-- HTML -->

<footer>

\\\\\\\\\\\\\\\&#x20; <p>© 2025 Climate Change Club</p>

</footer>

Even more!

/\\\\\\\\\\\\\\\* ================================================================
   CLIMATE CLUB DEVELOPER CHEAT SHEET
================================================================

1. GLOBAL THEMING (CSS Variables)
-------------------------------------------------- \\\\\\\\\\\\\\\*/
:root {
  --primary-green: #2d6a4f;
  --action-teal: #2a9d8f;
  --glass-bg: rgba(255, 255, 255, 0.8);
  --glass-border: rgba(255, 255, 255, 0.3);
  --smooth: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/\\\\\\\\\\\\\\\* 2. MODERN LAYOUT \\\\\\\\\\\\\\\& LOOK 
-------------------------------------------------- \\\\\\\\\\\\\\\*/

/\\\\\\\\\\\\\\\* Glassmorphism \\\\\\\\\\\\\\\*/
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/\\\\\\\\\\\\\\\* Responsive Grid (No Media Queries Needed) \\\\\\\\\\\\\\\*/
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

/\\\\\\\\\\\\\\\* Perfect Centering (The "Holy Grail") \\\\\\\\\\\\\\\*/
.center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

/\\\\\\\\\\\\\\\* 3. MOTION \\\\\\\\\\\\\\\& ANIMATION 
-------------------------------------------------- \\\\\\\\\\\\\\\*/

/\\\\\\\\\\\\\\\* Hover Lift \\\\\\\\\\\\\\\*/
.lift:hover {
  transform: translateY(-10px);
  transition: var(--smooth);
}

/\\\\\\\\\\\\\\\* Pulsing Effect \\\\\\\\\\\\\\\*/
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/\\\\\\\\\\\\\\\* 4. JAVASCRIPT LOGIC SNIPPETS
-------------------------------------------------- \\\\\\\\\\\\\\\*/

/\\\\\\\\\\\\\\\* 🔒 DOM Safety Wrapper \\\\\\\\\\\\\\\*/
document.addEventListener("DOMContentLoaded", () => {
  // Your code runs safely here
});

/\\\\\\\\\\\\\\\* 💾 LocalStorage (Save/Load Data) \\\\\\\\\\\\\\\*/
localStorage.setItem("key", "value");       // Save
const data = localStorage.getItem("key");   // Load

/\\\\\\\\\\\\\\\* 🔄 Class Toggler (Beta Sections/Menus) \\\\\\\\\\\\\\\*/
element.classList.toggle("hidden");

/\\\\\\\\\\\\\\\* 5. QUICK LAYOUT REFERENCE
-------------------------------------------------- \\\\\\\\\\\\\\\*/
/\\\\\\\\\\\\\\\*
  MARGIN:  Space outside the box
  BORDER:  The line around the box
  PADDING: Space inside the box (between text and border)
  INSET:   Shorthand for top/right/bottom/left: 0
\\\\\\\\\\\\\\\*/

### Additional Info:

\\\\\\\[Click Here (Or copy URL below)](read://https\\\\\\\_www.howtogeek.com/?url=https%253A%252F%252Fwww.howtogeek.com%252Fget-a-clean-attractive-site-with-lines-of-css%252F)

\\\\\\\*\\\\\\\*\\\\\\\*read://https\\\\\\\\\\\\\\\_www.howtogeek.com/?url=https%3A%2F%2Fwww.howtogeek.com%2Fget-a-clean-attractive-site-with-lines-of-css%2F\\\\\\\*\\\\\\\*\\\\\\\*

### Google Analytics Tag

<!-- Google tag (gtag.js) -->


<script>

\\\&#x20; window.dataLayer = window.dataLayer || \\\\\\\[];

\\\&#x20; function gtag(){dataLayer.push(arguments);}

\\\&#x20; gtag('js', new Date());



\\\&#x20; gtag('config', 'G-68D6N5XQ6D');



### How to make a button that goes to a specific part of the page

<!-- Use the content here -->

<div id="element\\\_target">Content</div>

<!-- Link to content -->

<a id="link" href="#element\\\_target">Go to content</a>

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

\&#x09;<li> List item </li>

</ol>



Unordered:

<ul>

\&#x09;<li> List item </li>

</ul>



Nesting list:

<ul>

\&#x09;<li>item</li>

\&#x09;<ol>

\&#x09;	<li>item</li>

\&#x09;</ol>

</ul>



Table:

Add <table> </table> tags

Divide table into rows with <tr> and </tr>

Divide rows into cells with <td>

Highlight cells that are headers with <th>



Example:

<table>

\&#x09;<tr>

\&#x09;	<th>Table header 1</th>

\&#x09;	<th>Table header 2</th>

\&#x09;</tr>

\&#x09;<tr>

\&#x09;	<td>Row #1, Cell #1</td>

\&#x09;	<td> Row #1, Cell #2</td>

\&#x09;</tr>

\&#x09;<tr>

\&#x09;	<td>Row #2, Cell #1</td>

\&#x09;	<td>Row #2, Cell #2</td>

\&#x09;</tr>

</table>



Span: colspan is set equal to the number of columns you want to span. <td colspan="2">

You can use <strong></strong> for bold



align left right center justify use align="right"

valign top middle bottom

width pixels(#) or %

height pixels(#) or %



Warning button:

\&#x20;   <h2>Warning Button Example</h2>

\&#x20;   <button id="warnBtn">Show Warning</button>



\&#x20;   <script>

\&#x20;       // Get the button element

\&#x20;       const warnBtn = document.getElementById('warnBtn');



\&#x20;       // Add a click event listener

\&#x20;       warnBtn.addEventListener('click', function () {

\&#x20;           // Show a warning message

\&#x20;           alert("⚠ Warning: Please proceed with caution!");

\&#x20;       });




Common CSS Properties and Values for Styling Lists

list-style-type (unordered) disc, circle, square, none

list-style-type (ordered list) decimal upper-roman lower-roman upper-alpha lower-alpha

list-style-image url("URL TYPE IN HERE")

Font family: Font name, or Generic.

p {

&#x09;font-family: "Times New Roman", Times, serif;

}

Styling Links

color name, hex code, rgb value

text-decoration none, underline (sets links to have no/have underline)

a:link{

&#x09;color: blue

&#x09;text-decoration: none;

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



## ***Use Bootstrap to write HTML/CSS! https://getbootstrap.com***

***Update: Bootstrap code in website now***

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>









# hCATCHPA keys

Secret: ES\_21d5e5e4aba24c8cace13ee7fc31be39

Site key: fa3ac6ba-bd48-4432-9618-c300f8ee79ee

