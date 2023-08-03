<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $targetDir = "uploads/";
    $targetFile = $targetDir . basename($_FILES["file"]["name"]);
    $uploadOk = 1;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
        echo "Файл успішно завантажено.";
    } else {
        echo "Помилка при завантаженні файлу.";
    }
}
?>
