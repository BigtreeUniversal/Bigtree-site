<?php
// stream.php
// Ce script sert de relais pour transformer le flux HTTP en HTTPS
header('Content-Type: audio/mpeg');
$url = "http://83.228.222.219:8000/stream";
$handle = fopen($url, "rb");

if ($handle) {
    while (!feof($handle)) {
        echo fread($handle, 8192);
        flush();
    }
    fclose($handle);
}
?>
