namespace("Seed.Game.Notifier");

Seed.Game.Notifier = (function() {
	var _private = {
		jQueryToast : function(type, message) {
			$().toastmessage("showToast", {
				text : message,
				sticky : this.sticky,
				position : 'top-right',
				type : type
			})
			// reset the sticky. It should be called with the sticky() method
			this.sticky = false;
		},
		sticky : false
	};

	return {
		sticky : function() {
			_private.sticky = true;
			return this;
		},
		success : function(message) {
			_private.jQueryToast("success", message);
		},
		failure : function(message) {
			_private.jQueryToast("error", message);
		},
		warning : function(message) {
			_private.jQueryToast("warning", message);
		},
		notice : function(message) {
			_private.jQueryToast("notice", message);
		}
	}
})();
