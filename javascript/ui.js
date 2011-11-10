namespace("Seed.Game.UI");

Seed.Game.UI = {
	startId : 1,

	init : function() {
		this.addQuizAnswerField();
		$("#addAnotherQuiz").bind("click", {
			context : this
		}, function(event) {
			event.data.context.addQuizAnswerField();
		});

		$("#evaluateButton").click(this.submitQuizes);
	},
	loadTemplate : function(path, data) {
		return new EJS({
			url : path
		}).render(data);
	},
	addQuizAnswerField : function() {
		var html = this.loadTemplate("javascript/templates/" + "quizAnswersUIMarkup.ejs", {
			quizId : "quiz" + this.startId
		});
		$("#quizContent").append(html);

		$("#quiz" + this.startId).children(".removeField").bind("click", {
			answerFieldId : "quiz" + this.startId
		}, function(event) {
			console.log(event.data.answerFieldId);
			$("#" + event.data.answerFieldId).remove();
			$("#" + event.data.answerFieldId).unbind("click");
		});

		this.startId++;
	},
	submitQuizes : function() {
		var validFlag = true;
		var payLoad = {
			identificaton : "",
			quizes : [
			// {type : "Cloud", answers : "abcdfs"}
			]
		};

		$.each($("#quizContent").children(), function(index, item) {
			var givenAnswers = $(item).children(".answers").val().removeWhiteSpace(), givenType = $(item).children(".answers").val();

			if(givenAnswers.length !== 8) {
				$().toastmessage('showWarningToast', "8 answers must be given, only {0} available".format(givenAnswers.length));
				validFlag = false;
				return validFlag;
			}

			var quiz = {
				type : givenAnswers,
				answers : givenType
			}
			payLoad.quizes.push(quiz);
		});
		
		if(validFlag === false) {
			return;
		}
		payLoad.identificaton = $("#userAutocomplete").val();
		console.log(payLoad);

	}
}