<?php

include "../includes/auth.php";
requireAdmin();

include "../includes/header.php";
include "../includes/database.php";
?>

<h1>👑 Admin Dashboard</h1>

<p>
Welcome back,
<strong><?php echo htmlspecialchars($_SESSION["username"]); ?></strong>!
</p>

<div class="admin-grid">

    <a href="users.php" class="admin-card">
        <h2>👥 Users</h2>
        <p>Manage member accounts</p>
    </a>

    <a href="orders.php" class="admin-card">
        <h2>📦 Orders</h2>
        <p>Track merchandise orders</p>
    </a>

    <a href="articles.php" class="admin-card">
        <h2>📰 Articles</h2>
        <p>Create and edit news</p>
    </a>

    <a href="donations.php" class="admin-card">
        <h2>🌳 Donations</h2>
        <p>Monitor fundraising</p>
    </a>

    <a href="messages.php" class="admin-card">
        <h2>📨 Messages</h2>
        <p>View contact requests</p>
    </a>

    <a href="settings.php" class="admin-card">
        <h2>⚙️ Settings</h2>
        <p>Website configuration</p>
    </a>

</div>