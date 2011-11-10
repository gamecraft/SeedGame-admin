namespace("Seed.Game.UI");

Seed.Game.UI = {
	startId : 1,

	init : function() {
		this.addQuizAnswerField();
		this.loadIdentifications();

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
	loadIdentifications : function() {
		Seed.Game.API.get(Seed.Game.Server.API.TeamMember, "IDs fetched", function(data) {
			var parsed = [];
			for(var i = 0, len = data.data.length; i < len; ++i) {
				parsed[i] = data.data[i].name;
			}
			$("#userAutocomplete").autocomplete({
				source : parsed
			});
		});
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
		var validFlag = true, payLoad = {
			data : {
				identificaton : "",
				quizes : [
				// {type : "Cloud", answers : "abcdfs"}
				]
			}
		}, notifier = Seed.Game.Notifier;

		$.each($("#quizContent").children(), function(index, item) {
			var givenAnswers = $(item).children(".answers").val().removeWhiteSpace(), givenType = $(item).children(".types").val();

			$(item).removeClass("warning");

			// answers validation, we don't want to flood the sever with shit
			if(givenAnswers.length !== 8) {
				notifier.warning("8 answers must be given, only {0} available".format(givenAnswers.length));
				validFlag = false;
			}

			if(givenAnswers.match(/[^a-d]/)) {
				notifier.warning("Answers must be in the range of a to d");
				validFlag = false;
			}

			// paint it with red border
			if(validFlag === false) {
				$(item).addClass("warning");
				return false;
			}

			var quiz = {
				type : givenType,
				answers : givenAnswers
			}
			payLoad.data.quizes.push(quiz);
		});
		// do not call ajax
		if(validFlag === false) {
			return;
		}

		payLoad.data.identificaton = $("#userAutocomplete").val();
		console.log(payLoad);
		$.ajax({
			type : "POST",
			url : Seed.Game.Server.getEvalURL(),
			data : payLoad,
			success : function(data) {
				console.log(data);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus + ' ' + errorThrown);
			}
		});

	}
}