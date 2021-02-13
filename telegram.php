<?php

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$email = $_POST['user_email'];
$message = $_POST['user_message'];
$token = "1509459250:AAG3ugeF9R8Cxw-d8epjhkCAcXuAC_nbsQQ",
$chat_id = "-501033284",
$arr = array(
  'ФИО Пользователя: ' => $name,
  'Телефон: ' => $phone,
  'Email: ' => $email,
  'Сообщение от пользователя: ' => $message
);

foreach ($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if(!$sendToTelegram) {
  echo 'Error';
} else {
  header('location: thank-you.html');
}
?>