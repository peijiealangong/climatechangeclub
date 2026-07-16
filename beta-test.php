<?php include "includes/header.php"; ?>

<style>
        :root { --clr-dark: #333; --clr-light: #fff; }
        .dark-mode { background-color: var(--clr-dark); color: var(--clr-light); }
        .toggle-container { cursor: pointer; display: inline-block; margin-top: 10px; }
        .moon-icon { display: none; }
        .dark-mode .sun-icon { display: none; }
        .dark-mode .moon-icon { display: inline-block; }
    </style>
<header class="page-hero page-hero-beta">
    <div class="page-hero-content reveal-on-scroll">
        <span class="page-kicker">Beta Lab</span>
        <h1>Beta Testing Lab</h1>
        <p>Try upcoming features before they go live and help improve the platform.</p>
    </div>
</header>
<section class="intro-grid">
        <div class="intro-card">
            <i class="fas fa-flask fa-2x" style="color: var(--action-teal);"></i>
            <h3>Dark Mode Toggle</h3>
            <p>Testing a new system-wide theme. Click the icon above to switch.</p>
            <p><strong>UPDATE: THERE IS BE A SURVEY BELOW FOR YOU TO VOTE IF WE SHOULD RELEASE THIS TO GENERAL PUBLIC</strong></p>
<!-- Elfsight Poll | Untitled Poll -->
<div class="elfsight-app-cc687bf5-0a29-4983-bed1-9fb3e9e286c8" data-elfsight-app-lazy></div>
<p><strong>THIS IS THE OLD SURVEY. PLEASE DO NOT USE THIS SURVEY IF THE SURVEY ABOVE IS WORKING.</strong></p>
	    <iframe width="640px" height="480px" src="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAWybSlNUQ0JKRkJIWVUyTFhWWDgwWlE4RDEzNjhHWC4u&embed=true" frameborder="0" marginwidth="0" marginheight="0" style="border: none; max-width:100%; max-height:100vh" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen> </iframe>
        </div>
<div class="intro-card">
    <i class="fas fa-flask fa-2x" style="color: var(--action-teal);"></i>
    <h3>New UI Testing v3.0</h3>
    <p>Preview an experimental, animationâ€‘heavy redesign of the <?php echo $siteName; ?> pages.</p>
    <button class="btn-primary" onclick="window.location.href='beta-ui-v2.html'">
        Open UI Preview 3.0
    </button>
</div>
<div class="intro-card">
    <i class="fas fa-flask fa-2x" style="color: var(--action-teal);"></i>
    <h3>Notification bar time ðŸ””</h3>
    <p>Preview an experimental, notification bar</p>
    <p><strong>The notification bar is in the top right cornor of this screen.</strong></p>
</div>
<div class="intro-card">
    <i class="fas fa-flask fa-2x" style="color: var(--action-teal);"></i>
    <h3>Community chat ðŸ’¬</h3>
    <p>Preview an experimental, community chat</p>
    <p><strong>Click the link to view the community chat</strong></p>
<a href="https://climatechangeclubgroup.discourse.group/" class="button-link">Visit the Community Chat</a>
</div>

    </section>

<!-- Disqus -->
<p>Did you like it? <strong>Thank you for your support!</strong></p>
<div id="disqus_thread"></div>
<script>
    /**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
    /*
    var disqus_config = function () {
    this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    */
    (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://climatechangeclub.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
<script id="dsq-count-scr" src="//climatechangeclub.disqus.com/count.js" async></script>
</p>
<!-- Elfsight Popup | Beta Member Popup -->
<div class="elfsight-app-c78f980e-6396-4e3f-9ccb-92de878e304a" data-elfsight-app-lazy></div>
<!-- Elfsight Accessibility | Climate Change Club Website Accessibility button -->
<div class="elfsight-app-55baa1f4-7f05-4b47-be17-ff2f8e6710c7" data-elfsight-app-lazy></div>
    <script>
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        // Apply saved theme on load
        if (localStorage.getItem('theme') === 'dark-mode') {
            body.classList.add('dark-mode');
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark-mode' : '');
        });
    </script>
<script>
var beamer_config = {
  product_id : 'hgibdeWX83576', //DO NOT CHANGE: This is your product code on Beamer
  user_id: "user's unique id", // A unique ID to identify the user
};
</script>
<script type="text/javascript" src="https://app.getbeamer.com/js/beamer-embed.js" defer="defer"></script>
<!-- Elfsight Background Music | Background music -->
<script src="https://elfsightcdn.com/platform.js" async></script>
<div class="elfsight-app-f7ca7360-edf8-4dfa-831b-eb1678915d1c" data-elfsight-app-lazy></div>
</body>
</html>
