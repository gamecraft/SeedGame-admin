<?php

/**
 * Configuration for auto-loading classes
 * CLASS_FOLDERS points is an array of class-containing folders that are relative to the root directory!!
 * CLASS_EXTENSION is the file extension of the PHP file where the class resides
 */
$configuration["CLASS_FOLDERS"] = array("classes");
$configuration["CLASS_EXTENSION"] = "php";

/**
 * ADAPT_FUNCTION points to the function name, that is mapped to every class name
 * for example class Database has file database.php
 * If other behaviour is desired, write a function and change the ADAPT_FUNCTION parameter value
 */
$configuration["ADAPT_FUNCTION"] = "seedGame_adaptClassName";

function seedGame_adaptClassName($className) {
	$className = strtolower($className);
	$className = $className . ".class";
	return $className;
}

function seedGame_autoload($className) {
	global $configuration;

	// adapt the class name to the file name
	$className = call_user_func($configuration["ADAPT_FUNCTION"], $className);
	foreach ($configuration["CLASS_FOLDERS"] as $classFolder) {
		$path = dirname(__FILE__) . DIRECTORY_SEPARATOR . $classFolder . DIRECTORY_SEPARATOR . $className . "." . $configuration["CLASS_EXTENSION"];
		if (file_exists($path)) {
			
			require_once ($path);
			break;
		}
	}
}

/* Register a class-loading function because of possible collisions with Smarty's __autoload*/
spl_autoload_register("seedGame_autoload");
