
<?php
include 'homeTask2.php';
?>

    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>HomeTask 2</title>
        <link rel="stylesheet" href="style.min.css">
    </head>
    <body>
    <form method="POST" action="">
        <label for="userName">Name</label>
        <input type="text" name="userName" id="userName" placeholder="User Name">
        <label for="userAge">Age</label>
        <input type="text" name="userAge" id="userAge" placeholder="User Name">
        <label for="message"></label>
        <textarea name="message" id="message" cols="30" rows="10" placeholder="Message"></textarea>
        <input type="submit" value="Submit">
    </form>
    <script src="copy.min.js"></script>
    <?php

    $page = $_SERVER['REQUEST_URI'] ?? 'home';
    $userName = $_POST['userName'] ?? 'Guest';
    $userAge = $_POST['userAge'] ?? 18;
    $userAge = is_numeric($userAge) ? intval($userAge) : 18;
    $message = $_POST['message'] ?? null;


    echo "<p>Page: $page</p>";
    echo "<p>User Name: $userName</p>";
    echo "<p>User Age: $userAge</p>";
    echo "<p>Message: $message</p>";


    $messageLength = strlen($message);
    $wordCount = str_word_count($message);
    $firstTenChars = substr($message, 0, 10); // 10 симв перв
    $lastTenChars = substr($message, -10); // 10 символов посл
    $uppercaseMessage = strtoupper($message);
    $lowercaseMessage = strtolower($message);


    echo "<p>Message Length: $messageLength</p>";
    echo "<p>Word Count: $wordCount</p>";
    echo "<p>First Ten Characters: $firstTenChars</p>";
    echo "<p>Last Ten Characters: $lastTenChars</p>";
    echo "<p>Uppercase Message: $uppercaseMessage</p>";
    echo "<p>Lowercase Message: $lowercaseMessage</p>";
    ?>
    </body>
    </html>