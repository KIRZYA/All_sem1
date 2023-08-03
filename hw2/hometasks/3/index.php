<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Домашнє завдання 3</title>
    <link rel="stylesheet" href="/assets/style.css">
</head>
<body>
    <p>Вважаємо, що це домашнє завдання не виконано і можна повернутись на головну сторінку лише коли його виконаєш:
        <a href="/">Не натискай мене</a>
    </p>
    <ol>
        <li>
            Опрацювати лекційні матеріали (тема 3) в класрум.
            <hr>
        </li>
        <li>
            Опрацювати самостійно тему "Регулярні вирази"
            <a href="https://w3schoolsua.github.io/php/php_regex.html#gsc.tab=0">(посилання)</a><br>
            А також:
            <ul>
                <li>Відвідати сайт <a href="https://regex101.com">regex101.com</a></li>
                <li>Спробувати створити патерни для пошуку в тексті смайлів <b>:) ;) :D ;) :(</b></li>
                <li>Спробувати створити патерни для пошуку в тексті великих літер</li>
                <li>Спробувати створити патерни для пошуку в тексті цифр</li>
                <li>Важке завдання на додаткові бали: замінити в наступному тексті
                    усі скорочення (3 літери) <b>ABS></b> &rightarrow; <b>&lt;b&gt;ABS&lt;\b&gt;</b>
                    <blockquote>
                        <em>
                            PHP отримав змішані відгуки через відсутність власної підтримки Unicode на рівні основної мови. У 2005 році був започаткований проєкт, очолюваний Андрієм Змієвським, для залучення рідної підтримки Unicode на PHP, шляхом вбудовування бібліотеки «Міжнародні компоненти для Unicode» (ICU) та вбудованих текстових рядків як UTF-16. Оскільки це призведе до серйозних змін як до внутрішньої частини мови, так і до коду користувача, планувалося випустити його як версію 6.0 мови разом з іншими основними функціями, які розвиваються.
                        </em>
                    </blockquote>
                </li>
            </ul>
            <hr>
        </li>
        <li>
            Опрацювати самостійно тему "Масиви" за посиланням:
            <a href="https://w3schoolsua.github.io/php/php_arrays.html#gsc.tab=0">Функції</a>
            <ul>
                <li>Створити двомірний індексований масив та показати приклади отримання доступу до окремих елементів</li>
                <li>Створити двомірний асоціативний масив та показати приклади отримання доступу до окремих елементів</li>
                <li>Відсортувати індексований масив за зростанням</li>
                <li>Відсортувати асоціативний масив за зменшенням значення</li>
            </ul>
        </li>
    </ol>
    <?php
        echo "<p>Привіт, я твій РНР скрипт! Завдання виконуй всередині тегів &lt;?php ... ?&gt;</p>";
// 1
$pattern1 = '/:\)/';
$pattern2 = '/;\)/';
$pattern3 = '/:D/';
$pattern4 = '/:\(/';

//2
$patternUpperCase = '/[A-Z]/';

//3
$patternDigits = '/\d/';

//4
$text = "This is a sample text with some ABS and XYZ abbreviations.";
$patternAbbreviation = '&lt;b&gt;ABS&lt;b&gt;';
$replacement = '<b>$1</b>';
$replacedText = preg_replace($patternAbbreviation, $replacement, $text);

//1
$indexedArray = array(
    array('A1', 'A2', 'A3'),
    array('B1', 'B2', 'B3'),
    array('C1', 'C2', 'C3')
);

$associativeArray = array(
    'row1' => array('A1', 'A2', 'A3'),
    'row2' => array('B1', 'B2', 'B3'),
    'row3' => array('C1', 'C2', 'C3')
);

//2
$element11 = $indexedArray[0][0];
$element23 = $associativeArray['row2'][2];

//3
sort($indexedArray);

//4
arsort($associativeArray);

// res
echo "<p>Паттерны для поиска смайлов:</p>";
echo "<ul>";
echo "<li>$pattern1</li>";
echo "<li>$pattern2</li>";
echo "<li>$pattern3</li>";
echo "<li>$pattern4</li>";
echo "</ul>";

echo "<p>Великие буквы:</p>";
echo "<p>$patternUpperCase</p>";

echo "<p>цифрa:</p>";
echo "<p>$patternDigits</p>";

echo "<p>Сокрашения:</p>";
echo "<p>$replacedText</p>";

echo "<p>2Д масса:</p>";
echo "<p>Элемент [0][0]: $element11</p>";
echo "<p>Элемент ['row2'][2]: $element23</p>";

echo "<p>Отсортированный индексированный массив:</p>";
echo "<pre>";
print_r($indexedArray);
echo "</pre>";
    ?>
</body>
</html>

