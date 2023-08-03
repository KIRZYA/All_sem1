<?php
session_start();

$cookie_name = "login";
$cookie_value = $_SESSION['name'] ?? "";

if ($cookie_value === "") {
    setcookie($cookie_name, "", time() - 3600);
} else {
    setcookie($cookie_name, $cookie_value, time() + 3600, "/");
}

if (isset($_SESSION['name'])) {
    $files = scandir("htmlParts");
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            include_once "htmlParts/$file";
        }
    }
} else {
    include_once 'htmlParts/auth.php';
}
?>
