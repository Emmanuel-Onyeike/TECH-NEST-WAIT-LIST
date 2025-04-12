<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $email = $_POST["email"];
  $waitlistNumber = $_POST["waitlistNumber"];

  $to = $email;
  $subject = "Welcome to Tech-Nest 🚀";
  $message = "
    <html>
      <head><title>Welcome to Tech-Nest</title></head>
      <body>
        <h2>You're on the list!</h2>
        <p>Thanks for joining Tech-Nest. 🎉</p>
        <p>Your waitlist number is <strong>#{$waitlistNumber}</strong></p>
      </body>
    </html>
  ";
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
  $headers .= 'From: Tech-Nest <noreply@yourdomain.com>' . "\r\n";

  if (mail($to, $subject, $message, $headers)) {
    echo json_encode(["status" => "success"]);
  } else {
    echo json_encode(["status" => "error", "message" => "Email could not be sent."]);
  }
}
?>
