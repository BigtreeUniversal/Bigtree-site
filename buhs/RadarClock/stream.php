<?php
// stream.php
header('Content-Type: audio/mpeg');
header('Cache-Control: no-cache');
header('Connection: keep-alive');

// On utilise pas de librairie complexe, on ouvre juste le flux brut
$fp = fsockopen("83.228.222.219", 8000, $errno, $errstr, 30);

if (!$fp) {
    echo "Erreur : $errstr ($errno)<br />\n";
} else {
    $out = "GET /stream HTTP/1.1\r\n";
    $out .= "Host: 83.228.222.219\r\n";
    $out .= "Connection: Close\r\n\r\n";
    fwrite($fp, $out);
    while (!feof($fp)) {
        echo fgets($fp, 1024);
        flush();
    }
    fclose($fp);
}
?>
