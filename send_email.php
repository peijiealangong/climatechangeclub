<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'config.php';

$mail = new PHPMailer(true);

try {
    // Enable debugging for troubleshooting (Set to 0 for production)
    $mail->SMTPDebug = 0; 
    $mail->Debugoutput = 'html';

    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Gmail SMTP
    $mail->SMTPAuth = true;
    $mail->Username = 'gongpeijie620@gmail.com'; // Your email
    $mail->Password = 'esee uhci wiuq sdxz'; // Use App Password, NOT your Gmail password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // TLS encryption
    $mail->Port = 587; // TLS uses 587, SSL uses 465

    // Sender Information
    $mail->setFrom('gongpeijie620@gmail.com', 'Climate Change Club');

    // Capture recipient info from POST, with fallbacks for debugging
    $recipientEmail = isset($_POST["email"]) ? $_POST["email"] : "test@example.com";
    $recipientName = isset($_POST["name"]) ? $_POST["name"] : "Supporter";

    $mail->addAddress($recipientEmail);

    // Email Content
    $mail->Subject = "Thank You for Contacting Us!";
    $mail->Body = "Hello " . htmlspecialchars($recipientName) . ",\n\nThanks for reaching out. We'll get back to you soon!";

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