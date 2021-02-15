<?php

$name = $_POST['user_fio'];
$phone = $_POST['user_phone'];
$email = $_POST['exec_date'];
$adress_start = $_POST['adress_start'];
$adress_end = $_POST['adress_end'];
$message = $_POST['user_message'];
$token = "1509459250:AAG3ugeF9R8Cxw-d8epjhkCAcXuAC_nbsQQ";
$chat_id = "-501033284";
$arr = array(
  'ФИО Пользователя: ' => $name,
  'Телефон: ' => $phone,
  'Дата выполнения заказа: ' => $email,
  'Адрес погрузки: ' => $adress_start,
  'Адрес разгрузки: ' => $adress_end,
  'Описание груза: ' => $message
);

foreach ($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

echo $txt;

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if(!$sendToTelegram) {
  echo 'hi';
}
?>