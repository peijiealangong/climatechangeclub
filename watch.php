<?php include "includes/header.php"; ?>


<header class="watch-hero" aria-labelledby="watch-title">
    <div class="watch-hero-content reveal-on-scroll">
        <span class="page-kicker">Video Hub</span>
        <h1 id="watch-title">Watch <?php echo $siteName; ?></h1>
        <p>Student-led explainers, project updates, and practical climate action stories in one focused place.</p>
        <div class="hero-btns">
            <a class="btn" href="#featured-video">Featured Video</a>
            <a class="btn-ghost" href="#video-library">Browse Library</a>
            <a class="btn-ghost" href="articles.html">Read Articles</a>
        </div>
    </div>
</header>

<main class="watch-main">
    <section id="featured-video" class="watch-feature reveal-on-scroll" aria-labelledby="featured-title">
        <div class="section-heading watch-feature-heading">
            <span class="section-kicker">Featured Lesson</span>
            <h2 id="featured-title">Featured climate video</h2>
            <p>Start with the newest <?php echo $siteName; ?> video, then keep exploring the projects and lessons connected to it.</p>
        </div>

        <div class="watch-video-panel">
            <div class="watch-frame watch-frame-feature">
                <!-- Watch page v3.2.0: replace this iframe with the main YouTube embed when needed. -->
                <iframe width="736" height="414" src="https://www.youtube.com/embed/Zd-0HJf9J7c" title="Your Home Is Draining the Planet - And You Don't Realize It - CCC" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <div class="watch-video-meta">
                <span class="badge">Featured</span>
                <p>A full-width player keeps the main video easy to watch before visitors move into the rest of the library.</p>
            </div>
        </div>

        <div class="watch-actions">
            <a class="btn-primary" href="projects.html">Explore Projects</a>
            <a class="btn-secondary" href="meetings.html">Join a Meeting</a>
        </div>
    </section>

    <section id="video-library" class="watch-library reveal-on-scroll" aria-labelledby="library-title">
        <div class="section-heading">
            <span class="section-kicker">Video Library</span>
            <h2 id="library-title">Watch by topic</h2>
            <p>Wide videos and vertical Shorts now use their own frame sizes so the full video is visible.</p>
        </div>

        <div class="watch-grid">
            <article class="watch-card">
                <div class="watch-frame compact">
                    <!-- Watch page v3.2.0 video slot: replace this iframe with a climate lesson YouTube embed. -->
                    <iframe width="736" height="414" src="https://www.youtube.com/embed/ouSiu97IQiw" title="The Climate Change Club Is Officially Open!" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <span class="badge observation">Climate Lesson</span>
                <h3>Climate Basics</h3>
                <p>Short explainers about emissions, warming, and practical action.</p>
            </article>

            <article class="watch-card vertical-video">
                <div class="watch-frame compact">
                    <!-- Watch page v3.2.0 video slot: replace this iframe with a vertical project update YouTube embed. -->
                    <iframe width="315" height="576" src="https://www.youtube.com/embed/xOUvQYdCVo4" title="This generation can still fix climate change #hopeful #donate" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <span class="badge international">Project Update</span>
                <h3>Tree Planting Progress</h3>
                <p>Campaign progress, fundraising milestones, and community event recaps.</p>
            </article>

            <article class="watch-card vertical-video">
                <div class="watch-frame compact">
                    <!-- Watch page v3.2.0 video slot: replace this iframe with a vertical club update YouTube embed. -->
                    <iframe width="315" height="576" src="https://www.youtube.com/embed/cKjiJJKQgg0" title="How to actually help the planet in 60 seconds #climatechange #tips #shorts" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <span class="badge">Club Update</span>
                <h3>Meeting Highlights</h3>
                <p>Quick recaps for returning visitors who want to catch up fast.</p>
            </article>
        </div>
    </section>

    <section class="watch-stay reveal-on-scroll" aria-labelledby="stay-title">
        <div>
            <span class="section-kicker">Keep Exploring</span>
            <h2 id="stay-title">Continue after the video</h2>
            <p>Keep going with the stories, projects, and club pages connected to each video.</p>
        </div>
        <div class="watch-link-grid">
            <a href="articles.html" class="watch-link-card">
                <i class="fas fa-newspaper" aria-hidden="true"></i>
                <span>Read climate articles</span>
            </a>
            <a href="projects.html" class="watch-link-card">
                <i class="fas fa-seedling" aria-hidden="true"></i>
                <span>Explore active projects</span>
            </a>
            <a href="contact.html" class="watch-link-card">
                <i class="fas fa-envelope" aria-hidden="true"></i>
                <span>Contact the club</span>
            </a>
        </div>
    </section>
</main>

<!-- Elfsight Accessibility | Climate Change Club Website Accessibility button -->
<div class="elfsight-app-55baa1f4-7f05-4b47-be17-ff2f8e6710c7" data-elfsight-app-lazy></div>

<footer class="site-footer">
    <p><strong><?php echo $siteName; ?></strong> | &copy; 2026 Student-Led Initiative | v4.0.0 | BETA v4.0</p>
</footer>
<!-- Elfsight Background Music | Background music -->
<script src="https://elfsightcdn.com/platform.js" async></script>
<div class="elfsight-app-f7ca7360-edf8-4dfa-831b-eb1678915d1c" data-elfsight-app-lazy></div>
</body>
</html>

