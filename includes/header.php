<?php include "config.php"; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <meta name="description" content="Join Climate Change Club for a redesigned student climate action hub with project updates, action rings, smart climate prompts, videos, games, and practical ways to help." />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="theme-color" content="#0f3d38" />

    <title>Climate Change Club | Student-Led Climate Action</title>

    <!-- Styles -->
    <link rel="stylesheet" href="/ccc-website/style.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

    <!-- JavaScript -->
    <script src="/ccc-website/javascript.js" defer></script>

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-68D6N5XQ6D"></script>

    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', 'G-68D6N5XQ6D');
    </script>

</head>

<body>

<header class="site-header">

    <nav class="site-nav" aria-label="Main Navigation">

        <a class="nav-logo" href="/ccc-website/index.php" data-nav-section="home">
            <span class="brand-mark" aria-hidden="true">CCC</span>
            <span>Climate Change Club</span>
        </a>


        <button class="nav-toggle" type="button" aria-controls="primary-navigation" aria-expanded="false" aria-label="Open main menu">

            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>

        </button>


        <ul id="primary-navigation" class="nav-list" data-visible="false">


            <li>
                <a href="/ccc-website/index.php" data-nav-section="home">
                    Home
                </a>
            </li>


            <li class="dropdown">

                <button class="nav-menu-button" type="button" aria-expanded="false" data-nav-section="club">
                    Club
                    <span class="nav-caret" aria-hidden="true"></span>
                </button>


                <ul class="submenu" aria-label="Club pages">

                    <li><a href="/ccc-website/about.php">About</a></li>
                    <li><a href="/ccc-website/projects.php">Projects</a></li>
                    <li><a href="/ccc-website/meetings.php">Meetings</a></li>

                </ul>

            </li>



            <li class="dropdown">

                <button class="nav-menu-button" type="button" aria-expanded="false" data-nav-section="resources">

                    Resources
                    <span class="nav-caret" aria-hidden="true"></span>

                </button>


                <ul class="submenu" aria-label="Resources pages">

                    <li><a href="/ccc-website/notices.php">Notices</a></li>
                    <li><a href="/ccc-website/articles.php">Articles</a></li>
                    <li><a href="/ccc-website/climatechronicle.php">The Climate Chronicle</a></li>
                    <li><a href="/ccc-website/download.php">Download App</a></li>

                </ul>

            </li>



            <li>
                <a href="/ccc-website/watch.php" data-nav-section="watch">
                    Watch
                </a>
            </li>


            <li>
                <button class="nav-donate-button" id="donateButton" type="button">
                    Donate
                </button>
            </li>


            <li>
                <a href="/ccc-website/contact.php" data-nav-section="contact">
                    Contact
                </a>
            </li>



            <li class="dropdown">

                <button class="nav-menu-button" type="button" id="betaNavBtn" aria-expanded="false" data-nav-section="beta">

                    Beta Features

                    <span class="notification-dot" id="updateDot" aria-hidden="true"></span>

                    <span class="nav-caret" aria-hidden="true"></span>

                </button>


                <ul class="submenu" aria-label="Beta pages">

                    <li><a href="/ccc-website/beta-test.php">Test Lab</a></li>

                    <li>
                        <a href="/ccc-website/beta-docs.php">
                            Documentation (No Login Required)
                        </a>
                    </li>

                    <li>
                        <a href="/ccc-website/beta-report.php">
                            Report a Problem
                        </a>
                    </li>

                    <li class="beta-logout-item">

                        <button class="nav-logout" type="button" data-beta-logout>
                            Logout
                        </button>

                    </li>

                </ul>

            </li>


        </ul>

    </nav>

</header>