<?php include "includes/header.php"; ?>

<header class="page-hero page-hero-contact">
    <div class="page-hero-content reveal-on-scroll">
        <span class="page-kicker">Contact</span>
        <h1>Contact Us</h1>
        <p>Send a secure message to the <?php echo $siteName; ?> and we will reply as soon as we can.</p>
    </div>
</header>
<section>
<h3>Alert: We have updated our secure form. You can send a message in the new form box, or send one in the old one at the bottom of the page.</h3>
</section>

<!-- UPDATED EMAIL FORM -->
<p>So say what you wanna say here! </p>
<form action-"mailto:gongpeijie620@gmail.com" method="POST">
	<input type="text" value="">
	<input type="submit">
</form>
    <button id="warnBtn">Show Warning</button>

    <script>
        // Get the button element
        const warnBtn = document.getElementById('warnBtn');

        // Add a click event listener
        warnBtn.addEventListener('click', function () {
            // Show a warning message
            alert("âš  Warning: This is a beta feature and is in testing. Please use the old form if this doesn't work, and notify us about this issue there. Thank you.");
        });
    </script>

<hr>

<p class = "warning"> Warning: this is the old form and is less secure. Please use it only if you are okay with a less secure form. </p>

 <!-- âœ… Email Form -->
    <form>
        <input type="text" id="name" placeholder="Your Name">
        <input type="email" id="email" placeholder="Your Email">
        <textarea id="message" placeholder="Your Message"></textarea>
        <button type="button" onclick="sendEmail()">Send Email</button>
<div id="confirmation"></div>
    </form>

    <!-- âœ… Load EmailJS script AFTER everything else -->
    <script src="sendEmail.js"></script>
<p>
<div class="color-panel">
<button onclick="changeColor('blue')">Change Background: Blue</button>
<button onclick="changeColor('white')">Change Background: White</button>
<button onclick="changeColor('#a8dadc')">Ocean Blue</button>
<button onclick="changeColor('#2a9d8f')">Rainforest Green</button>
<button onclick="changeColor('#f4a261')">Sunset Orange</button>
<button onclick="changeColor('red')">Red</button>
<button onclick="changeColor('lightblue')">Light Blue</button>
<button onclick="changeColor('green')">Green</button>
<button onclick="changeColor('')">Reset Background</button>

  <button onclick="changeColor('#264653')">ðŸŒŠ Ocean Depth</button>
  <button onclick="changeColor('#2a9d8f')">ðŸŒ¿ Forest Floor</button>
 <button style="background-color: #f4d35e; color: #222;" onclick="changeColor('#f4d35e')">â˜€ï¸ Solar Glow</button>
  <button onclick="changeColor('#e63946')">ðŸ”¥ Wildfire</button>
  <button onclick="changeColor('#a8dadc')">â„ï¸ Polar Ice</button>
  <button onclick="changeColor('#e9c46a')">ðŸŒ¾ Desert Sand</button>
  <button onclick="changeColor('#6c757d')">ðŸŒªï¸ Storm Sky</button>
  <button onclick="changeColor('#ffcad4')">ðŸŒ¸ Spring Bloom</button>
  <button onclick="changeColor('#5e548e')">ðŸŒŒ Midnight</button>
  <button onclick="changeColor('#d8f3dc')">ðŸŒ¬ï¸ Wind Whisper</button>
</div>
  </p>
<!-- Elfsight Accessibility | Climate Change Club Website Accessibility button -->
<div class="elfsight-app-55baa1f4-7f05-4b47-be17-ff2f8e6710c7" data-elfsight-app-lazy></div>
<!-- Footer -->
<footer>
    <p><strong><?php echo $siteName; ?></strong> | &copy; 2026 Student-Led Initiative | v4.0.0 | BETA v4.0</p>
</footer>
<script src="https://www.google.com/recaptcha/api.js?render=6LexhnssAAAAAJKsI0vXffvPWyNjPh76uV2Cqfip"></script>
<script>
   grecaptcha.ready(function() {
       grecaptcha.execute('6LexhnssAAAAAJKsI0vXffvPWyNjPh76uV2Cqfip', {action: 'submit'}).then(function(token) {
           // Send token to backend for verification
       });
   });
</script>


<!-- Elfsight Background Music | Background music -->
<script src="https://elfsightcdn.com/platform.js" async></script>
<div class="elfsight-app-f7ca7360-edf8-4dfa-831b-eb1678915d1c" data-elfsight-app-lazy></div>
</body>
</html>

