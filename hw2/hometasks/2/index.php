<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Домашнє завдання 2</title>
    <link rel="stylesheet" href="/assets/style.css">
    <script src="/assets/copy.min.js"></script>
</head>
<body>
    <p>Вважаємо, що це домашнє завдання успішно виконано і можна повернутись на головну сторінку:
        <a href="/">Натисни мене</a>
    </p>
    <ol>
        <li>Створити змінну <code>$page</code> та отримати значення з глобальної змінної <code>$_SERVER['REQUEST_URI']</code> та присвоїти їй значення <code>'home'</code>, якщо глобальна змінна не має значення.</li>
        <li>Створити змінну <code>$userName (string)</code> та отримати значення з глобальної змінної з <code>POST</code> запиту. Присвоїти значення <code>'Guest'</code>, якщо глобальна змінна не має значення.</li>
        <li>Створити змінну <code>$userAge (int)</code> та отримати значення з глобальної змінної з <code>POST</code> запиту. Присвоїти значення <code>18</code>, якщо глобальна змінна не має значення.</li>
        <li>Виконати перевірку змінної <code>$userAge</code> чи являється вона числом (тип даних <code>int</code>). Якщо не являється, то присвоїти значення <code>18</code>.</li>
        <li>Створити змінну <code>$message (string)</code>, та отримати значення з глобальної змінної з <code>POST</code> запиту. Присвоїти значення <code>null</code>, якщо глобальна змінна не має значення.</li>
        <li>Присвоєння дефолтних значень змінним <code>$page</code>, <code>$userName</code>, <code>$userAge</code>, <code>$message</code> виконати за допомогою тернарного оператора зливання <code>??</code>.</li>
        <li>Вивести на екран отримані змінні у вказаному місці в кінці сторінки.</li>
        <li>
            <ul>
                <li class="li-header">За допомогою функцій роботи з рядками вивести на екран:</li>
                <li>довжину повідомлення</li>
                <li>кількість слів у повідомленні</li>
                <li>перші 10 символів повідомлення</li>
                <li>останні 10 символів повідомлення</li>
                <li>повідомлення в верхньому регістрі</li>
                <li>повідомлення в нижньому регістрі</li>
            </ul>
    </ol>
    <form method="POST" action="">
        <label for="userName">Name</label>
        <input type="text" name="userName" id="userName" placeholder="User Name">
        <label for="userAge">Age</label>
        <input type="text" name="userAge" id="userAge" placeholder="User Name">
        <label for="message"></label>
        <textarea name="message" id="message" cols="30" rows="10" placeholder="Message"></textarea>
        <input type="submit" value="Submit">
    </form>
    <script src="assets/copy.min.js"></script>
</body>
</html>

