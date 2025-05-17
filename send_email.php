<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Require PHPMailer files from PHPMailer-master directory
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';
require 'config.php';

$mail = new PHPMailer(true);

try {
    // Debugging (Set to 2 for troubleshooting, 0 for production)
    $mail->SMTPDebug = 2; 
    $mail->Debugoutput = 'html';

    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Gmail SMTP
    $mail->SMTPAuth = true;
    $mail->Username = 'gongpeijie620@gmail.com'; // Your email
    $mail->Password = SMTP_PASSWORD; // Securely stored in config.php
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // TLS encryption
    $mail->Port = 587; // Use 465 for SSL if needed

    // Sender Information
    $mail->setFrom('gongpeijie620@gmail.com', 'Climate Change Club');

    // Capture recipient info safely
    $recipientEmail = $_POST["email"] ?? "test@example.com";
    $recipientName = htmlspecialchars($_POST["name"] ?? "Supporter");

    $mail->addAddress($recipientEmail);

    // Email Content
    $mail->Subject = "Thank You for Contacting Us!";
    $mail->Body = "Hello $recipientName,\n\nThanks for reaching out. We'll get back to you soon!";

    // Send Email & Handle Errors
    if ($mail->send()) {
        echo "✅ Message sent successfully to $recipientEmail!";
    } else {
        echo "❌ Error sending email: " . $mail->ErrorInfo;
    }

} catch (Exception $e) {
    echo "❌ PHPMailer Exception: " . $e->getMessage();
}
?>