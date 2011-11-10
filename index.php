<?php
header("Content-Type: text/html; charset=utf-8");
require_once ("class_loader.php");
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Quiz Admin</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<script src="http://code.jquery.com/jquery-latest.js"></script>
		<script src="javascript/plugins/jquery-ui-1.8.16.custom.min.js"></script>
		<link href="javascript/plugins/smoothness/jquery-ui-1.8.16.custom.css" rel="stylesheet" />
		
		
		<script src="javascript/plugins/jquery.toastmessage.js"></script>
		<link href="javascript/plugins/jquery.toastmessage.css" rel="stylesheet" />
		<script src="javascript/plugins/ejs_production.js"></script>

		<script src="javascript/main.js"></script>
		<script src="javascript/ui.js"></script>
		<script src="javascript/api.js"></script>
		<script src="javascript/server.js"></script>
		<script src="javascript/notifier.js"></script>
		<link href="styles/ui.css" rel="stylesheet" />
	</head>
	<body>
		
		<div id="quizContent">
		</div>
		<br />
		<input type="button" value="Add another quiz" id="addAnotherQuiz" />
		<br />
		Identification : <input type="text" id="userAutocomplete" />
		<br />
		<input type="button" value="Evaluate" id="evaluateButton" />
	</body>
</html>