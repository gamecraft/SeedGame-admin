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
	
});
