<?php

include('config.php');

$url = $_GET["url"];
$variable = $_GET["variable"];

$cmd = $phantom_path . 'phantomjs ' . $base_path . 'js/phantom.js ' . $url . ' ' . $variable;
$ret = exec($cmd);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
print_r($ret);

?>
