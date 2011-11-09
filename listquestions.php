<?php
header("Content-Type: text/html; charset=utf-8");
require_once("class_loader.php");
require_once("config/db_config.php");

echo "<pre>";
var_dump(Question::fetch($_GET["type"]));
echo "</pre>";
