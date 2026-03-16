<?php
// Désactiver la limite de temps pour que le flux ne coupe pas
set_time_limit(0);

$url = "http://83.228.222.219:8000/stream";

header('Content-Type: audio/mpeg');
header('Cache-Control: no-cache');

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, false); // Envoie directement au navigateur
curl_setopt($ch, CURLOPT_WRITEFUNCTION, function($ch, $data) {
    echo $data;
    return strlen($data);
});

curl_exec($ch);
curl_close($ch);
?>
