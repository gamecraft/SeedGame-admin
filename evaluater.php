<?php
require_once("class_loader.php");
require_once("config/db_config.php");


define("CLOUD_RIGHT_ANSWERS", "abcdbcad");
define("SOFTWARE_RIGHT_ANSWERS", "bacbacda");
define("ENTREPRENEUR_RIGHT_ANSWERS", "dadaaccb");

define("CLOUD", "Cloud");
define("ENTREPRENEUR", "Entrepreneur");
define("SOFTWARE", "Software");

// parse the POSTed JSON


$payload = $_POST["data"];
file_put_contents("payload.txt", var_export($payload, true));
$cloudAnswers = Question::fetch(CLOUD);
$sofrwareAnswers = Question::fetch(SOFTWARE);
$entrepreneurAnswers = Question::fetch(ENTREPRENEUR);

function getQuestionByType($type) {
	global $cloudAnswers;
	global $sofrwareAnswers;
	global $entrepreneurAnswers;
			
	switch($type) {
		case CLOUD :
			return $cloudAnswers;
			break;
		case SOFTWARE :
			return $sofrwareAnswers;
			break;
		case ENTREPRENEUR :
			return $entrepreneurAnswers;
			break;
		default :
			return false;
			break;
	}
}

function score($quiz /*array of Questions*/, $givenAnswers /*string*/) {
	$score = 0;
	$givenAnswersIndex = 0;
	foreach($quiz as $question) {
		if($question->isCorrect($givenAnswers[$givenAnswersIndex++])) {
			$score ++;
		}	
	}
	return $score;
}

function determineBonus($types) {
	$types = array_unique($types);
	
	if(count($types) === 0) {
		return 0;
	}
	
	$bonuses = array(0,10,30); 
	return $bonuses[count($types) - 1];
}

function assert_correct_answers() {
	global $cloudAnswers;
	global $sofrwareAnswers;
	global $entrepreneurAnswers;
	
	$score = score($cloudAnswers, CLOUD_RIGHT_ANSWERS);
	if($score === 8) {
		//echo "Scoring cloud test is OK<br />";
	} else {
		die("<strong style='color:red'>Scoring cloud test FAILED</strong>");
	}
	
	$score = score($sofrwareAnswers, SOFTWARE_RIGHT_ANSWERS);
	if($score === 8) {
		//echo "Scoring Software test is OK<br />";
	} else {
		die("<strong style='color:red'>Scoring Software test FAILED</strong>");
	}	
	
	$score = score($entrepreneurAnswers, ENTREPRENEUR_RIGHT_ANSWERS);
	if($score === 8) {
		//echo "Scoring Entrepreneur test is OK<br />";
	} else {
		die("<strong style='color:red'>Scoring Entrepreneur test FAILED</strong>");
	}		
}

assert_correct_answers();

$payloadScore = 0;
$bonus = 0;
$submitetTypes = array();

foreach($payload["quizes"] as $quiz) {
	$payloadScore += score(getQuestionByType($quiz["type"]), $quiz["answers"]);
	$submitetTypes[] = $quiz["type"];	
}

$bonus = determineBonus($submitetTypes);

$returnedValue = array("data" => array(
	"identificaton" => $payload["identificaton"],
	"score" => $payloadScore,
	"bonus" => $bonus));

echo json_encode($returnedValue);


?>