<?php
function readUsers() {
    $file = 'jsoc.json';
    if (!file_exists($file)) {
        return [];
    }
    $data = file_get_contents($file);
    return json_decode($data, true);
}

function saveUsers($users) {
    $file = 'jsoc.json';
    $data = json_encode($users, JSON_PRETTY_PRINT);
    file_put_contents($file, $data);
}

$users = readUsers();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $pp = $_POST['pp'];

    $userExists = false;
    foreach ($users as $user) {
        if ($user['name'] === $name) {
            $userExists = true;
            $dobTimestamp = strtotime($user['pp']);
            $nowTimestamp = time();
            $age = floor(($nowTimestamp - $dobTimestamp) / (365 * 24 * 60 * 60));
            $nextBirthday = date('Y-m-d', strtotime('+1 year', $dobTimestamp));
            $daysToBirthday = floor((strtotime($nextBirthday) - $nowTimestamp) / (24 * 60 * 60));
            echo "Такий користувач вже є. Вік: $age років. Днів до дня народження: $daysToBirthday.";
            break;
        }
    }

    if (!$userExists) {
        $user = ['name' => $name, 'pp' => $pp];
        array_push($users, $user);
        saveUsers($users);
        echo "Користувача додано.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Додати користувача</title>
</head>
<body>
    <h1>Додати користувача</h1>
    <form method="POST">
        <label for="name">Ім'я користувача:</label>
        <input type="text" id="name" name="name" ><br><br>
        <label for="pp">Дата народження:</label>
        <input type="date" id="pp" name="pp" ><br><br>
        <input type="submit" value="Додати користувача">
    </form>
</body>
</html>