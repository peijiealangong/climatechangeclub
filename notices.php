<?php include "includes/header.php"; ?>

<header class="page-hero page-hero-notices">
    <div class="page-hero-content reveal-on-scroll">
        <span class="page-kicker">Command Center</span>
        <h1>Notices</h1>
        <p>Live updates, status alerts, and website activity logs.</p>
    </div>
</header>
<main class="container">
    
    <section class="alerts-wrapper">
        <h2 style="border-bottom: 2px solid #e63946; display: inline-block;">âš ï¸ Active Alerts</h2>
        
        <div class="alert-card">
            <span class="badge b-critical">Critical Alert</span>
            <p><b>Outage Report (2/8/26):</b> The whole website server temporarily went down due to an unsuccessful commit during a WiFi outage. Recovery in progress.</p>
        </div>
	<div class="alert-card">
	    <span class="badge b-critcal">Critical Alert</span>
	    <p><b>New UI/UX has been updated to website</b></p>
	</div>
		

        <div class="alert-card" style="border-left-color: #f4d35e;">
            <span class="badge b-milestone">Milestone</span>
            <p><b>60th Deployment Anniversary:</b> From "update to email sending" to a full redesign. Thank you for your support!</p>
        </div>

        <div class="alert-card" style="border-left-color: #2a9d8f;">
            <span class="badge b-new">Update</span>
            <p><b>Traffic Report:</b> Website traffic dopped tor 96 visits in 30 days. We are investigating engagement strategies.</p>
        </div>
    </section>

    <section>
        <h2 style="border-bottom: 2px solid #2a9d8f; display: inline-block;">ðŸ“ Activity Log (EDT)</h2>
        <div class="log-section">
            <div class="log-item"><span class="badge b-new">Feature</span> <p>v4.0.0 added the Liquid Glass climate command center, Smart Stack prompts, Climate Buddy, Field Notes, Action Rings, and refreshed documentation.</p></div>
            <div class="log-item"><span class="badge b-fix">Bug Fix</span> <p>v3.0.1 standardized navigation, refreshed page heroes, cleaned shared CSS, and added Climate Defender.</p></div>
            <div class="log-item"><span class="badge b-fix">Bug Fix</span> <p>Major bug fixes found and fixed; recovery for corrupted contact page.</p></div>
            <div class="log-item"><span class="badge b-new">UI/UX</span> <p>Font changed to <b>Climate Crisis</b>; animations temporarily adjusted.</p></div>
            <div class="log-item"><span class="badge b-new">Pages</span> <p>New "Notice" page deployed at 9:40 PM (6/4/25).</p></div>
            <div class="log-item"><span class="badge b-fix">Navbar</span> <p>Updated Navigation Bar to prevent blocking text on various screen sizes.</p></div>
            <div class="log-item"><span class="badge b-new">Articles</span> <p>New article added at 7:34 PM (6/5/25) with updated imagery.</p></div>
            <div class="log-item"><span class="badge b-new">UI/UX</span> <p>Added modern dropdown menu for Windows 11 optimized experience.</p></div>
            <div class="log-item"><span class="badge b-fix">System</span> <p>JavaScript pop-ups removed to maximize user-friendly experience.</p></div>
            <div class="log-item"><span class="badge b-new">Feature</span> <p>New color-changing theme engine added to all pages.</p></div>
            <div class="log-item"><span class="badge b-new">UI/UX</span> <p>New updated modern website! Even more improvements.</p></div>
        </div>
    </section>

    <section class="color-panel">
        <h3>ðŸŽ¨ Customize Interface</h3>
        <div class="swatch-container">
            <button class="swatch" style="background: white;" onclick="changeColor('white')"></button>
            <button class="swatch" style="background: #a8dadc;" onclick="changeColor('#a8dadc')"></button>
            <button class="swatch" style="background: #2a9d8f;" onclick="changeColor('#2a9d8f')"></button>
            <button class="swatch" style="background: #f4d35e;" onclick="changeColor('#f4d35e')"></button>
            <button class="swatch" style="background: #e63946;" onclick="changeColor('#e63946')"></button>
            <button class="swatch" style="background: #5e548e;" onclick="changeColor('#5e548e')"></button>
            <button class="swatch" style="background: #ddd;" onclick="changeColor('')" title="Reset"></button>
        </div>
    </section>
</main>
<!-- Elfsight Accessibility | Climate Change Club Website Accessibility button -->
<div class="elfsight-app-55baa1f4-7f05-4b47-be17-ff2f8e6710c7" data-elfsight-app-lazy></div>
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

