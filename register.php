<?php

include "includes/header.php";
include "includes/database.php";


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];


    // Encrypt password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);


    $sql = "INSERT INTO users (username, email, password)
            VALUES (?, ?, ?)";


    $stmt = $conn->prepare($sql);


    $stmt->bind_param(
        "sss",
        $username,
        $email,
        $hashedPassword
    );


    if ($stmt->execute()) {

        echo "<p>✅ Account created successfully!</p>";

    } else {

        echo "<p>❌ Error: " . $conn->error . "</p>";

    }


}

?>


<h1>Create Account 🌱</h1>


<form method="POST">

    <input
        type="text"
        name="username"
        placeholder="Username"
        required
    >

    <br><br>

    <input
        type="email"
        name="email"
        placeholder="Email"
        required
    >

    <br><br>


    <input
        type="password"
        name="password"
        placeholder="Password"
        required
    >

    <br><br>


    <button type="submit">
        Register
    </button>

</form>