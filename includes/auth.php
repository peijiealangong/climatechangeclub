<?php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function requireLogin()
{
    if (!isset($_SESSION["user_id"])) {
        header("Location: /ccc-website/login.php");
        exit;
    }
}

function requireAdmin()
{
    requireLogin();

    if ($_SESSION["role"] !== "admin") {
        http_response_code(403);
        die("Access denied.");
    }
}