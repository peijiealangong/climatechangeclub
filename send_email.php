<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer and config file
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    try {
        // Initialize PHPMailer
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = SMTP_HOST; // Using Outlook SMTP
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;
        $mail->SMTPSecure = 'tls';
        $mail->Port = SMTP_PORT;

        // Set sender & recipient details
        $mail->setFrom(SMTP_USERNAME, 'Climate Change Club');
        $mail->addAddress('gongpeijie620@outlook.com'); // Your Outlook email

        // Format email with HTML styling
        $mail->Subject = "New Contact Form Submission from $name";
        $mail->isHTML(true);
        $mail->Body = "
            <h2>New Contact Request</h2>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Message:</strong><br>$message</p>
        ";

        // Send email
        if ($mail->send()) {
            echo "<p>Message sent successfully! We'll get back to you soon.</p>";
        } else {
            echo "<p>Error sending message: " . $mail->ErrorInfo . "</p>";
        }

    } catch (Exception $e) {
        echo "<p>Mail error: {$e->getMessage()}</p>";
    }
} else {
    echo "<p>Invalid request.</p>";
}
?>