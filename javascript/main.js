/**
 * Format function that replace placeholders in strings with values
 * Usage : "This is {0} formatted {1}".format("a", "string");
 **/
String.prototype.format = function() {
	var formatted = this;
	for(var i = 0; i < arguments.length; i++) {
		var regexp = new RegExp('\\{' + i + '\\}', 'gi');
		formatted = formatted.replace(regexp, arguments[i]);
	}
	return formatted;
};

String.prototype.removeWhiteSpace = function() {
	return this.replace(/\s/g, "");
};
var namespace = window.namespace ||
function(name) {
	var parts = name.split(".");
	var parent = window;

	for(var i = 0, len = parts.length; i < len; ++i) {
		if( typeof (parent[parts[i]]) === "undefined") {
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
}

namespace("Seed.Game");

$(document).ready(function() {
	var ui = Seed.Game.UI;

	ui.init();

	$("#addAnotherQuiz").click(function() {
		ui.addQuizAnswerField();
	});
});
