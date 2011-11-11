namespace("Seed.Game.UI.TeamVoting")

Seed.Game.UI.TeamVoting = (function() {
	var _private = {
		ui : Seed.Game.UI
	};

	return {
		init : function() {
			console.log(_private.ui);
			var self = this;
			Seed.Game.API.get(Seed.Game.Server.API.Team, "", function(data) {
				data = data.data;
				var htmlMap = {
					teams : []
				};
				for(var i = 0, len = data.length; i < len; i++) {
					htmlMap.teams.push({
						name : data[i].name,
						id : data[i]._id
					});
				}

				var html = _private.ui.loadTemplate("javascript/templates/" + "teamVotingUI.ejs", htmlMap);
				$("#teamVotingPlaceholder").append(html);

				$("#teamVotingPlaceholder .vote").bind("click", {
					context : self
				}, function(event) {
					console.log($(this).next().html());
					Seed.Game.API.helperMethod(Seed.Game.Server.API.Team, $(this).next().html(), Seed.Game.Server.API.Helper.ADD_POINTS, {
						points : 1
					}, "Vote given");
				});
			})
		}
	}
})();
