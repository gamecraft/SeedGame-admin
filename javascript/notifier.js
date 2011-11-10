namespace("Seed.Game.Notifier");

Seed.Game.Notifier = (function() {
	var _private = {
		jQueryToast : function(type, message) {
			$().toastmessage(type, message);
		}
	};

	return {
		success : function(message) {
			_private.jQueryToast("showSuccessToast", message);
		},
		failure : function(message) {
			_private.jQueryToast("showErrorToast", message);
		},
		warning : function(message) {
			_private.jQueryToast("showWarningToast", message);
		},
		info : function(message) {
			_private.jQueryToast("showNoticeToast", message);
		}
	}
})();
