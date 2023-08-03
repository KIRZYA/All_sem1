<?php
    session_start(); // start session
    if(session_destroy()){
        unset($_SESSION['name']); // видаляємо змінну сесії
        header("Location: /"); // redirect to index.php
    }
