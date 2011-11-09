<?php
define("QUESTIONS_COUNT", 8);
/**
 * A data model that represents a quiz question
 */
class Question {
	/**
	 * Integer, holds the question unique identifier
	 */
	public $id = -1;
	
	/**
	 * String, holds the question's body
	 */
	public $text = "";
	
	/**
	 * Associative array in the following format :
	 * "a" => "something", "b" => "something"
	 * where the keys are single letters from the range a-z
	 */
	public $answers = array(); // "a" => "something", "b" => "something"
	
	/**
	 * String
	 * The correct answer
	 * This is a single letter in the range a-z
	 */
	public $correct = "";
	
	/**
	 * String
	 * The type of the question that is used for the game logic
	 * Can be Cloud, Entrepreneur, Software
	 */
	public $type = "";
	
	/**
	 * @param String, $answer - a letter in the range a-z
	 * Checks if the provided answer is correct
	 * @return true, if the provided answer is correct
	 */
	public function isCorrect($answer /*in range a to z*/) {
		return strtolower($answer) === $this->correct;
	}
	
	public function __construct($id, $type, $text, $answers, $correct) {
		$this->id = $id;
		$this->type = $type;	
		$this->text = $text;
		$this->answers = $answers;
		$this->correct = $correct;
	}
	
	public static function fetch($type) {
		$database = GlobalDatabase::$instance;
		$fetchSql = "SELECT * FROM questions WHERE type = ?";
		$res = $database->query($fetchSql, array($type));
		
		$questionsArray = array();
		
		while($row = $res->fetch()) {
			$q = new Question(-1, "", "", array(), "");
			$q->id = $row->id % QUESTIONS_COUNT;
			$q->text = $row->text;
			$q->type = $type;
			
			// get the answers
			$answersSql = "SELECT * FROM answers WHERE question_id = ?";
			$answersRes = $database->query($answersSql, array((int) $row->id));
			
			$answers = array();
			while($answerRow = $answersRes->fetch()) {
				$answers[$answerRow->text] = $answerRow->letter;
				if((int)$answerRow->correct === 1) {
					$q->correct = $answerRow->letter;
				}
			}
			$q->answers = $answers;
			
			$questionsArray[] = $q;
		}
		return $questionsArray;
	}
	
	public static function create($questionObject) {
		require_once("config/db_config.php");
		$questionSql = "INSERT INTO questions (text, type) VALUES (?, ?)";
		$database->exec($questionSql, array($questionObject->text, $questionObject->type));
		$insertedId = $database->lastInsertId();
		
		foreach($questionObject->answers as $letter => $answer) {
			$answerSql = "INSERT INTO answers(question_id, text, letter, correct) VALUES(?, ?, ?, ?)";
			$database->exec($answerSql, array($insertedId, $answer, $letter, ($letter === $questionObject->correct ? 1 : 0)));
		}
	}
}
