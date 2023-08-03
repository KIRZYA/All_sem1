<!-- Тут форма завантаження файлу -->
<h3>Сторінка завантаження файлу (доступна для авторизованих користувачів</h3>

<form action = "../functions/upload.php"
      method="POST"
      enctype="multipart/form-data">
    <input type="file" name="file">
    <button type="submit" name="submit">Upload</button>
</form>
<hr>
<p>Список файлів в директорії <b>/uploads</b></p>

<?php
    $path = $_SERVER["DOCUMENT_ROOT"]."/uploads/";
    $filesList = scandir($path); // просканували папку
    $filesList = array_filter($filesList, fn ($file) =>  $file != "." && $file != ".."); // видалили зайві елементи
    if(!empty($filesList)) { // якщо директорія не порожня, то виводимо список файлів
        foreach ($filesList as $file) {
            echo "<a href='/uploads/$file'>$file</a><br>";
        }
    }else { // якщо порожня, то виводимо повідомлення>
        echo "Папка порожня";
    }
?>

<hr>

<a href="../functions/logout.php">Exit - разлогінитись</a>

