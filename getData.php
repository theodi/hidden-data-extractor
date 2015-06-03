<?php

include('config.php');

$url = $_GET["url"];
$variable = $_GET["variable"];

$cmd = $phantom_path . 'phantomjs ' . $base_path . 'js/phantom.js ' . $url . ' ' . $variable;
$ret = exec($cmd);

header('Content-Type: application/json');
print_r($ret);

?>
