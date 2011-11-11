<?php
header('Content-Type: text/html; charset=utf-8');
//setlocale(LC_CTYPE, "en.UTF16");
setlocale(LC_ALL, 'en_US.UTF-8');

$csv = (file_get_contents("names.csv"));
$csv = str_getcsv($csv);

for ($i = 0; $i < count($csv); $i += 4) {
	$name = $csv[$i] . " " . $csv[$i + 1];
	$name = trim($name);
	if (!empty($name)) {
		echo $name . "<br />";
	}
}
