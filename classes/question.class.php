<?php
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
	
	public static function fetch() {
		
	}
	
	public static function create($questionObject) {
		require_once("../config/db_config.php");
	}
}
