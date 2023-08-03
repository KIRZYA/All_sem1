<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];

    // Перевірка логіну
    if ($username === "admin") {
        $_SESSION['name'] = $username;
        header("Location: index.php");
        exit();
    } else {
        echo "Невірний логін";
    }
}
?>