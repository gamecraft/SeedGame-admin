namespace("Seed.Game.UI");

Seed.Game.UI = (function() {
	var _private = {
		startId : 1
	}
	return {
		init : function() {
			this.addQuizAnswerField();
			this.loadIdentifications();

			$("#addAnotherQuiz").bind("click", {
				context : this
			}, function(event) {
				event.data.context.addQuizAnswerField();
			});

			$("#evaluateButton").bind("click", {
				context : this
			}, this.submitQuizes);

			this.notifier = Seed.Game.Notifier;
		},
		loadTemplate : function(path, data) {
			return new EJS({
				url : path
			}).render(data);
		},
		loadIdentifications : function() {
			this.idMap = {};
			var idMap = this.idMap;
			Seed.Game.API.get(Seed.Game.Server.API.TeamMember, "IDs fetched", function(data) {
				var parsed = [];

				for(var i = 0, len = data.data.length; i < len; ++i) {
					parsed[i] = data.data[i].name;
					idMap[data.data[i].name] = data.data[i]._id;
				}

				$("#userAutocomplete").autocomplete({
					source : parsed,
					select : function(event, item) {
						$("#userId").val(Seed.Game.UI.idMap[item.item.value]);
					}
				});
			});
		},
		addQuizAnswerField : function() {
			var html = this.loadTemplate("javascript/templates/" + "quizAnswersUIMarkup.ejs", {
				quizId : "quiz" + _private.startId
			});
			$("#quizContent").append(html);

			$("#quiz" + _private.startId).children(".removeField").bind("click", {
				answerFieldId : "quiz" + _private.startId
			}, function(event) {
				$("#" + event.data.answerFieldId).remove();
				$("#" + event.data.answerFieldId).unbind("click");
			});

			_private.startId++;
		},
		submitQuizes : function(event) {
			var self = event.data.context;
			var validFlag = true, payLoad = {
				data : {
					identificaton : "",
					quizes : [
					// {type : "Cloud", answers : "abcdfs"}
					]
				}
			}, userId = null;

			$.each($("#quizContent").children(), function(index, item) {
				var givenAnswers = $(item).children(".answers").val().removeWhiteSpace(), givenType = $(item).children(".types").val();
				$(item).removeClass("warning");

				// answers validation, we don't want to flood the sever with shit
				if(givenAnswers.length !== 8) {
					self.notifier.warning("8 answers must be given, only {0} available".format(givenAnswers.length));
					validFlag = false;
				}

				if(givenAnswers.match(/[^a-d]/)) {
					self.notifier.warning("Answers must be in the range of a to d");
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
			userId = $("#userId").val();
			
			if(parseInt(userId) === -1) {
				validFlag = false;
				self.notifier.warning("No name selected");
			}
			// do not call ajax
			if(validFlag === false) {
				return;
			}

			payLoad.data.identificaton = userId;
			$.ajax({
				type : "POST",
				url : Seed.Game.Server.getEvalURL(),
				data : payLoad,
				success : function(data) {
					console.log(data);
					data = JSON.parse(data);
					var points = data.data.score + data.data.bonus, dataPayload = {
						points : points
					};

					Seed.Game.API.helperMethod(Seed.Game.Server.API.TeamMember, data.data.identification, Seed.Game.Server.API.Helper.ADD_POINTS, dataPayload, "Points added");
				},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus + ' ' + errorThrown);
				}
			});

		}
	}
})();
