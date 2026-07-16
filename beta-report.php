<?php include "includes/header.php"; ?>

<header class="page-hero page-hero-beta">
    <div class="page-hero-content reveal-on-scroll">
        <span class="page-kicker">Feedback</span>
        <h1>Report a Problem</h1>
        <p>Send bug reports and suggestions for beta features.</p>
    </div>
</header>
<main class="report-container">
        <h2>Submit Feedback</h2>
        <form id="betaForm" class="beta-form" action="https://formspree.io/f/xqeyoyvg" method="POST">
            <div class="form-group">
                <label for="userEmail">Your Email:</label>
                <input type="email" name="email" id="userEmail" required>
            </div>
            <div class="form-group">
                <label for="feedbackType">Category:</label>
                <select name="Category" id="feedbackType" required>
                    <option value="bug">ðŸ› Bug Report</option>
                    <option value="suggest">ðŸ’¡ Feature Suggestion</option>
                </select>
            </div>
            <div class="form-group">
                <label for="feedbackDesc">Your Message:</label>
                <textarea name="message" id="feedbackDesc" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn-game">Send Report ðŸš€</button>
        </form>
    </main>
<!-- Elfsight Accessibility | Climate Change Club Website Accessibility button -->
<div class="elfsight-app-55baa1f4-7f05-4b47-be17-ff2f8e6710c7" data-elfsight-app-lazy></div>
<!-- Elfsight Popup | Beta Member Popup -->
<div class="elfsight-app-c78f980e-6396-4e3f-9ccb-92de878e304a" data-elfsight-app-lazy></div>
<!-- Elfsight Background Music | Background music -->
<script src="https://elfsightcdn.com/platform.js" async></script>
<div class="elfsight-app-f7ca7360-edf8-4dfa-831b-eb1678915d1c" data-elfsight-app-lazy></div>
</body>
</html>
