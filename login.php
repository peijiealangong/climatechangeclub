<?php

session_start();

include "includes/header.php";
include "includes/database.php";


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = $_POST["email"];
    $password = $_POST["password"];


    $sql = "SELECT * FROM users WHERE email = ?";


    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        "s",
        $email
    );


    $stmt->execute();


    $result = $stmt->get_result();


    if ($result->num_rows == 1) {

        $user = $result->fetch_assoc();


        if (password_verify($password, $user["password"])) {


            $_SESSION["user_id"] = $user["id"];
            $_SESSION["username"] = $user["username"];
            $_SESSION["role"] = $user["role"];


            echo "<p>✅ Login successful! Welcome " . $user["username"] . "</p>";


        } else {

            echo "<p>❌ Incorrect password</p>";

        }


    } else {

        echo "<p>❌ Account not found</p>";

    }

}

?>


<h1>Login 🔐</h1>


<form method="POST">


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
Login
</button>


</form>