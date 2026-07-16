<?php

session_start();

include "includes/header.php";


if (!isset($_SESSION["user_id"])) {

    echo "<p>You must be logged in.</p>";
    exit;

}

?>


<h1>
Welcome, <?php echo $_SESSION["username"]; ?>! 🌱
</h1>


<p>
This is your CCC profile page.
</p>