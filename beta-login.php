<?php include "includes/config.php"; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#0f3d38">
  <link rel="canonical" href="https://climatechangeclub.pages.dev/beta-login.html">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Beta Login | <?php echo $siteName; ?>">
  <meta property="og:description" content="Learn more about <?php echo $siteName; ?> student-led climate action, projects, videos, and resources.">
  <meta property="og:url" content="https://climatechangeclub.pages.dev/beta-login.html">
  <meta property="og:image" content="https://climatechangeclub.pages.dev/images/stop-climate-change-background.webp">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Beta Login | <?php echo $siteName; ?>">
  <meta name="twitter:description" content="Learn more about <?php echo $siteName; ?> student-led climate action, projects, videos, and resources.">
  <meta name="twitter:image" content="https://climatechangeclub.pages.dev/images/stop-climate-change-background.webp">


    <title>Beta Login | <?php echo $siteName; ?></title>
    <link rel="stylesheet" href="style.css">
      <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap" rel="stylesheet">
</head>
<body>
    <main class="report-container" style="max-width: 400px; margin-top: 100px;">
        <h2 style="text-align: center;">Beta Access</h2>
        <p style="text-align: center; margin-bottom: 20px;">Please sign in to continue.</p>
        
        <form id="betaLoginForm" class="beta-form">
            <div class="form-group">
                <label for="betaUser">Username:</label>
                <input type="text" id="betaUser" required placeholder="Enter username">
            </div>
            <div class="form-group">
                <label for="betaPass">Password:</label>
                <input type="password" id="betaPass" required placeholder="Enter password">
            </div>
            <div class="form-group" style="display: flex; align-items: center; gap: 10px;">
                <input type="checkbox" id="rememberMe" style="width: auto;">
                <label for="rememberMe" style="margin: 0;">Remember Me</label>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
                <button type="submit" id="loginBtn" class="btn-game" style="width: 100%;">Sign In 🔐</button>
                <div style="text-align: center; font-size: 0.8rem; color: #666;">— OR —</div>
                <a href="beta-signup.html" class="btn-primary" style="text-align: center; text-decoration: none; background-color: var(--action-teal);">Create Account 🚀</a>
            </div>
            <p id="loginError" style="display:none; color: red; text-align:center; margin-top:15px;">Incorrect username or password.</p>
        </form>
    </main>

    <script>
        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzK_c0FmKiHqWAAr9kE231Qj0nxZgbcu-s4aUcrufzuoL5PrRaFbIEt-8VNunjgbf4/exec";

        document.getElementById('betaLoginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = document.getElementById('loginBtn');
            const err = document.getElementById('loginError');
            
            btn.innerHTML = "Checking... ⏳";
            btn.disabled = true;
            err.style.display = "none";

            fetch(SCRIPT_URL, {
                method: "POST",
                body: JSON.stringify({
                    action: "login",
                    username: document.getElementById('betaUser').value,
                    password: document.getElementById('betaPass').value
                })
            })
            .then(res => res.json())
            .then(response => {
                if (response.result === "success") {
                    sessionStorage.setItem('betaLoggedIn', 'true');
                    if (document.getElementById('rememberMe').checked) {
                        localStorage.setItem('betaLoggedIn', 'true');
                    }
                    window.location.replace("beta-test.html");
                } else {
                    err.style.display = "block";
                    btn.innerHTML = "Sign In 🔐";
                    btn.disabled = false;
                }
            })
            .catch(() => {
                alert("Connection error.");
                btn.innerHTML = "Sign In 🔐";
                btn.disabled = false;
            });
        });
    </script>
<!-- Elfsight Background Music | Background music -->
<script src="https://elfsightcdn.com/platform.js" async></script>
<div class="elfsight-app-f7ca7360-edf8-4dfa-831b-eb1678915d1c" data-elfsight-app-lazy></div>
</body>
</html>