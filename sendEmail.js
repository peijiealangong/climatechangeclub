const nodemailer = require("nodemailer"); 

// Validate user input (Ensure a valid email is provided)
if (!process.argv[2] || !process.argv[2].includes("@")) {
    console.log("Error: Please enter a valid email address.");
    process.exit(1);
}

const recipientEmail = process.argv[2]; // Get user-inputted email from command line

// Create a transporter (Configuring Gmail for sending emails)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "gongpeijie620@gmail.com",
        pass: "vmrf xsoz vvep upvb" // Replace with your actual **App Password**
    }
});

// Define email details
const mailOptions = {
    from: "gongpeijie620@gmail.com",
    to: recipientEmail,
    subject: "Welcome to the Climate Change Club!",
    text: `Hi there! Thanks for joining our Climate Change Club. 
           We're excited to collaborate with you. Let's make a difference!`
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error("Error sending email:", error);
    } else {
        console.log(`✅ Email sent successfully to ${recipientEmail}: ${info.response}`);
    }
});