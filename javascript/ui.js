namespace("Seed.Game.UI");

Seed.Game.UI = {
	startId : 1,

	init : function() {
		this.addQuizAnswerField();
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
		}, function(event){
			console.log(event.data.answerFieldId);
			$("#" + event.data.answerFieldId).remove();
			$("#" + event.data.answerFieldId).unbind("click");
		});
		
		this.startId++;
	}
}